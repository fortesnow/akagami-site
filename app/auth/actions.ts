'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { setMockUser, clearMockUser } from '@/lib/auth/mock-auth'
import { mockUser } from '@/lib/data/mock-data'

export async function login(formData: FormData): Promise<{ error?: string } | void> {
    // デモ用：任意のメールアドレス/パスワードでログイン可能
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // デモ用：簡単なバリデーション（空でないことのみチェック）
    if (!email || !password) {
        return { error: 'メールアドレスとパスワードを入力してください。' }
    }

    // デモ用：常に成功としてモックユーザーを設定
    await setMockUser(mockUser.id)

    revalidatePath('/', 'layout')
    redirect('/my-courses')
}

export async function signup(formData: FormData): Promise<{ error?: string; success?: string }> {
    // デモ用：任意のメールアドレス/パスワードで登録可能
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'メールアドレスとパスワードを入力してください。' }
    }

    // デモ用：常に成功としてモックユーザーを設定
    await setMockUser(mockUser.id)

    revalidatePath('/', 'layout')
    redirect('/my-courses')
}

export async function signout() {
    await clearMockUser()
    revalidatePath('/', 'layout')
    redirect('/auth/login')
}
