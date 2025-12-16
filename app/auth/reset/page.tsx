'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        // デモ用：常に成功として扱う
        if (!email) {
            setMessage({ type: 'error', text: 'メールアドレスを入力してください。' })
            setLoading(false)
            return
        }

        // デモ用：成功メッセージを表示
        setTimeout(() => {
            setMessage({ type: 'success', text: 'パスワード再設定用のメールを送信しました。（デモモード）' })
            setLoading(false)
        }, 500)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-orange-50 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-3 text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
                        パスワードの再設定
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600">
                        登録したメールアドレスを入力してください
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleReset} className="space-y-6">
                        {message && (
                            <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className={message.type === 'success' ? "bg-green-50 text-green-900 border-green-200" : "bg-red-50 text-red-900 border-red-200"}>
                                <AlertDescription className="text-base font-medium">
                                    {message.text}
                                </AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-lg font-bold text-gray-800">
                                メールアドレス
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="例: yamada@example.com"
                                required
                                className="h-12 text-lg"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-14 text-xl font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-md transition-all active:scale-[0.98]"
                            disabled={loading}
                        >
                            {loading ? '送信中...' : '再設定メールを送る'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t p-6 mt-4 bg-gray-50 rounded-b-xl">
                    <Link
                        href="/auth/login"
                        className="font-bold text-gray-600 hover:text-orange-600 hover:underline"
                    >
                        ログイン画面に戻る
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
