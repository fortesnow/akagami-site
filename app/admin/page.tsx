import Link from 'next/link'
import { getMockUser } from '@/lib/auth/mock-auth'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function AdminDashboard() {
    // デモ用：モック認証を使用
    const user = await getMockUser()

    if (!user) redirect('/auth/login')

    // デモ用：管理者チェックをスキップ

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-8">管理ダッシュボード</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>コース管理</CardTitle>
                        <CardDescription>コースの作成・編集・公開設定</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href="/admin/courses">コース一覧へ</Link>
                        </Button>
                    </CardContent>
                </Card>
                {/* Add more widgets here */}
            </div>
        </div>
    )
}
