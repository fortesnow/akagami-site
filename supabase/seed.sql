-- Create a test user (password: password) if not exists
-- Users are managed in auth.users, which is protected.
-- We can Insert into public tables.
-- Suggestion: User should sign up from UI.

-- Create a Course
INSERT INTO public.courses (id, title, description, price_jpy, thumbnail_url, is_published, sort_order)
VALUES 
(
    'c0000000-0000-0000-0000-000000000001',
    'はじめてのスマートフォン講座',
    '60代の方を対象とした、スマートフォンの基本的な使い方を学ぶコースです。電源の入れ方からメールの送り方まで、ゆっくり丁寧に解説します。',
    1000,
    'https://placehold.co/600x400/orange/white?text=Smartphone+Course',
    true,
    1
);

-- Create Lessons
INSERT INTO public.lessons (course_id, title, content_md, video_provider, video_id, is_free, sort_order)
VALUES
(
    'c0000000-0000-0000-0000-000000000001',
    '第1回: 電源の入れ方と画面の見方',
    'まずはスマートフォンの電源を入れてみましょう。\n\n右側のボタンを長押しすると、画面が明るくなります。画面には「アイコン」と呼ばれる絵が並んでいます。',
    'youtube',
    'dQw4w9WgXcQ', -- Rick Roll as placeholder (or use a real safe video if known)
    true,
    1
),
(
    'c0000000-0000-0000-0000-000000000001',
    '第2回: 電話のかけ方（有料）',
    'このレッスンでは電話のかけ方を学びます。\n\n※ここから先は有料コンテンツのサンプルです。',
    'youtube',
    'dQw4w9WgXcQ',
    false,
    2
);
