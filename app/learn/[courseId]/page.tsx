import { redirect } from 'next/navigation'
import { getLessons } from '@/lib/data/lessons'

export default async function LearnPage({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await params
    const lessons = await getLessons(courseId)
    if (lessons.length > 0) {
        // 無料レッスンを優先的に表示、なければ最初のレッスン
        const freeLesson = lessons.find(l => l.is_free)
        const targetLesson = freeLesson || lessons[0]
        redirect(`/learn/${courseId}/${targetLesson.id}`)
    }
    return <div>レッスンがありません。</div>
}
