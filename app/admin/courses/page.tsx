import Link from 'next/link'
import { getPublishedCourses } from '@/lib/data/courses'
import { Button } from '@/components/ui/button'

export default async function AdminCoursesPage() {
    // デモ用：モックデータからコースを取得
    const courses = await getPublishedCourses()

    return (
        <div className="container py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">コース管理</h1>
                {/* Create flow not implemented in this MVP step, but easy to add */}
                <Button disabled>新規作成 (Demo)</Button>
            </div>

            <div className="rounded-md border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイトル</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">価格</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {courses.map((course) => (
                                <tr key={course.id}>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{course.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">¥{course.price_jpy.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {course.is_published ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">公開中</span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">下書き</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button variant="ghost" size="sm">編集</Button>
                                    </td>
                                </tr>
                            ))}
                            {courses.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">コースがありません</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
