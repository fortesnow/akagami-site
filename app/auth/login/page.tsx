'use client'

import { useState } from 'react'
import { login } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        const res = await login(formData)
        if (res?.error) {
            setError(res.error)
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-orange-50 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-3 text-center">
                    <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
                        ログイン
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600">
                        登録済みのメールアドレスと<br />パスワードを入力してください
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
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-lg font-bold text-gray-800">
                                    パスワード
                                </Label>
                                <Link
                                    href="/auth/reset"
                                    className="text-sm font-medium text-orange-600 hover:underline"
                                >
                                    パスワードを忘れた方
                                </Link>
                            </div>
                            <Input
                                id="password"
                                name="password"
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
                            {loading ? 'ログイン中...' : 'ログインする'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t p-6 mt-4 bg-gray-50 rounded-b-xl">
                    <p className="text-base text-gray-600">
                        アカウントをお持ちでない方は
                        <Link
                            href="/auth/signup"
                            className="ml-2 font-bold text-orange-600 hover:underline"
                        >
                            新規登録（無料）
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div >
    )
}
