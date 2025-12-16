import { cache } from 'react'
import { Database } from '@/types/supabase'
import { mockLessons, mockProgress } from './mock-data'

type Lesson = Database['public']['Tables']['lessons']['Row']
type Progress = Database['public']['Tables']['progress']['Row']

export const getLessons = cache(async (courseId: string) => {
    // デモ用：モックデータから検索
    return mockLessons
        .filter(lesson => lesson.course_id === courseId)
        .sort((a, b) => a.sort_order - b.sort_order)
})

export const getLesson = cache(async (lessonId: string) => {
    // デモ用：モックデータから検索
    return mockLessons.find(lesson => lesson.id === lessonId) || null
})

export const getUserProgress = cache(async (userId: string, courseId: string) => {
    // デモ用：モック進捗データから取得
    const lessons = mockLessons.filter(l => l.course_id === courseId)
    return lessons.map(lesson => ({
        id: `progress-${userId}-${lesson.id}`,
        user_id: userId,
        lesson_id: lesson.id,
        completed: mockProgress[lesson.id] || false,
        last_position_sec: null,
        updated_at: new Date().toISOString(),
    })) as Progress[]
})
