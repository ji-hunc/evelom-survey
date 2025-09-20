"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        background: "var(--surface-primary)",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
        overflow: "hidden",
      }}
    >
      {/* Premium App Bar */}
      <header className="premium-app-bar">
        <Link href="/" className="premium-app-bar__logo">
          <Image
            src="/images/logo.png"
            alt="EVE LOM"
            width={120}
            height={45}
            style={{ objectFit: 'contain' }}
          />
        </Link>
        <button className="premium-app-bar__help" aria-label="도움말">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </header>

      {/* Photo-Dominant Home Layout - 60/40 Split */}
      <main className="premium-home">
        {/* Large Photo Section - 60% */}
        <section className="premium-home__photo">
          <Image
            src="/images/클렌징_컬렉션.jpg"
            alt="EVE LOM Premium Cleanser Collection"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </section>

        {/* Content Section - 40% */}
        <section className="premium-home__content">
          <h1 className="premium-home__title">
            당신만을 위한
            <br />
            <span style={{ color: "var(--accent-gold)" }}>퍼스널 클렌저</span>를
            <br />
            찾아보세요
          </h1>

          <p
            className="premium-home__subtitle"
            style={{ fontFamily: "var(--font-kr)" }}
          >
            이브롬의 4가지 프리미엄 클렌저 중에서 피부에 꼭 맞는 제품을 추천해
            드립니다.
          </p>

          <Link href="/survey" className="premium-cta">
            설문 시작하기
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </section>
      </main>
    </div>
  );
}
