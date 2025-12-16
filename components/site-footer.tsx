import Link from 'next/link'

export function SiteFooter() {
    return (
        <footer className="border-t bg-white safe-area-inset-bottom">
            <div className="container py-6 sm:py-8 px-4 sm:px-6">
                <div className="flex flex-col items-center gap-4 sm:gap-6 text-center">
                    {/* モバイルでは2列、デスクトップでは1列に */}
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-x-4 gap-y-3 sm:gap-4 md:gap-6 text-sm text-gray-600">
                        <Link href="/" className="hover:text-orange-600 transition-colors py-1">
                            Home
                        </Link>
                        <Link href="/company" className="hover:text-orange-600 transition-colors py-1">
                            運営会社
                        </Link>
                        <Link href="/contact" className="hover:text-orange-600 transition-colors py-1">
                            お問い合わせ
                        </Link>
                        <Link href="/courses" className="hover:text-orange-600 transition-colors py-1">
                            すべてのコース
                        </Link>
                        <Link href="/legal" className="hover:text-orange-600 transition-colors py-1">
                            特商法の表示
                        </Link>
                        <Link href="/privacy" className="hover:text-orange-600 transition-colors py-1">
                            プライバシーポリシー
                        </Link>
                    </div>
                    <div className="text-center text-xs sm:text-sm text-gray-500">
                        <p>© Copyright アカガミ・スクール {new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

