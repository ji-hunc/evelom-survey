"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Product, QuizAnswer, SkinDiagnosisData } from "@/types";
import {
  getRecommendedProduct,
  calculateSkinAnalysisScores,
  SkinAnalysisScore,
} from "@/utils/recommendation";
import { products } from "@/data/products";
import SkinAnalysisChart from "@/components/SkinAnalysisChart";
import StaffCouponModal from "@/components/StaffCouponModal";
import CouponModal from "@/components/CouponModal";

function ResultContent() {
  const searchParams = useSearchParams();
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(
    null
  );
  const [skinAnalysisScores, setSkinAnalysisScores] =
    useState<SkinAnalysisScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);

  useEffect(() => {
    try {
      const answersParam = searchParams.get("answers");
      const diagnosisParam = searchParams.get("diagnosis");

      if (answersParam) {
        const answers: QuizAnswer[] = JSON.parse(answersParam);
        const diagnosis: SkinDiagnosisData | undefined = diagnosisParam
          ? JSON.parse(diagnosisParam)
          : undefined;

        const product = getRecommendedProduct(answers, diagnosis);
        const analysisScores = calculateSkinAnalysisScores(answers);

        setRecommendedProduct(product);
        setSkinAnalysisScores(analysisScores);
      }
    } catch (error) {
      console.error("Error parsing quiz data:", error);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a7c59] mx-auto mb-4"></div>
          <p className="text-gray-600">결과를 분석하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!recommendedProduct) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-800 mb-4">
            결과를 불러올 수 없습니다
          </h2>
          <Link
            href="/survey"
            className="inline-block bg-[#4a7c59] text-white px-6 py-3 rounded-full hover:bg-[#3d6549] transition-colors"
          >
            다시 시도하기
          </Link>
        </div>
      </div>
    );
  }

  // Get other products for display
  const otherProducts = products.filter((p) => p.id !== recommendedProduct?.id);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'var(--surface-primary)',
      paddingTop: 'var(--top-safe)',
      paddingBottom: 'var(--bottom-safe)',
      paddingLeft: 'var(--left-safe)',
      paddingRight: 'var(--right-safe)'
    }}>
      {/* Premium App Bar */}
      <header className="premium-app-bar">
        <div className="premium-app-bar__logo">EVE LOM</div>
        <div className="premium-app-bar__progress">
          <span>분석 결과</span>
        </div>
        <button className="premium-app-bar__help" aria-label="도움말">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </button>
      </header>

      {/* Premium Results with Snap Scrolling */}
      <main className="premium-results">
        {/* Section A - Large Radar Chart Only */}
        <section className="premium-results__section premium-results__radar-section">
          <h1 className="premium-results__radar-title">피부 분석 결과</h1>
          <p className="premium-results__radar-subtitle">
            6가지 핵심 지표를 통한 당신의 피부 특성 분석
          </p>
          
          <div className="premium-results__radar-container">
            <div className="premium-results__radar-chart">
              {skinAnalysisScores && (
                <SkinAnalysisChart scores={skinAnalysisScores} animate={true} />
              )}
            </div>
          </div>
          
          <div className="premium-results__scroll-cue" onClick={() => {
            document.querySelector('.premium-results__product-section')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <span className="premium-results__scroll-text">맞춤 제품 확인하기</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8 1a.5.5 0 01.5.5v11.793l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L7.5 13.293V1.5A.5.5 0 018 1z"/>
            </svg>
          </div>
        </section>

        {/* Section B - Product Recommendation */}
        <section className="premium-results__section premium-results__product-section">
          <h1 className="premium-results__section-title">추천 제품</h1>
          <div className="premium-results__product-content">
            {/* Product Card - Left Side */}
            <div className="premium-results__product-card">

              <img
                src={recommendedProduct.image}
                alt={recommendedProduct.name}
                className="premium-results__product-image"
              />

              <h2 className="premium-results__product-name">
                {recommendedProduct.name}
              </h2>

              <p className="premium-results__product-description">
                {recommendedProduct.description}
              </p>

              <div className="premium-results__product-actions">
                <button
                  className="premium-results__product-cta premium-results__coupon-btn"
                  onClick={() => setShowCouponModal(true)}
                >
                  🎟️ 10% 할인 쿠폰 받기
                </button>

                <button
                  className="premium-results__product-cta premium-results__purchase-btn"
                  onClick={() => {
                    let purchaseUrl = '';
                    switch(recommendedProduct.id) {
                      case 'cleansing-balm':
                        purchaseUrl = 'https://brand.naver.com/evelom/products/9073888748';
                        break;
                      case 'foaming-cream-cleanser':
                        purchaseUrl = 'https://brand.naver.com/evelom/products/10041948380';
                        break;
                      case 'cleansing-oil':
                        purchaseUrl = 'https://brand.naver.com/evelom/products/11805775361';
                        break;
                      case 'gel-balm-cleanser':
                        purchaseUrl = 'https://brand.naver.com/evelom/products/11789821043';
                        break;
                      default:
                        return;
                    }
                    window.open(purchaseUrl, '_blank');
                  }}
                >
                  제품 구매하기
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Product Details - Right Side */}
            <div className="premium-results__details">
              <h2 className="premium-results__details-title">왜 이 제품인가요?</h2>
              
              <div className="premium-results__reason">
                <div className="premium-results__reason-number">1</div>
                <div className="premium-results__reason-content">
                  <h4>맞춤 세정력</h4>
                  <p>당신의 피부 분석 결과에 따른 최적화된 세정 강도로 피부에 부담 없이 깨끗하게 클렌징합니다.</p>
                </div>
              </div>
              
              <div className="premium-results__reason">
                <div className="premium-results__reason-number">2</div>
                <div className="premium-results__reason-content">
                  <h4>핵심 성분 매칭</h4>
                  <p>피부 타입별 필수 성분들이 포함되어 있어 클렌징과 동시에 스킨케어 효과를 제공합니다.</p>
                </div>
              </div>
              
              <div className="premium-results__reason">
                <div className="premium-results__reason-number">3</div>
                <div className="premium-results__reason-content">
                  <h4>사용감 최적화</h4>
                  <p>당신의 라이프스타일과 선호도에 맞는 텍스처와 사용감으로 매일 즐겁게 사용할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section C - Other Cleansers */}
        <section className="premium-results__section premium-results__other-section">
          <div className="premium-results__other-content">
            <div className="premium-results__other-header">
              <h2 className="premium-results__other-title">다른 EVE LOM 클렌저</h2>
              <p className="premium-results__other-subtitle">다른 제품들도 함께 살펴보세요</p>
            </div>
            
            <div className="premium-results__other-grid">
              {otherProducts.map((product) => (
                <div key={product.id} className="premium-results__other-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="premium-results__other-image"
                  />
                  
                  <h3 className="premium-results__other-name">
                    {product.name}
                  </h3>
                  
                  <div className="premium-results__other-benefits">
                    {product.benefits.slice(0, 2).map((benefit, index) => (
                      <div key={index} className="premium-results__other-benefit">
                        {benefit}
                      </div>
                    ))}
                  </div>
                  
                  <button className="premium-results__other-cta">
                    자세히 보기
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pagination Dots */}
        <div className="premium-results__pagination">
          <button 
            className="premium-results__dot premium-results__dot--active" 
            onClick={() => document.querySelector('.premium-results__radar-section')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="피부 분석"
          />
          <button 
            className="premium-results__dot" 
            onClick={() => document.querySelector('.premium-results__product-section')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="추천 제품"
          />
          <button 
            className="premium-results__dot" 
            onClick={() => document.querySelector('.premium-results__other-section')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="다른 제품들"
          />
        </div>
      </main>

      {/* Staff Coupon Button - Fixed Position */}
      <button
        onClick={() => setShowStaffModal(true)}
        className="fixed bottom-4 right-4 bg-gray-600 text-white px-3 py-2 rounded-lg text-xs hover:bg-gray-700 transition-colors z-40 opacity-75"
        style={{ fontSize: '10px' }}
      >
        직원 쿠폰 사용
      </button>

      {/* Staff Coupon Modal */}
      <StaffCouponModal
        isOpen={showStaffModal}
        onClose={() => setShowStaffModal(false)}
      />

      {/* Coupon Modal */}
      <CouponModal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        recommendedProduct={recommendedProduct?.name || ""}
      />
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen gradient-bg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a7c59] mx-auto mb-4"></div>
            <p className="text-gray-600">결과를 불러오는 중...</p>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
