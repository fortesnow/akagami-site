export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: 'student' | 'admin'
          created_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'student' | 'admin'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'student' | 'admin'
          created_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          price_jpy: number
          thumbnail_url: string | null
          is_published: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price_jpy?: number
          thumbnail_url?: string | null
          is_published?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price_jpy?: number
          thumbnail_url?: string | null
          is_published?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          chapter_title: string | null
          title: string
          content_md: string | null
          video_provider: string
          video_id: string | null
          is_free: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          chapter_title?: string | null
          title: string
          content_md?: string | null
          video_provider?: string
          video_id?: string | null
          is_free?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          chapter_title?: string | null
          title?: string
          content_md?: string | null
          video_provider?: string
          video_id?: string | null
          is_free?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      purchases: {
        Row: {
          id: string
          user_id: string
          course_id: string
          status: 'paid' | 'refunded' | 'canceled'
          stripe_session_id: string | null
          stripe_customer_id: string | null
          paid_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          status: 'paid' | 'refunded' | 'canceled'
          stripe_session_id?: string | null
          stripe_customer_id?: string | null
          paid_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          status?: 'paid' | 'refunded' | 'canceled'
          stripe_session_id?: string | null
          stripe_customer_id?: string | null
          paid_at?: string | null
          created_at?: string
        }
      }
      progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed: boolean
          last_position_sec: number | null
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          completed?: boolean
          last_position_sec?: number | null
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          completed?: boolean
          last_position_sec?: number | null
          updated_at?: string
        }
      }
    }
  }
}
