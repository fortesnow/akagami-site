'use client'

import { useState } from 'react'
import { signup } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

export default function SignupPage() {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        setSuccess(null)

        // Check password match (simple client-side check)
        const password = formData.get('password') as string
        const confirm = formData.get('confirm-password') as string

        if (password !== confirm) {
            setError('パスワードが一致しません')
            setLoading(false)
            return
        }

        const res = await signup(formData)
        if (res?.error) {
            setError(res.error)
        } else if (res?.success) {
            setSuccess(res.success)
        }
        setLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-orange-50 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-3 text-center">
                    <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
                        新規登録（無料）
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600">
                        メールアドレスとパスワードを設定して<br />学習を始めましょう
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-6">
                        {error && (
                            <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200">
                                <AlertDescription className="text-base font-medium">
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}
                        {success && (
                            <Alert className="bg-green-50 text-green-900 border-green-200">
                                <AlertDescription className="text-base font-medium">
                                    {success}
                                </AlertDescription>
                            </Alert>
                        )}

                        {!success && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-lg font-bold text-gray-800">
                                        メールアドレス
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="例: yamada@example.com"
                                        required
                                        className="h-12 text-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-lg font-bold text-gray-800">
                                        パスワード
                                    </Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        minLength={6}
                                        required
                                        className="h-12 text-lg"
                                    />
                                    <p className="text-sm text-gray-500">6文字以上の半角英数字</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password" className="text-lg font-bold text-gray-800">
                                        パスワード（確認用）
                                    </Label>
                                    <Input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        required
                                        className="h-12 text-lg"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full h-14 text-xl font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-md transition-all active:scale-[0.98]"
                                    disabled={loading}
                                >
                                    {loading ? '登録中...' : '登録して始める'}
                                </Button>
                            </>
                        )}
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t p-6 mt-4 bg-gray-50 rounded-b-xl">
                    <p className="text-base text-gray-600">
                        すでにアカウントをお持ちの方は
                        <Link
                            href="/auth/login"
                            className="ml-2 font-bold text-orange-600 hover:underline"
                        >
                            ログイン
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
