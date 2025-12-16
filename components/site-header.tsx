import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { signout } from '@/app/auth/actions'
import { getMockUser } from '@/lib/auth/mock-auth'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, BookOpen, User, LogOut } from 'lucide-react'

export async function SiteHeader() {
    const user = await getMockUser()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
                {/* ロゴ */}
                <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                    <Image
                        src="/akagami-logo.png"
                        alt="アカガミ・スクール"
                        width={140}
                        height={32}
                        className="h-8 sm:h-10 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* デスクトップナビゲーション */}
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

                {/* デスクトップ認証ボタン */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">
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

                {/* モバイルメニュー */}
                <div className="flex md:hidden items-center gap-2">
                    {!user && (
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white text-xs px-3" asChild>
                            <Link href="/auth/signup">新規登録</Link>
                        </Button>
                    )}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-2">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">メニューを開く</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
                            <div className="flex flex-col h-full">
                                {/* モバイルメニューヘッダー */}
                                <div className="p-4 border-b bg-gray-50">
                                    <Image
                                        src="/akagami-logo.png"
                                        alt="アカガミ・スクール"
                                        width={120}
                                        height={28}
                                        className="h-7 w-auto object-contain"
                                    />
                                </div>

                                {/* ユーザー情報 */}
                                {user && (
                                    <div className="p-4 border-b bg-orange-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
                                                <User className="h-5 w-5 text-orange-700" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {user.email}
                                                </p>
                                                <p className="text-xs text-gray-500">ログイン中</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ナビゲーションリンク */}
                                <nav className="flex-1 p-4 space-y-1">
                                    <Link 
                                        href="/courses" 
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                    >
                                        <BookOpen className="h-5 w-5" />
                                        <span className="font-medium">コース一覧</span>
                                    </Link>
                                    {user && (
                                        <Link 
                                            href="/my-courses" 
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        >
                                            <User className="h-5 w-5" />
                                            <span className="font-medium">マイコース</span>
                                        </Link>
                                    )}
                                </nav>

                                {/* 認証ボタン */}
                                <div className="p-4 border-t bg-gray-50 space-y-2">
                                    {user ? (
                                        <form action={signout} className="w-full">
                                            <Button variant="outline" className="w-full h-12 text-base">
                                                <LogOut className="h-4 w-4 mr-2" />
                                                ログアウト
                                            </Button>
                                        </form>
                                    ) : (
                                        <>
                                            <Button asChild className="w-full h-12 text-base bg-orange-600 hover:bg-orange-700">
                                                <Link href="/auth/signup">新規登録（無料）</Link>
                                            </Button>
                                            <Button asChild variant="outline" className="w-full h-12 text-base">
                                                <Link href="/auth/login">ログイン</Link>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
