import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCourse } from '@/lib/data/courses'
import { getLessons, getUserProgress } from '@/lib/data/lessons'
import { getPurchase } from '@/lib/data/purchases'
import { getMockUser } from '@/lib/auth/mock-auth'
import { CheckCircle, Lock, PlayCircle, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { LessonSidebar } from '@/components/lesson-sidebar'

export default async function LearnLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ courseId: string }>
}) {
    const { courseId } = await params
    const course = await getCourse(courseId)
    if (!course) redirect('/courses')

    const lessons = await getLessons(courseId)
    const user = await getMockUser()

    let isPurchased = false
    let completedLessonIds = new Set<string>()

    if (user) {
        const purchase = await getPurchase(user.id, courseId)
        isPurchased = !!purchase
        const progress = await getUserProgress(user.id, courseId)
        progress.forEach(p => {
            if (p.completed) completedLessonIds.add(p.lesson_id)
        })
    }


    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-80 flex-shrink-0">
                <LessonSidebar 
                    course={course}
                    courseId={courseId}
                    lessons={lessons}
                    isPurchased={isPurchased}
                    completedLessonIds={completedLessonIds}
                />
            </div>

            {/* Mobile Header trigger */}
            <div className="md:hidden absolute top-16 left-0 right-0 z-20 flex items-center justify-between p-4 bg-white border-b lg:hidden">
                <span className="font-bold truncate max-w-[200px]">{course.title}</span>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Menu className="h-4 w-4 mr-2" />
                            目次
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-full sm:max-w-md">
                        <LessonSidebar 
                            course={course}
                            courseId={courseId}
                            lessons={lessons}
                            isPurchased={isPurchased}
                            completedLessonIds={completedLessonIds}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50 pt-16 md:pt-0">
                {children}
            </div>
        </div>
    )
}
