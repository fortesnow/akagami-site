import { NextResponse } from 'next/server'
import { getMockUser } from '@/lib/auth/mock-auth'
import { setMockUser } from '@/lib/auth/mock-auth'
import { mockUser } from '@/lib/data/mock-data'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/'

    // デモ用：認証コードをスキップして、直接ログイン状態にする
    const user = await getMockUser()
    if (!user) {
        await setMockUser(mockUser.id)
    }

    return NextResponse.redirect(`${origin}${next}`)
}
