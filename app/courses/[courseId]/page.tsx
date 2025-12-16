import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCourse } from '@/lib/data/courses'
import { getLessons } from '@/lib/data/lessons'
import { getPurchase } from '@/lib/data/purchases'
import { getMockUser } from '@/lib/auth/mock-auth'
import { Button } from '@/components/ui/button'
import { CheckCircle2, PlayCircle, BookOpen, Clock, Users, ChevronDown, Lock } from 'lucide-react'
import { CourseCurriculum } from '@/components/course-curriculum'

const CHECKOUT_URL = '/api/checkout/create'

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await params
    const course = await getCourse(courseId)

    if (!course) {
        notFound()
    }

    const user = await getMockUser()
    const lessons = await getLessons(courseId)
    
    // 章ごとにレッスンをグループ化
    const lessonsByChapter = lessons.reduce((acc, lesson) => {
        const chapter = lesson.chapter_title || 'その他'
        if (!acc[chapter]) {
            acc[chapter] = []
        }
        acc[chapter].push(lesson)
        return acc
    }, {} as Record<string, typeof lessons>)

    const chapterCount = Object.keys(lessonsByChapter).length
    const lessonCount = lessons.length
    const freeLesson = lessons.find(l => l.is_free)

    let isPurchased = false
    if (user) {
        const purchase = await getPurchase(user.id, courseId)
        isPurchased = !!purchase
    }

    // コースごとの学習内容（デモ用）
    const learningPoints = [
        'プログラミングの基本概念と考え方を理解する',
        '実際にコードを書いて動かす経験を積む',
        'エラーの原因を特定し解決する方法を学ぶ',
        '実践的なプロジェクトを通じてスキルを定着させる',
        '次のステップへ進むための基礎を固める',
    ]

    const targetAudience = [
        'プログラミングを始めたい初心者の方',
        '独学で挫折した経験がある方',
        '体系的に基礎から学びたい方',
        '実践的なスキルを身につけたい方',
    ]

    return (
        <div className="min-h-screen">
            {/* ヒーローセクション */}
            <section className="bg-gradient-to-b from-orange-50 to-white py-8 sm:py-12 md:py-20 px-4">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                            {course.title}
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                            {course.description.split('\n')[0]}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                            {isPurchased ? (
                                <Button asChild size="lg" className="h-12 sm:h-14 text-base sm:text-lg font-bold bg-green-600 hover:bg-green-700 px-6 sm:px-8">
                                    <Link href={`/learn/${course.id}`}>
                                        <PlayCircle className="mr-2 h-5 w-5" />
                                        講座を受講する
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button asChild size="lg" className="h-12 sm:h-14 text-base sm:text-lg font-bold bg-orange-600 hover:bg-orange-700 px-6 sm:px-8">
                                        <Link href={`/learn/${course.id}`}>
                                            <PlayCircle className="mr-2 h-5 w-5" />
                                            講座を受講する
                                        </Link>
                                    </Button>
                                    {freeLesson && (
                                        <Button asChild size="lg" variant="outline" className="h-12 sm:h-14 text-base sm:text-lg font-bold px-6 sm:px-8 border-2">
                                            <Link href={`/learn/${course.id}/${freeLesson.id}`}>
                                                無料プレビュー
                                            </Link>
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* コース概要セクション */}
            <section className="py-8 sm:py-12 md:py-16 bg-white px-4">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-12 text-center">
                            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8">
                                {course.description}
                            </p>
                            
                            {/* スペック */}
                            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 md:gap-10 mb-6 sm:mb-8">
                                <div className="flex items-center justify-center gap-2 text-gray-600">
                                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                                    <span className="font-medium text-sm sm:text-base">{chapterCount}セクション {lessonCount}レッスン</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-gray-600">
                                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                                    <span className="font-medium text-sm sm:text-base">約{lessonCount * 6}分の講座</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-gray-600">
                                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                                    <span className="font-medium text-sm sm:text-base">100名以上が受講</span>
                                </div>
                            </div>

                            {/* 価格 */}
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                                ¥{course.price_jpy.toLocaleString()}
                                <span className="text-sm sm:text-lg font-normal text-gray-600 ml-1 sm:ml-2 block sm:inline mt-1 sm:mt-0">（完全買い切り）</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 講座概要セクション */}
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
                            講座概要
                        </h2>
                        <div className="bg-white rounded-xl p-8 shadow-sm">
                            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {course.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* こんな方におすすめセクション */}
            <section className="py-12 md:py-16 bg-white">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
                            こんな方におすすめの講座です
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {targetAudience.map((item, index) => (
                                <div key={index} className="flex items-start gap-3 bg-orange-50 rounded-lg p-4">
                                    <CheckCircle2 className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* レッスン数セクション */}
            <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                            {chapterCount}セクション{lessonCount}レッスン収録
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl opacity-90">
                            1つのレッスンを約6分で学習できるから<br className="hidden sm:block" />
                            自分のペースで学習を進められます。
                        </p>
                    </div>
                </div>
            </section>

            {/* 学べることセクション */}
            <section className="py-12 md:py-16 bg-white">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
                            この講座で学べること
                        </h2>
                        <div className="space-y-4">
                            {learningPoints.map((point, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                        {index + 1}
                                    </div>
                                    <span className="text-lg text-gray-700">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* コースカリキュラムセクション */}
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
                            コースカリキュラム
                        </h2>
                        <CourseCurriculum 
                            lessonsByChapter={lessonsByChapter} 
                            courseId={courseId}
                            isPurchased={isPurchased}
                        />
                    </div>
                </div>
            </section>

            {/* 講座料金セクション */}
            <section className="py-10 sm:py-12 md:py-20 bg-gradient-to-b from-white to-orange-50 px-4">
                <div className="container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                            講座料金（買い切り）
                        </h2>
                        <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
                            ¥{course.price_jpy.toLocaleString()}
                        </div>
                        
                        {isPurchased ? (
                            <div className="space-y-3 sm:space-y-4">
                                <div className="bg-green-100 text-green-800 py-2 sm:py-3 px-4 sm:px-6 rounded-lg inline-flex items-center gap-2 font-bold text-sm sm:text-base">
                                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                    購入済みです
                                </div>
                                <div>
                                    <Button asChild size="lg" className="h-14 sm:h-16 text-lg sm:text-xl font-bold bg-green-600 hover:bg-green-700 px-8 sm:px-12 w-full sm:w-auto">
                                        <Link href={`/learn/${course.id}`}>
                                            講座を受講する
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3 sm:space-y-4">
                                {user ? (
                                    <form action={CHECKOUT_URL} method="POST">
                                        <input type="hidden" name="courseId" value={course.id} />
                                        <Button type="submit" size="lg" className="h-14 sm:h-16 text-lg sm:text-xl font-bold bg-orange-600 hover:bg-orange-700 px-8 sm:px-12 shadow-lg w-full sm:w-auto">
                                            講座を受講する
                                        </Button>
                                    </form>
                                ) : (
                                    <Button asChild size="lg" className="h-14 sm:h-16 text-lg sm:text-xl font-bold bg-orange-600 hover:bg-orange-700 px-8 sm:px-12 shadow-lg w-full sm:w-auto">
                                        <Link href={`/auth/login?next=/courses/${course.id}`}>
                                            講座を受講する
                                        </Link>
                                    </Button>
                                )}
                                <p className="text-xs sm:text-sm text-gray-500">
                                    一度購入すれば、無期限で視聴できます。
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}
