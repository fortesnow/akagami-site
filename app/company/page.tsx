export const metadata = {
    title: '運営会社 | アカガミ・スクール',
    description: 'アカガミ・スクールの運営会社情報',
}

export default function CompanyPage() {
    return (
        <div className="container py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                    運営会社
                </h1>

                <div className="prose prose-lg max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">会社概要</h2>
                        <dl className="grid md:grid-cols-2 gap-4">
                            <div>
                                <dt className="font-semibold text-gray-700 mb-1">会社名</dt>
                                <dd className="text-gray-600">アカガミ・スクール</dd>
                            </div>
                            <div>
                                <dt className="font-semibold text-gray-700 mb-1">代表者</dt>
                                <dd className="text-gray-600">代表取締役 赤髪</dd>
                            </div>
                            <div>
                                <dt className="font-semibold text-gray-700 mb-1">設立</dt>
                                <dd className="text-gray-600">2024年1月</dd>
                            </div>
                            <div>
                                <dt className="font-semibold text-gray-700 mb-1">所在地</dt>
                                <dd className="text-gray-600">〒000-0000<br />東京都渋谷区...</dd>
                            </div>
                            <div>
                                <dt className="font-semibold text-gray-700 mb-1">事業内容</dt>
                                <dd className="text-gray-600">オンライン教育サービス<br />プログラミング学習コンテンツの提供</dd>
                            </div>
                            <div>
                                <dt className="font-semibold text-gray-700 mb-1">お問い合わせ</dt>
                                <dd className="text-gray-600">
                                    <a href="mailto:info@akagami-school.com" className="text-orange-600 hover:underline">
                                        info@akagami-school.com
                                    </a>
                                </dd>
                            </div>
                        </dl>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">私たちについて</h2>
                        <p className="text-gray-700 leading-relaxed">
                            アカガミ・スクールは、60代からのプログラミング学習をサポートするオンラインスクールです。
                            初心者の方でも安心して学べるよう、わかりやすく丁寧な解説を心がけています。
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            あなたのペースで、無理なく学習を進められる環境を提供し、
                            プログラミングの楽しさと可能性を伝えていきます。
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}

