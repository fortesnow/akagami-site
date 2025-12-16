import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getMockUser } from '@/lib/auth/mock-auth'
import { getCourse } from '@/lib/data/courses'
import { mockPurchases } from '@/lib/data/mock-data'
import { Database } from '@/types/supabase'

type Purchase = Database['public']['Tables']['purchases']['Row']

export async function POST(request: Request) {
    const user = await getMockUser()

    if (!user) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    // Handle form data or JSON
    const headerList = await headers()
    const contentType = headerList.get('content-type') || ''
    let courseId: string | undefined

    if (contentType.includes('application/json')) {
        const body = await request.json()
        courseId = body.courseId
    } else {
        const formData = await request.formData()
        courseId = formData.get('courseId') as string
    }

    if (!courseId) {
        return new NextResponse('Course ID required', { status: 400 })
    }

    const course = await getCourse(courseId)
    if (!course) {
        return new NextResponse('Course not found', { status: 404 })
    }

    const origin = headerList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    // デモ用：購入処理をスキップして、直接購入済みとして扱う
    const purchase: Purchase = {
        id: `purchase-${user.id}-${courseId}`,
        user_id: user.id,
        course_id: courseId,
        status: 'paid',
        stripe_session_id: null,
        stripe_customer_id: null,
        paid_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
    }
    
    // モック購入データに追加（実際のアプリではSupabaseに保存）
    mockPurchases.push(purchase)

    // If called from form, redirect
    if (!contentType.includes('application/json')) {
        return NextResponse.redirect(`${origin}/my-courses?success=true`, 303)
    }

    return NextResponse.json({ url: `${origin}/my-courses?success=true` })
}
