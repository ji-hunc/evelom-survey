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

function ResultContent() {
  const searchParams = useSearchParams();
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(
    null
  );
  const [skinAnalysisScores, setSkinAnalysisScores] =
    useState<SkinAnalysisScore | null>(null);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen gradient-bg py-1">
      <div className="result-container w-full  mx-auto px-2 lg:px-4 xl:px-6">
        <Link
          href="/"
          className="inline-flex items-center text-base lg:text-lg text-[#4a7c59] hover:text-[#3d6549] mb-1 lg:mb-1"
        >
          ← 홈으로 돌아가기
        </Link>

        {/* Main Result Card - 3분할 레이아웃 */}
        <div className="result-main-card bg-white rounded-3xl shadow-lg overflow-hidden mb-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 h-full">
            {/* 왼쪽: 피부 분석 결과 */}
            <div className="bg-gray-50 flex flex-col">
              <div className="bg-[#6b8e6b] text-white text-center py-2 lg:py-3">
                <h3 className="text-lg lg:text-xl font-bold">
                  피부 분석 결과
                </h3>
              </div>
              <div className="flex-1 flex items-center justify-center p-4 lg:p-6">
                {skinAnalysisScores && (
                  <SkinAnalysisChart scores={skinAnalysisScores} animate={true} />
                )}
              </div>
            </div>

            {/* 가운데: 추천 제품 */}
            <div className="bg-white lg:border-l lg:border-r border-gray-200 flex flex-col">
              <div className="bg-[#6b8e6b] text-white text-center py-2 lg:py-3">
                <h3 className="text-lg lg:text-xl font-bold">
                  추천 제품
                </h3>
              </div>
              <div className="text-center flex-1 flex flex-col justify-center p-4 lg:p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-[#4a7c59] mb-4">
                  {recommendedProduct.name}
                </h2>
                <div className="aspect-[3/4] bg-gray-50 overflow-hidden rounded-2xl max-w-sm mx-auto">
                  <img
                    src={recommendedProduct.image}
                    alt={recommendedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 오른쪽: 제품 설명 */}
            <div className="bg-gray-50 flex flex-col">
              <div className="bg-[#6b8e6b] text-white text-center py-2 lg:py-3">
                <h3 className="text-lg lg:text-xl font-bold">
                  제품 설명
                </h3>
              </div>
              
              <div className="flex-1 space-y-4 p-4 lg:p-6">
                <p className="text-sm lg:text-base text-gray-700 leading-relaxed bg-white p-3 rounded-xl">
                  {recommendedProduct.description}
                </p>

                <div>
                  <h4 className="text-base lg:text-lg font-semibold mb-2 text-gray-800">
                    주요 성분
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {recommendedProduct.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg px-2 py-1 text-center border border-gray-200"
                      >
                        <span className="text-xs lg:text-sm font-medium text-gray-700">
                          {ingredient}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-base lg:text-lg font-semibold mb-2 text-gray-800">
                    주요 효과
                  </h4>
                  <div className="space-y-1 mb-4">
                    {recommendedProduct.benefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#4a7c59] rounded-full mr-2 flex-shrink-0"></div>
                        <span className="text-xs lg:text-sm text-gray-700">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-base lg:text-lg font-semibold mb-2 text-gray-800">
                    사용법
                  </h4>
                  <p className="text-xs lg:text-sm text-gray-700 bg-white p-3 rounded-xl mb-4">
                    {recommendedProduct.usage}
                  </p>
                </div>

                <button 
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
                  className="w-full py-3 text-base lg:text-lg font-bold bg-[#4a7c59] text-white rounded-xl hover:bg-[#3d6549] transition-colors cursor-pointer"
                >
                  제품 구매하기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Re-survey Button */}
        <div className="text-center mb-6">
          <Link
            href="/survey"
            className="inline-block px-8 py-3 text-base border border-[#4a7c59] text-[#4a7c59] rounded hover:bg-[#4a7c59] hover:text-white transition-colors"
          >
            다시 설문하기
          </Link>
        </div>

        {/* Other Products Section */}
        <div className="mb-8">
          <h2 className="other-products-title text-2xl font-semibold text-gray-800 text-center mb-6">
            다른 EVELOM 클렌저
          </h2>
          <div className="other-products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProducts.map((product) => (
              <div
                key={product.id}
                className="other-product-card bg-white rounded-2xl shadow hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
