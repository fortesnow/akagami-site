import { cache } from 'react'
import { Database } from '@/types/supabase'
import { mockPurchases } from './mock-data'

type Purchase = Database['public']['Tables']['purchases']['Row']

export const getPurchase = cache(async (userId: string, courseId: string) => {
    // デモ用：モックデータから検索
    return mockPurchases.find(
        purchase => purchase.user_id === userId && 
                   purchase.course_id === courseId && 
                   purchase.status === 'paid'
    ) || null
})
