import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getMockUser } from '@/lib/auth/mock-auth'
import { getPurchase } from '@/lib/data/purchases'
import { getPublishedCourses } from '@/lib/data/courses'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlayCircle } from 'lucide-react'
import { Database } from '@/types/supabase'

type Course = Database['public']['Tables']['courses']['Row']

export const dynamic = 'force-dynamic'

export default async function MyCoursesPage() {
    const user = await getMockUser()

    if (!user) {
        redirect('/auth/login')
    }

    // デモ用：購入済みコースを取得
    const allCourses = await getPublishedCourses()
    const purchasedCoursesPromises = allCourses.map(async (course) => {
        const purchase = await getPurchase(user.id, course.id)
        return purchase ? course : null
    })
    const purchasedCoursesResults = await Promise.all(purchasedCoursesPromises)
    const courses = purchasedCoursesResults.filter((c): c is Course => c !== null)

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
                マイコース
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.length === 0 ? (
                    <div className="col-span-full text-center py-20 bg-gray-50 rounded-lg">
                        <p className="text-lg text-gray-600 mb-4">まだ購入したコースはありません。</p>
                        <Button asChild>
                            <Link href="/courses">コースを探す</Link>
                        </Button>
                    </div>
                ) : (
                    courses.map((course) => (
                        <Card key={course.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                            {course.thumbnail_url && (
                                <div className="aspect-video w-full overflow-hidden bg-gray-100">
                                    <img
                                        src={course.thumbnail_url}
                                        alt={course.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-xl">{course.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="line-clamp-2 text-gray-600">
                                    {course.description}
                                </p>
                            </CardContent>
                            <CardFooter className="bg-orange-50/50 p-6 border-t pt-4">
                                <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 font-bold" size="lg">
                                    <Link href={`/learn/${course.id}`} className="flex items-center gap-2">
                                        <PlayCircle className="h-5 w-5" />
                                        受講を続ける
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
