import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-orange-50 to-white py-12 sm:py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              アカガミ・スクール
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8">
              60代からのプログラミング学習
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
              あなたのペースで、無理なく学べるプログラミング講座です。
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              初心者でも安心して始められる、わかりやすい内容をご用意しました。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto" asChild>
                <Link href="/courses">
                  コース一覧を見る
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto" asChild>
                <Link href="/auth/login">
                  ログイン
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
              こんな方におすすめ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl sm:bg-transparent">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🎓</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  初心者でも安心
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  プログラミング経験がなくても、基礎から丁寧に学べます
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl sm:bg-transparent">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">⏰</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  自分のペースで
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  いつでも、どこでも、あなたのペースで学習できます
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl sm:bg-transparent sm:col-span-2 md:col-span-1">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💡</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  実践的な内容
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  実際に使えるスキルを身につけられる実践的なカリキュラム
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 bg-orange-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              今すぐ始めましょう
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              無料のレッスンから始めて、プログラミングの世界を体験してください
            </p>
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto" asChild>
              <Link href="/courses">
                コースを探す
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
