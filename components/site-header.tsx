import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { signout } from '@/app/auth/actions'
import { getMockUser } from '@/lib/auth/mock-auth'

export async function SiteHeader() {
    const user = await getMockUser()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <Image
                            src="/akagami-logo.png"
                            alt="アカガミ・スクール"
                            width={180}
                            height={40}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link href="/courses" className="transition-colors hover:text-orange-600">
                            コース一覧
                        </Link>
                        {user && (
                            <Link href="/my-courses" className="transition-colors hover:text-orange-600">
                                マイコース
                            </Link>
                        )}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 hidden md:inline-block">
                                {user.email}
                            </span>
                            <form action={signout}>
                                <Button variant="outline" size="sm">
                                    ログアウト
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/auth/login">ログイン</Link>
                            </Button>
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white" asChild>
                                <Link href="/auth/signup">新規登録</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
