'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        // デモ用：実際の送信処理は実装しない
        setTimeout(() => {
            setSubmitStatus({
                type: 'success',
                message: 'お問い合わせを受け付けました。ありがとうございます。'
            })
            setIsSubmitting(false)
            setFormData({ name: '', email: '', subject: '', message: '' })
        }, 1000)
    }

    return (
        <div className="container py-12 md:py-16">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                    お問い合わせ
                </h1>

                <Card>
                    <CardHeader>
                        <CardTitle>お問い合わせフォーム</CardTitle>
                        <CardDescription>
                            ご質問やご不明な点がございましたら、お気軽にお問い合わせください。
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {submitStatus && (
                                <Alert variant={submitStatus.type === 'error' ? 'destructive' : 'default'} 
                                    className={submitStatus.type === 'success' ? 'bg-green-50 text-green-900 border-green-200' : ''}>
                                    <AlertDescription>{submitStatus.message}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="name">お名前 <span className="text-red-500">*</span></Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="h-12"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">メールアドレス <span className="text-red-500">*</span></Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="h-12"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">件名 <span className="text-red-500">*</span></Label>
                                <Input
                                    id="subject"
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="h-12"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">お問い合わせ内容 <span className="text-red-500">*</span></Label>
                                <textarea
                                    id="message"
                                    required
                                    rows={8}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full min-h-[200px] px-3 py-2 text-base border border-gray-300 rounded-md shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-transparent"
                                />
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full h-14 text-lg font-bold bg-orange-600 hover:bg-orange-700"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? '送信中...' : '送信する'}
                            </Button>
                        </form>

                        <div className="mt-8 pt-8 border-t">
                            <h3 className="font-semibold text-gray-900 mb-2">その他のお問い合わせ方法</h3>
                            <p className="text-gray-600">
                                メールアドレス: <a href="mailto:info@akagami-school.com" className="text-orange-600 hover:underline">info@akagami-school.com</a><br />
                                電話番号: 03-0000-0000（受付時間: 平日10:00〜18:00）
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

