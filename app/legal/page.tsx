export const metadata = {
    title: '特定商取引法に基づく表示 | アカガミ・スクール',
    description: '特定商取引法に基づく表示',
}

export default function LegalPage() {
    return (
        <div className="container py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                    特定商取引法に基づく表示
                </h1>

                <div className="prose prose-lg max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">販売業者</h2>
                        <p className="text-gray-700">アカガミ・スクール</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">代表者</h2>
                        <p className="text-gray-700">代表取締役 赤髪</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">所在地</h2>
                        <p className="text-gray-700">
                            〒000-0000<br />
                            東京都渋谷区...
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">お問い合わせ先</h2>
                        <p className="text-gray-700">
                            メールアドレス: <a href="mailto:info@akagami-school.com" className="text-orange-600 hover:underline">info@akagami-school.com</a><br />
                            電話番号: 03-0000-0000（受付時間: 平日10:00〜18:00）
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">販売価格</h2>
                        <p className="text-gray-700">
                            各コースの価格は、コース詳細ページに表示されている価格（税込）とします。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">支払方法</h2>
                        <p className="text-gray-700">
                            クレジットカード決済（Visa、Mastercard、American Express、JCB）
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">支払時期</h2>
                        <p className="text-gray-700">
                            クレジットカード決済の場合、各カード会社の規約に基づき、ご利用代金がご指定の口座から引き落とされます。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">サービス提供時期</h2>
                        <p className="text-gray-700">
                            お支払い完了後、すぐにコースへのアクセスが可能になります。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">返品・キャンセルについて</h2>
                        <p className="text-gray-700">
                            デジタルコンテンツの性質上、お客様都合による返品・キャンセルはお受けできません。
                            ただし、サービスに重大な不具合がある場合は、返金対応をさせていただきます。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">動作環境</h2>
                        <p className="text-gray-700">
                            本サービスをご利用いただくには、以下の環境が必要です。<br />
                            - インターネット接続環境<br />
                            - パソコン、タブレット、スマートフォンのいずれか<br />
                            - 最新のWebブラウザ（Chrome、Firefox、Safari、Edgeなど）
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}

