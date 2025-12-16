'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function CourseSearch() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString())
            if (searchQuery) {
                params.set('search', searchQuery)
            } else {
                params.delete('search')
            }
            router.push(`/courses?${params.toString()}`)
        }, 300) // デバウンス

        return () => clearTimeout(timer)
    }, [searchQuery, router, searchParams])

    return (
        <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
                type="text"
                placeholder="コースを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
            />
        </div>
    )
}

