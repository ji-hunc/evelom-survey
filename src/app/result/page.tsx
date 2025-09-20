"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
import * as S from "@/components/styled/ResultPageStyles";

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

        console.log("🧮 계산된 analysisScores:", analysisScores);

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
    <S.Container>
      {/* Premium App Bar */}
      <S.AppBar>
        <S.Logo as={Link} href="/">
          <Image
            src="/images/logo.png"
            alt="EVE LOM"
            width={120}
            height={45}
            style={{ objectFit: "contain" }}
          />
        </S.Logo>
        <S.HelpButton aria-label="도움말">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </S.HelpButton>
      </S.AppBar>

      {/* Premium Results with Snap Scrolling */}
      <S.ResultsMain>
        {/* Section A - Large Radar Chart Only */}
        <S.RadarSection>
          <S.RadarTitle>피부 분석 결과</S.RadarTitle>
          <S.RadarSubtitle>
            6가지 핵심 지표를 통한 당신의 피부 특성 분석
          </S.RadarSubtitle>

          <S.RadarContainer>
            <S.RadarChart>
              {skinAnalysisScores && (
                <SkinAnalysisChart scores={skinAnalysisScores} animate={true} />
              )}
            </S.RadarChart>
          </S.RadarContainer>
        </S.RadarSection>

        {/* Section B - Product Recommendation */}
        <S.ProductSection data-section="product">
          <S.ProductContent>
            {/* Product Card - Left Side */}
            <S.ProductCard>
              <S.ProductImage
                as={Image}
                src={recommendedProduct.image}
                alt={recommendedProduct.name}
                width={300}
                height={300}
              />

              <S.ProductName>{recommendedProduct.name}</S.ProductName>

              <S.ProductDescription>
                {recommendedProduct.description}
              </S.ProductDescription>

              <S.ProductActions>
                <S.CouponButton onClick={() => setShowCouponModal(true)}>
                  🎟️ 10% 할인 쿠폰 받기
                </S.CouponButton>
              </S.ProductActions>
            </S.ProductCard>

            {/* Product Details - Right Side */}
            <S.ProductDetails>
              <S.SectionTitle>추천 제품</S.SectionTitle>
              <S.DetailsTitle>왜 이 제품인가요?</S.DetailsTitle>

              {recommendedProduct.reasons.map((reason, index) => (
                <S.Reason key={index}>
                  <S.ReasonNumber>{index + 1}</S.ReasonNumber>
                  <S.ReasonContent>
                    <h4>{reason.title}</h4>
                    <p>{reason.description}</p>
                  </S.ReasonContent>
                </S.Reason>
              ))}
            </S.ProductDetails>
          </S.ProductContent>
        </S.ProductSection>

        {/* Section C - Other Cleansers */}
        <S.OtherSection data-section="other">
          <S.OtherContent>
            <S.OtherHeader>
              <S.OtherTitle>다른 EVE LOM 클렌저</S.OtherTitle>
              <S.OtherSubtitle>다른 제품들도 함께 살펴보세요</S.OtherSubtitle>
            </S.OtherHeader>

            <S.OtherGrid>
              {otherProducts.map((product) => (
                <S.OtherCard key={product.id}>
                  <S.OtherImage
                    as={Image}
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                  />

                  <S.OtherName>{product.name}</S.OtherName>

                  <S.OtherBenefits>
                    {product.benefits.slice(0, 3).map((benefit, index) => (
                      <S.OtherBenefit key={index}>{benefit}</S.OtherBenefit>
                    ))}
                  </S.OtherBenefits>

                  <S.OtherCTA>자세히 보기</S.OtherCTA>
                </S.OtherCard>
              ))}
            </S.OtherGrid>
          </S.OtherContent>
        </S.OtherSection>
      </S.ResultsMain>

      {/* Staff Coupon Button - Fixed Position */}
      <S.StaffButton onClick={() => setShowStaffModal(true)}>
        직원 쿠폰 사용
      </S.StaffButton>

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
    </S.Container>
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
