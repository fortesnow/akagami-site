'use server'

import { getMockUser } from '@/lib/auth/mock-auth'
import { revalidatePath } from 'next/cache'
import { mockProgress } from '@/lib/data/mock-data'

export async function toggleLessonComplete(lessonId: string, completed: boolean) {
    const user = await getMockUser()

    if (!user) return { error: 'Unauthorized' }

    // デモ用：モック進捗データを更新
    mockProgress[lessonId] = completed

    revalidatePath('/learn', 'layout')
}
