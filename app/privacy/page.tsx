export const metadata = {
    title: 'プライバシーポリシー | アカガミ・スクール',
    description: 'プライバシーポリシー',
}

export default function PrivacyPage() {
    return (
        <div className="container py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                    プライバシーポリシー
                </h1>

                <div className="prose prose-lg max-w-none space-y-8">
                    <section>
                        <p className="text-gray-700 leading-relaxed">
                            アカガミ・スクール（以下「当スクール」）は、お客様の個人情報の保護を重要な責務と認識し、
                            個人情報の保護に関する法律（個人情報保護法）その他の関連法令を遵守し、
                            お客様の個人情報を適切に取り扱います。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 個人情報の取得について</h2>
                        <p className="text-gray-700 leading-relaxed">
                            当スクールは、以下の情報を取得する場合があります。
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                            <li>お名前、メールアドレス、パスワードなどのアカウント情報</li>
                            <li>お支払いに関する情報（クレジットカード情報は当スクールでは保持せず、決済代行業者が管理します）</li>
                            <li>学習進捗情報</li>
                            <li>お問い合わせ内容</li>
                            <li>アクセスログ、IPアドレス、Cookie情報などの技術情報</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. 個人情報の利用目的</h2>
                        <p className="text-gray-700 leading-relaxed">
                            当スクールは、取得した個人情報を以下の目的で利用します。
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                            <li>サービスの提供、運営、管理</li>
                            <li>お客様へのご連絡、お問い合わせへの対応</li>
                            <li>サービスの改善、新サービスの開発</li>
                            <li>不正利用の防止、セキュリティ対策</li>
                            <li>利用規約に違反する行為への対応</li>
                            <li>統計データの作成（個人を特定できない形式に加工した場合）</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. 個人情報の第三者提供</h2>
                        <p className="text-gray-700 leading-relaxed">
                            当スクールは、以下の場合を除き、お客様の個人情報を第三者に提供することはありません。
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                            <li>お客様の同意がある場合</li>
                            <li>法令に基づく場合</li>
                            <li>人の生命、身体又は財産の保護のために必要がある場合</li>
                            <li>サービスの提供に必要な業務委託先への提供（必要な範囲内で適切な管理を実施）</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. 個人情報の管理</h2>
                        <p className="text-gray-700 leading-relaxed">
                            当スクールは、お客様の個人情報を適切に管理し、漏洩、滅失、毀損の防止に努めます。
                            また、個人情報への不正アクセス、改ざん、漏洩等のリスクに対して、適切なセキュリティ対策を実施します。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookie（クッキー）について</h2>
                        <p className="text-gray-700 leading-relaxed">
                            当スクールは、サービスの提供にあたり、Cookieを使用する場合があります。
                            Cookieは、お客様のブラウザに保存される小さなテキストファイルで、
                            サービスの利便性向上や利用状況の分析に使用します。
                            お客様は、ブラウザの設定によりCookieの受け取りを拒否することができますが、
                            その場合、サービスの一部が正常に動作しない可能性があります。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. 個人情報の開示・訂正・削除</h2>
                        <p className="text-gray-700 leading-relaxed">
                            お客様は、当スクールが保有する個人情報について、開示、訂正、削除を請求することができます。
                            ご請求の際は、お問い合わせフォームまたはメールにてご連絡ください。
                            本人確認の上、適切に対応いたします。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. プライバシーポリシーの変更</h2>
                        <p className="text-gray-700 leading-relaxed">
                            当スクールは、必要に応じて本プライバシーポリシーを変更することがあります。
                            変更後のプライバシーポリシーは、本サイトに掲載した時点で効力を生じるものとします。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. お問い合わせ</h2>
                        <p className="text-gray-700 leading-relaxed">
                            個人情報の取り扱いに関するお問い合わせは、以下の連絡先までご連絡ください。<br />
                            メールアドレス: <a href="mailto:info@akagami-school.com" className="text-orange-600 hover:underline">info@akagami-school.com</a>
                        </p>
                    </section>

                    <section>
                        <p className="text-gray-600 text-sm mt-8">
                            制定日: 2024年1月1日<br />
                            最終更新日: 2024年1月1日
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}

