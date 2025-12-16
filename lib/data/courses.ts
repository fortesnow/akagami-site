import { cache } from 'react'
import { Database } from '@/types/supabase'
import { mockCourses } from './mock-data'

type Course = Database['public']['Tables']['courses']['Row']

export const getPublishedCourses = cache(async () => {
    // デモ用：モックデータを返す
    return mockCourses.filter(course => course.is_published)
})

export const getCourse = cache(async (courseId: string) => {
    // デモ用：モックデータから検索
    return mockCourses.find(course => course.id === courseId) || null
})
