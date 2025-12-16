import Link from 'next/link'
import { Suspense } from 'react'
import { getPublishedCourses } from '@/lib/data/courses'
import { getLessons } from '@/lib/data/lessons'
import { CourseSearch } from '@/components/course-search'

export const dynamic = 'force-dynamic'

export default async function CoursesPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>
}) {
    const courses = await getPublishedCourses()
    const params = await searchParams
    const searchQuery = params.search?.toLowerCase() || ''

    // 各コースのレッスン数を取得
    const coursesWithLessonCount = await Promise.all(
        courses.map(async (course) => {
            const lessons = await getLessons(course.id)
            return {
                ...course,
                lessonCount: lessons.length,
            }
        })
    )

    // 検索フィルタリング
    const filteredCourses = searchQuery
        ? coursesWithLessonCount.filter(
              (course) =>
                  course.title.toLowerCase().includes(searchQuery) ||
                  course.description.toLowerCase().includes(searchQuery)
          )
        : coursesWithLessonCount

    return (
        <div className="container py-6 sm:py-8 md:py-12 px-4 sm:px-6">
            {/* ヘッダー */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-2">
                    コース
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                    あなたのペースで学べる、わかりやすい講座をご用意しました。
                </p>
            </div>

            {/* 検索バー */}
            <div className="mb-6 sm:mb-8">
                <Suspense fallback={
                    <div className="relative max-w-md">
                        <div className="h-12 bg-gray-100 rounded-md animate-pulse" />
                    </div>
                }>
                    <CourseSearch />
                </Suspense>
            </div>

            {/* コース一覧 */}
            <div className="space-y-3 sm:space-y-4">
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-12 sm:py-20 text-gray-500">
                        {searchQuery ? (
                            <>
                                <p className="text-base sm:text-lg mb-2">検索結果が見つかりませんでした</p>
                                <p className="text-xs sm:text-sm">別のキーワードで検索してください</p>
                            </>
                        ) : (
                            <p className="text-base sm:text-lg">現在公開中のコースはありません。</p>
                        )}
                    </div>
                ) : (
                    filteredCourses.map((course) => (
                        <Link
                            key={course.id}
                            href={`/courses/${course.id}`}
                            className="block border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-orange-500 hover:shadow-md transition-all bg-white active:bg-gray-50"
                        >
                            <div className="flex flex-col gap-3 sm:gap-4">
                                <div className="flex-1">
                                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-snug">
                                        {course.title}
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600">
                                        <span className="font-medium">
                                            {course.lessonCount} レッスン
                                        </span>
                                        <span className="text-xl sm:text-2xl font-bold text-orange-600">
                                            ¥{course.price_jpy.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <span className="inline-flex items-center text-orange-600 font-semibold text-sm sm:text-base">
                                        詳細を見る
                                        <svg
                                            className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}
