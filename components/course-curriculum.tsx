'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, PlayCircle, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Database } from '@/types/supabase'

type Lesson = Database['public']['Tables']['lessons']['Row']

interface CourseCurriculumProps {
    lessonsByChapter: Record<string, Lesson[]>
    courseId: string
    isPurchased: boolean
}

export function CourseCurriculum({ lessonsByChapter, courseId, isPurchased }: CourseCurriculumProps) {
    const [openChapters, setOpenChapters] = useState<Record<string, boolean>>(() => {
        // デフォルトで最初の章を開く
        const chapters = Object.keys(lessonsByChapter)
        return chapters.length > 0 ? { [chapters[0]]: true } : {}
    })

    const toggleChapter = (chapter: string) => {
        setOpenChapters(prev => ({
            ...prev,
            [chapter]: !prev[chapter]
        }))
    }

    const chapters = Object.entries(lessonsByChapter)

    return (
        <div className="space-y-4">
            {chapters.map(([chapter, lessons], chapterIndex) => (
                <div key={chapter} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                    {/* 章ヘッダー */}
                    <button
                        onClick={() => toggleChapter(chapter)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                {chapterIndex + 1}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{chapter}</h3>
                                <p className="text-sm text-gray-500">{lessons.length} レッスン</p>
                            </div>
                        </div>
                        <ChevronDown 
                            className={cn(
                                "h-6 w-6 text-gray-400 transition-transform",
                                openChapters[chapter] && "rotate-180"
                            )} 
                        />
                    </button>

                    {/* レッスン一覧 */}
                    {openChapters[chapter] && (
                        <div className="border-t border-gray-100">
                            {lessons.map((lesson, lessonIndex) => {
                                const isLocked = !isPurchased && !lesson.is_free
                                const canAccess = isPurchased || lesson.is_free

                                return (
                                    <div 
                                        key={lesson.id} 
                                        className={cn(
                                            "flex items-center gap-4 p-4 border-b border-gray-100 last:border-b-0",
                                            canAccess ? "hover:bg-orange-50" : "opacity-60"
                                        )}
                                    >
                                        <div className="flex-shrink-0">
                                            {isLocked ? (
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <PlayCircle className="h-5 w-5 text-orange-600" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            {canAccess ? (
                                                <Link 
                                                    href={`/learn/${courseId}/${lesson.id}`}
                                                    className="text-gray-700 hover:text-orange-600 font-medium"
                                                >
                                                    {lesson.title}
                                                </Link>
                                            ) : (
                                                <span className="text-gray-500 font-medium">
                                                    {lesson.title}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-shrink-0">
                                            {lesson.is_free && !isPurchased && (
                                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                    無料プレビュー
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

