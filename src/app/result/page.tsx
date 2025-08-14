'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Product, QuizAnswer, SkinDiagnosisData } from '@/types';
import { getRecommendedProduct } from '@/utils/recommendation';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const answersParam = searchParams.get('answers');
      const diagnosisParam = searchParams.get('diagnosis');
      
      if (answersParam) {
        const answers: QuizAnswer[] = JSON.parse(answersParam);
        const diagnosis: SkinDiagnosisData | undefined = diagnosisParam 
          ? JSON.parse(diagnosisParam) 
          : undefined;
        
        const product = getRecommendedProduct(answers, diagnosis);
        setRecommendedProduct(product);
      }
    } catch (error) {
      console.error('Error parsing quiz data:', error);
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

  return (
    <div className="min-h-screen gradient-bg py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link 
          href="/"
          className="inline-flex items-center text-[#4a7c59] hover:text-[#3d6549] mb-8"
        >
          ← 홈으로 돌아가기
        </Link>

        {/* Result Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block bg-white rounded-full px-4 sm:px-6 py-2 mb-4 shadow-sm">
            <span className="text-sm sm:text-base text-[#4a7c59] font-medium">추천 결과</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-800 mb-4">
            당신에게 완벽한 클렌저를 찾았습니다
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4">
            설문조사 결과를 바탕으로 가장 적합한 제품을 추천해드립니다
          </p>
        </div>

        {/* Recommended Product Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden mb-8 sm:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="bg-white flex items-center justify-center p-6 sm:p-8">
              <img 
                src={recommendedProduct.image} 
                alt={recommendedProduct.name}
                className="w-full max-w-xs sm:max-w-md h-auto object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="mb-6">
                <span className="inline-block bg-[#4a7c59] text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium mb-4">
                  추천 제품
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium text-gray-800 mb-4">
                  {recommendedProduct.name}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {recommendedProduct.description}
                </p>
              </div>

              {/* Benefits */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-4">주요 효과</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recommendedProduct.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-[#4a7c59] rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-sm sm:text-base text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-3">사용법</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed bg-gray-50 p-3 sm:p-4 rounded-lg">
                  {recommendedProduct.usage}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Ingredients */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-medium text-gray-800 mb-6">주요 성분</h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {recommendedProduct.ingredients.map((ingredient, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
                <span className="text-sm sm:text-base text-[#4a7c59] font-medium">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why This Product */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-medium text-gray-800 mb-6">
            왜 이 제품을 추천하나요?
          </h3>
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-[#4a7c59] rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1 flex-shrink-0">
                <span className="text-white text-xs sm:text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">피부 타입 적합성</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  설문조사 결과 당신의 피부 타입({recommendedProduct.suitableFor.skinType.join(', ')})에 가장 적합한 제품입니다.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-[#4a7c59] rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1 flex-shrink-0">
                <span className="text-white text-xs sm:text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">개인 맞춤 솔루션</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  당신의 피부 고민사항과 라이프스타일을 종합적으로 고려한 결과입니다.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-[#4a7c59] rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1 flex-shrink-0">
                <span className="text-white text-xs sm:text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">검증된 효과</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  EVELOM의 프리미엄 성분과 기술로 만든 검증된 제품입니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-medium text-gray-800 mb-4">
            지금 바로 시작해보세요
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4">
            당신만을 위해 추천된 {recommendedProduct.name}으로 완벽한 스킨케어를 경험해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link 
              href="/survey"
              className="px-6 sm:px-8 py-3 text-sm sm:text-base border border-[#4a7c59] text-[#4a7c59] rounded-full hover:bg-[#4a7c59] hover:text-white transition-colors"
            >
              다시 설문하기
            </Link>
            <button 
              className="px-6 sm:px-8 py-3 text-sm sm:text-base bg-[#4a7c59] text-white rounded-full hover:bg-[#3d6549] transition-colors"
            >
              제품 구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}