import { Database } from '@/types/supabase'

type Course = Database['public']['Tables']['courses']['Row']
type Lesson = Database['public']['Tables']['lessons']['Row']
type Purchase = Database['public']['Tables']['purchases']['Row']

// モックコースデータ
export const mockCourses: Course[] = [
    {
        id: 'course-1',
        title: 'はじめてのプログラミング',
        description: 'プログラミング初心者のための基礎コースです。\n\nこのコースでは、プログラミングの基本概念から始めて、実際にコードを書けるようになるまでを丁寧に解説します。\n\n60代からのプログラミング学習に最適な内容となっています。',
        price_jpy: 9800,
        thumbnail_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop',
        is_published: true,
        sort_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'course-2',
        title: 'Webサイト制作入門',
        description: 'HTMLとCSSを使ったWebサイト制作の基礎を学びます。\n\n実際に自分のWebサイトを作りながら、実践的に学習できます。\n\n初心者でも安心して学べる内容です。',
        price_jpy: 12800,
        thumbnail_url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=450&fit=crop',
        is_published: true,
        sort_order: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'course-3',
        title: 'JavaScript基礎',
        description: 'JavaScriptの基本文法から、DOM操作、イベント処理までを学びます。\n\n動的なWebサイトを作るための基礎を身につけましょう。',
        price_jpy: 15800,
        thumbnail_url: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=450&fit=crop',
        is_published: true,
        sort_order: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
]

// モックレッスンデータ
export const mockLessons: Lesson[] = [
    // コース1のレッスン
    {
        id: 'lesson-1-1',
        course_id: 'course-1',
        chapter_title: '第1章：プログラミングとは',
        title: 'プログラミングとは何か',
        content_md: 'プログラミングとは、コンピューターに指示を出すための言語を使って、様々な処理を自動化することです。\n\nこのレッスンでは、プログラミングの基本的な概念について学びます。',
        video_provider: 'youtube',
        video_id: 'dQw4w9WgXcQ',
        is_free: true,
        sort_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'lesson-1-2',
        course_id: 'course-1',
        chapter_title: '第1章：プログラミングとは',
        title: 'プログラミング言語の種類',
        content_md: '世の中には様々なプログラミング言語があります。\n\n- Python\n- JavaScript\n- Java\n- C++\n\nそれぞれの特徴を学びましょう。',
        video_provider: 'youtube',
        video_id: 'dQw4w9WgXcQ',
        is_free: false,
        sort_order: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'lesson-1-3',
        course_id: 'course-1',
        chapter_title: '第2章：最初のプログラム',
        title: 'Hello Worldを書いてみよう',
        content_md: '最初のプログラムとして、「Hello World」を表示するプログラムを作成します。\n\n```python\nprint("Hello World")\n```\n\nこのように、プログラミングは思っているよりも簡単です。',
        video_provider: 'youtube',
        video_id: 'dQw4w9WgXcQ',
        is_free: false,
        sort_order: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    // コース2のレッスン
    {
        id: 'lesson-2-1',
        course_id: 'course-2',
        chapter_title: '第1章：HTMLの基礎',
        title: 'HTMLとは',
        content_md: 'HTML（HyperText Markup Language）は、Webページの構造を定義するための言語です。\n\nこのレッスンでは、HTMLの基本的な書き方を学びます。',
        video_provider: 'youtube',
        video_id: 'dQw4w9WgXcQ',
        is_free: true,
        sort_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'lesson-2-2',
        course_id: 'course-2',
        chapter_title: '第1章：HTMLの基礎',
        title: '基本的なHTMLタグ',
        content_md: 'HTMLでは、様々なタグを使ってコンテンツを構造化します。\n\n- `<h1>`: 見出し\n- `<p>`: 段落\n- `<a>`: リンク\n- `<img>`: 画像\n\nこれらの基本的なタグを覚えましょう。',
        video_provider: 'youtube',
        video_id: 'dQw4w9WgXcQ',
        is_free: false,
        sort_order: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    // コース3のレッスン
    {
        id: 'lesson-3-1',
        course_id: 'course-3',
        chapter_title: '第1章：JavaScript入門',
        title: 'JavaScriptとは',
        content_md: 'JavaScriptは、Webページに動的な機能を追加するためのプログラミング言語です。\n\nこのレッスンでは、JavaScriptの基本的な概念について学びます。',
        video_provider: 'youtube',
        video_id: 'dQw4w9WgXcQ',
        is_free: true,
        sort_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
]

// モック購入データ（デモ用に空配列、後で追加可能）
export const mockPurchases: Purchase[] = []

// モックユーザー（デモ用）
export const mockUser = {
    id: 'demo-user-1',
    email: 'demo@example.com',
}

// モック進捗データ（デモ用）
export const mockProgress: { [lessonId: string]: boolean } = {}

