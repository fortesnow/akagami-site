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
        <div className="flex min-h-screen items-center justify-center bg-orange-50 px-4 py-8 sm:py-12">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-2 sm:space-y-3 text-center px-4 sm:px-6 pt-6 sm:pt-8">
                    <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                        ログイン
                    </CardTitle>
                    <CardDescription className="text-base sm:text-lg text-gray-600">
                        登録済みのメールアドレスと<br />パスワードを入力してください
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                    <form action={handleSubmit} className="space-y-5 sm:space-y-6">
                        {error && (
                            <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200">
                                <AlertDescription className="text-sm sm:text-base font-medium">
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-base sm:text-lg font-bold text-gray-800">
                                メールアドレス
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="例: yamada@example.com"
                                required
                                className="h-12 sm:h-12 text-base sm:text-lg"
                                autoComplete="email"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <Label htmlFor="password" className="text-base sm:text-lg font-bold text-gray-800">
                                    パスワード
                                </Label>
                                <Link
                                    href="/auth/reset"
                                    className="text-xs sm:text-sm font-medium text-orange-600 hover:underline"
                                >
                                    パスワードを忘れた方
                                </Link>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="h-12 sm:h-12 text-base sm:text-lg"
                                autoComplete="current-password"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 sm:h-14 text-lg sm:text-xl font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-md transition-all active:scale-[0.98]"
                            disabled={loading}
                        >
                            {loading ? 'ログイン中...' : 'ログインする'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-center border-t p-4 sm:p-6 mt-4 bg-gray-50 rounded-b-xl">
                    <p className="text-sm sm:text-base text-gray-600 text-center">
                        アカウントをお持ちでない方は
                        <Link
                            href="/auth/signup"
                            className="sm:ml-2 font-bold text-orange-600 hover:underline block sm:inline mt-1 sm:mt-0"
                        >
                            新規登録（無料）
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
