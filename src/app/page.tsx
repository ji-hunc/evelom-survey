"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="py-4 sm:py-6 px-4 sm:px-6 border-b border-white/20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold gradient-text">
            EVELOM
          </h1>
          <nav className="flex space-x-4 sm:space-x-8">
            <Link
              href="/"
              className="text-sm sm:text-base text-gray-700 hover:text-[#4a7c59] transition-colors"
            >
              홈
            </Link>
            <Link
              href="/survey"
              className="text-sm sm:text-base text-gray-700 hover:text-[#4a7c59] transition-colors"
            >
              설문 시작
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="main-hero py-8 sm:py-12 px-4 sm:px-6">
        <div className="main-container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-3 sm:mb-4 text-gray-800 leading-tight">
            당신만을 위한
            <span className="gradient-text font-medium"> 클렌저</span>를
            찾아보세요
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            8개의 설문문항을 통해 4가지 프리미엄 클렌저 중에서 당신의 피부에
            가장 완벽하게 맞는 제품을 추천해드립니다.
          </p>
          <Link
            href="/survey"
            className="main-cta-button inline-block bg-[#4a7c59] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-[#3d6549] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            설문 시작하기
          </Link>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-light text-center mb-6 sm:mb-10 text-gray-800">
            EVELOM 클렌저 컬렉션
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                name: "클렌징 밤",
                desc: "부드럽게 녹여내는 프리미엄 밤",
                image: "/images/클렌징밤.jpg",
              },
              {
                name: "젤 밤 클렌저",
                desc: "젤과 밤의 완벽한 조화",
                image: "/images/젤밤클렌저.jpg",
              },
              {
                name: "포밍 크림 클렌저",
                desc: "풍부한 거품과 깊은 영양",
                image: "/images/포밍크림클렌저.jpg",
              },
              {
                name: "클렌징 오일",
                desc: "강력한 세정력의 가벼운 오일",
                image: "/images/클렌징오일.jpg",
              },
            ].map((product, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white rounded-2xl shadow-sm group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-2 overflow-hidden">
                  <div className="aspect-[3/4] bg-white overflow-hidden rounded-t-2xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-600">{product.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="main-container max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6 text-gray-800">
            피부 타입에 맞는 완벽한 클렌저를 만나보세요
          </h3>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
            전문적인 설문조사와 선택적 피부 진단 데이터를 통해 가장 적합한
            제품을 추천해드립니다.
          </p>
          <Link
            href="/survey"
            className="main-cta-button inline-block bg-gradient-to-r from-[#4a7c59] to-[#7db46c] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            지금 시작하기
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-white/20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-4">
            EVELOM
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            프리미엄 스킨케어 브랜드
          </p>
        </div>
      </footer>
    </div>
  );
}
