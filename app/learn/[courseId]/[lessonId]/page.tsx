import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getLesson, getLessons, getUserProgress } from '@/lib/data/lessons'
import { getPurchase } from '@/lib/data/purchases'
import { getMockUser } from '@/lib/auth/mock-auth'
import { Button } from '@/components/ui/button'
import { CheckCircle, Lock, ChevronRight } from 'lucide-react'
import { VideoPlayer } from '@/components/video-player'
import { toggleLessonComplete } from '@/app/learn/actions'

export default async function LessonPage({ params }: { params: Promise<{ courseId: string; lessonId: string }> }) {
    const { courseId, lessonId } = await params
    const lesson = await getLesson(lessonId)

    if (!lesson) notFound()

    const user = await getMockUser()
    const allLessons = await getLessons(courseId)
    const currentIndex = allLessons.findIndex(l => l.id === lessonId)
    const nextLesson = currentIndex >= 0 && currentIndex < allLessons.length - 1 
        ? allLessons[currentIndex + 1] 
        : null

    let isPurchased = false
    let isCompleted = false

    if (user) {
        const purchase = await getPurchase(user.id, courseId)
        isPurchased = !!purchase

        // デモ用：進捗情報を取得
        const progress = await getUserProgress(user.id, courseId)
        const lessonProgress = progress.find(p => p.lesson_id === lessonId)
        if (lessonProgress?.completed) isCompleted = true
    }

    // Access Control: 無料レッスンは誰でも見れる、有料レッスンは購入が必要
    const isLocked = !lesson.is_free && !isPurchased

    if (isLocked) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 sm:p-8 text-center space-y-4 sm:space-y-6">
                <div className="bg-orange-100 p-6 sm:p-8 rounded-full">
                    <Lock className="h-12 w-12 sm:h-16 sm:w-16 text-orange-600" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl sm:text-3xl font-bold text-gray-900">このレッスンは購入が必要です</h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-md">
                        続きをご覧になるには、コースを購入してください。
                    </p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-sm">
                    <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-auto">
                        <Link href={`/courses/${courseId}`}>
                            コース詳細を見る
                        </Link>
                    </Button>
                    {!user && (
                        <Button asChild size="lg" variant="outline" className="font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-auto">
                            <Link href={`/auth/login?next=/learn/${courseId}/${lessonId}`}>
                                ログインする
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-8">
            {/* ヘッダー */}
            <div className="space-y-2">
                {lesson.chapter_title && (
                    <div className="text-xs sm:text-sm font-semibold text-orange-600 uppercase tracking-wide">
                        {lesson.chapter_title}
                    </div>
                )}
                <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {lesson.title}
                </h1>
                {lesson.is_free && (
                    <div className="inline-flex items-center rounded-full bg-blue-100 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-blue-800">
                        無料で視聴可能
                    </div>
                )}
            </div>

            {/* 動画プレーヤー */}
            <div className="space-y-4 sm:space-y-6">
                {lesson.video_id ? (
                    <div className="space-y-3 sm:space-y-4">
                        <div className="bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-2xl -mx-4 sm:mx-0">
                            <VideoPlayer provider={lesson.video_provider} videoId={lesson.video_id} />
                        </div>
                        
                        {/* 完了ボタン（動画の直下） */}
                        {user && (
                            <div className="flex flex-col gap-3">
                                <form action={async () => {
                                    'use server'
                                    await toggleLessonComplete(lessonId, !isCompleted)
                                }} className="w-full">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className={isCompleted 
                                            ? "w-full text-base sm:text-lg h-12 sm:h-auto bg-green-600 hover:bg-green-700 shadow-lg" 
                                            : "w-full text-base sm:text-lg h-12 sm:h-auto bg-orange-600 hover:bg-orange-700 shadow-lg"
                                        }
                                    >
                                        {isCompleted ? (
                                            <>
                                                <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                                <span className="hidden sm:inline">受講完了（未完了に戻す）</span>
                                                <span className="sm:hidden">完了済み</span>
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                                完了して次へ進む
                                            </>
                                        )}
                                    </Button>
                                </form>
                                
                                {/* 次のレッスンへのリンク */}
                                {nextLesson && (nextLesson.is_free || isPurchased) && (
                                    <Button 
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="w-full sm:w-auto text-base sm:text-lg h-12 sm:h-auto border-2 border-gray-300 hover:border-orange-500 hover:bg-orange-50"
                                    >
                                        <Link href={`/learn/${courseId}/${nextLesson.id}`}>
                                            次のレッスン
                                            <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 rounded-lg sm:rounded-xl border-2 border-dashed">
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl mb-2">📹</div>
                            <div className="text-base sm:text-lg">動画はありません</div>
                        </div>
                    </div>
                )}

                {/* コンテンツ */}
                {lesson.content_md && (
                    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm p-4 sm:p-8 md:p-10">
                        <div className="prose prose-sm sm:prose-lg max-w-none text-gray-700">
                            <div className="whitespace-pre-wrap leading-relaxed">{lesson.content_md}</div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}
