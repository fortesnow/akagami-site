-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone" 
  on public.profiles for select using (true);

create policy "Users can insert their own profile" 
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile" 
  on public.profiles for update using (auth.uid() = id);

-- 2. Courses Table
create table public.courses (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null, -- For sales page
  price_jpy integer not null default 0,
  thumbnail_url text,
  is_published boolean default false not null,
  sort_order integer default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.courses enable row level security;

-- Course RLS
create policy "Published courses are viewable by everyone" 
  on public.courses for select using (is_published = true);

create policy "Admins can do everything on courses" 
  on public.courses for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- 3. Purchases Table (Needed for Lesson RLS)
create table public.purchases (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  course_id uuid references public.courses(id) not null,
  status text not null check (status in ('paid', 'refunded', 'canceled')),
  stripe_session_id text unique,
  stripe_customer_id text,
  paid_at timestamptz,
  created_at timestamptz default now() not null,
  unique(user_id, course_id)
);

alter table public.purchases enable row level security;

create policy "Users can view own purchases" 
  on public.purchases for select using (auth.uid() = user_id);

create policy "Admins can view all purchases" 
  on public.purchases for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Server-side (service role) can insert/update purchases via webhook

-- 4. Lessons Table
create table public.lessons (
  id uuid default uuid_generate_v4() primary key,
  course_id uuid references public.courses(id) on delete cascade not null,
  chapter_title text, -- Simplified chapter management
  title text not null,
  content_md text, -- Markdown content
  video_provider text not null default 'vimeo', -- 'mux', 'vimeo', 'youtube'
  video_id text, -- The ID or URL for embedding
  is_free boolean default false not null,
  sort_order integer default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.lessons enable row level security;

-- Lesson RLS:
-- 1. Admins see all
-- 2. If is_free is true, everyone sees (if course is published, handled by app logic but good to reinforce)
-- 3. If paid, user must have a purchase

create policy "Admins can do everything on lessons" 
  on public.lessons for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Public viewable if free" 
  on public.lessons for select using (is_free = true);

create policy "Purchased viewable" 
  on public.lessons for select using (
    exists (
      select 1 from public.purchases 
      where purchases.course_id = lessons.course_id 
      and purchases.user_id = auth.uid() 
      and purchases.status = 'paid'
    )
  );

-- 5. Progress Table
create table public.progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  lesson_id uuid references public.lessons(id) not null,
  completed boolean default false not null,
  last_position_sec integer,
  updated_at timestamptz default now() not null,
  unique(user_id, lesson_id)
);

alter table public.progress enable row level security;

create policy "Users can view own progress" 
  on public.progress for select using (auth.uid() = user_id);

create policy "Users can insert/update own progress" 
  on public.progress for all using (auth.uid() = user_id);

-- Triggers for updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_courses_modtime before update on public.courses for each row execute procedure update_updated_at_column();
create trigger update_lessons_modtime before update on public.lessons for each row execute procedure update_updated_at_column();

-- Trigger to create profile on signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'student');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Indexes
create index idx_lessons_course_id on public.lessons(course_id);
create index idx_purchases_user_course on public.purchases(user_id, course_id);
create index idx_progress_user_lesson on public.progress(user_id, lesson_id);
