import Link from 'next/link'

export function SiteFooter() {
    return (
        <footer className="border-t bg-white">
            <div className="container py-8">
                <div className="flex flex-col items-center gap-4 text-sm text-gray-600 text-center">
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        <Link href="/" className="hover:text-orange-600 transition-colors">
                            Home
                        </Link>
                        <Link href="/company" className="hover:text-orange-600 transition-colors">
                            運営会社
                        </Link>
                        <Link href="/contact" className="hover:text-orange-600 transition-colors">
                            お問い合わせ
                        </Link>
                        <Link href="/courses" className="hover:text-orange-600 transition-colors">
                            すべてのコース
                        </Link>
                        <Link href="/legal" className="hover:text-orange-600 transition-colors">
                            特商法の表示
                        </Link>
                        <Link href="/privacy" className="hover:text-orange-600 transition-colors">
                            プライバシーポリシー
                        </Link>
                    </div>
                    <div className="text-center">
                        <p>© Copyright アカガミ・スクール {new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

