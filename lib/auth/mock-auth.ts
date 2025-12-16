import { cookies } from 'next/headers'
import { mockUser } from '../data/mock-data'

// デモ用の認証ヘルパー関数
export async function getMockUser() {
    const cookieStore = await cookies()
    const userId = cookieStore.get('demo_user_id')?.value
    
    if (userId === mockUser.id) {
        return mockUser
    }
    
    return null
}

export async function setMockUser(userId: string) {
    const cookieStore = await cookies()
    cookieStore.set('demo_user_id', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7日間
    })
}

export async function clearMockUser() {
    const cookieStore = await cookies()
    cookieStore.delete('demo_user_id')
}

