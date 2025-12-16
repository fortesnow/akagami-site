'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CheckCircle, Lock, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Database } from '@/types/supabase'

type Lesson = Database['public']['Tables']['lessons']['Row']
type Course = Database['public']['Tables']['courses']['Row']

interface LessonSidebarProps {
    course: Course
    courseId: string
    lessons: Lesson[]
    isPurchased: boolean
    completedLessonIds: Set<string>
}

export function LessonSidebar({ 
    course, 
    courseId, 
    lessons, 
    isPurchased, 
    completedLessonIds 
}: LessonSidebarProps) {
    const pathname = usePathname()
    const currentLessonId = pathname?.split('/').pop() || ''

    // 章ごとにレッスンをグループ化
    const lessonsByChapter = lessons.reduce((acc, lesson) => {
        const chapter = lesson.chapter_title || 'その他'
        if (!acc[chapter]) {
            acc[chapter] = []
        }
        acc[chapter].push(lesson)
        return acc
    }, {} as Record<string, typeof lessons>)

    return (
        <div className="flex h-full flex-col border-r bg-white">
            {/* ヘッダー */}
            <div className="p-5 border-b bg-gradient-to-r from-orange-50 to-orange-100">
                <h2 className="font-bold text-lg line-clamp-2 text-gray-900 mb-2">{course.title}</h2>
                <Link href="/courses" className="text-sm text-gray-600 hover:text-orange-600 hover:underline flex items-center gap-1">
                    <span>←</span>
                    <span>コース一覧に戻る</span>
                </Link>
            </div>

            {/* レッスン一覧 */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-6">
                    {Object.entries(lessonsByChapter).map(([chapter, chapterLessons]) => (
                        <div key={chapter} className="space-y-2">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 mb-2">
                                {chapter}
                            </h3>
                            {chapterLessons.map((lesson) => {
                                const isLocked = !isPurchased && !lesson.is_free
                                const isCompleted = completedLessonIds.has(lesson.id)
                                const isCurrentLesson = lesson.id === currentLessonId

                                return (
                                    <Link
                                        key={lesson.id}
                                        href={`/learn/${courseId}/${lesson.id}`}
                                        className={cn(
                                            "flex items-start gap-3 p-3 rounded-lg text-sm transition-all",
                                            isCurrentLesson 
                                                ? "bg-orange-50 border-2 border-orange-500 shadow-sm" 
                                                : "hover:bg-gray-50 border-2 border-transparent",
                                            isLocked && !isCurrentLesson ? "opacity-50" : ""
                                        )}
                                    >
                                        <div className="flex-shrink-0 mt-0.5">
                                            {isCompleted ? (
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                            ) : isLocked ? (
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <PlayCircle className={cn(
                                                    "h-5 w-5",
                                                    isCurrentLesson ? "text-orange-600" : "text-gray-400"
                                                )} />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <span className={cn(
                                                    "font-medium break-words",
                                                    isCurrentLesson ? "text-orange-900 font-bold" : "text-gray-700"
                                                )}>
                                                    {lesson.title}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                {!isPurchased && lesson.is_free && (
                                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                                                        無料
                                                    </span>
                                                )}
                                                {isLocked && (
                                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                                                        有料
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* フッター */}
            {!isPurchased && (
                <div className="p-4 border-t bg-orange-50">
                    <p className="text-xs text-gray-600 mb-3">
                        すべてのレッスンを見るには、コースを購入してください。
                    </p>
                    <Button asChild size="sm" className="w-full bg-orange-600 hover:bg-orange-700 font-semibold">
                        <Link href={`/courses/${courseId}`}>
                            コースを購入する
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    )
}

