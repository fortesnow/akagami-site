import { NextResponse } from 'next/server'
import { mockPurchases } from '@/lib/data/mock-data'
import { Database } from '@/types/supabase'

type Purchase = Database['public']['Tables']['purchases']['Row']

export async function POST(request: Request) {
    // デモ用：Webhook処理をスキップ
    // 実際のアプリでは、StripeからのWebhookを受信して購入情報を処理します
    // デモモードでは、購入処理は /api/checkout/create で直接行われます
    
    try {
        const body = await request.json()
        
        // デモ用：Webhookデータから購入情報を作成（実際にはStripeから来る）
        if (body.userId && body.courseId) {
            const purchase: Purchase = {
                id: `purchase-${body.userId}-${body.courseId}`,
                user_id: body.userId,
                course_id: body.courseId,
                status: 'paid',
                stripe_session_id: null,
                stripe_customer_id: null,
                paid_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
            }
            
            mockPurchases.push(purchase)
        }
    } catch (error) {
        // デモ用：エラーを無視
    }

    return new NextResponse('Received', { status: 200 })
}
