'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Product, QuizAnswer, SkinDiagnosisData } from '@/types';
import { getRecommendedProduct } from '@/utils/recommendation';
import { products } from '@/data/products';

function ResultContent() {
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

  // Get other products for display
  const otherProducts = products.filter(p => p.id !== recommendedProduct?.id);

  return (
    <div className="min-h-screen gradient-bg py-4 lg:py-6">
      <div className="result-container max-w-7xl mx-auto px-4 sm:px-6">
        <Link 
          href="/"
          className="inline-flex items-center text-base lg:text-lg text-[#4a7c59] hover:text-[#3d6549] mb-4 lg:mb-6"
        >
          ← 홈으로 돌아가기
        </Link>

        {/* Main Result Card - Responsive Layout */}
        <div className="result-main-card bg-white rounded-lg shadow-lg overflow-hidden mb-6 lg:mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-0">
            
            {/* Product Image Section */}
            <div className="bg-gray-50 flex items-center justify-center p-6 lg:p-8">
              <div className="text-center max-w-sm">
                <div className="inline-block bg-[#4a7c59] text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                  추천 제품
                </div>
                <img 
                  src={recommendedProduct.image} 
                  alt={recommendedProduct.name}
                  className="w-full max-w-xs h-auto object-contain mb-3"
                />
                <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 mb-2">
                  {recommendedProduct.name}
                </h2>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  {recommendedProduct.description}
                </p>
              </div>
            </div>

            {/* Product Benefits & Usage */}
            <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4">주요 효과</h3>
              <div className="space-y-2 lg:space-y-3 mb-6">
                {recommendedProduct.benefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#4a7c59] rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm lg:text-base text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-3">사용법</h3>
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed bg-gray-50 p-3 lg:p-4 rounded">
                {recommendedProduct.usage}
              </p>
            </div>

            {/* Key Info & Action */}
            <div className="p-6 lg:p-8 bg-gradient-to-br from-[#4a7c59] to-[#3d6549] text-white lg:col-span-1 xl:col-span-1">
              <h3 className="text-lg lg:text-xl font-semibold mb-4">주요 성분</h3>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {recommendedProduct.ingredients.map((ingredient, index) => (
                  <div key={index} className="bg-white/20 rounded p-2 text-center">
                    <span className="text-xs lg:text-sm font-medium">{ingredient}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="text-base lg:text-lg font-semibold mb-3">추천 이유</h3>
                <div className="space-y-2">
                  <p className="text-xs lg:text-sm">• 피부 타입 최적 매치</p>
                  <p className="text-xs lg:text-sm">• 맞춤형 솔루션 제공</p>
                  <p className="text-xs lg:text-sm">• 검증된 프리미엄 품질</p>
                </div>
              </div>

              <button 
                className="w-full py-3 lg:py-4 text-base lg:text-lg font-semibold bg-white text-[#4a7c59] rounded hover:bg-gray-100 transition-colors"
              >
                제품 구매하기
              </button>
            </div>
          </div>
        </div>

        {/* Re-survey Button */}
        <div className="text-center mb-8 lg:mb-12">
          <Link 
            href="/survey"
            className="inline-block px-6 py-2 lg:px-8 lg:py-3 text-sm lg:text-base border border-[#4a7c59] text-[#4a7c59] rounded hover:bg-[#4a7c59] hover:text-white transition-colors"
          >
            다시 설문하기
          </Link>
        </div>

        {/* Other Products Section */}
        <div className="mb-8">
          <h2 className="other-products-title text-xl lg:text-2xl font-semibold text-gray-800 text-center mb-6 lg:mb-8">다른 EVELOM 클렌저</h2>
          <div className="other-products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {otherProducts.map((product) => (
              <div key={product.id} className="other-product-card bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="product-image h-40 lg:h-48 bg-gray-50 flex items-center justify-center p-4 lg:p-6">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-5 lg:p-6">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">{product.name}</h3>
                  <p className="text-gray-600 text-sm lg:text-base mb-4 leading-relaxed">{product.description}</p>
                  
                  <div className="mb-4">
                    <div className="space-y-2">
                      {product.benefits.slice(0, 2).map((benefit, index) => (
                        <div key={index} className="flex items-center text-sm lg:text-base">
                          <div className="w-2 h-2 bg-[#4a7c59] rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.suitableFor.skinType.slice(0, 2).map((type, index) => (
                      <span key={index} className="px-3 py-1 bg-[#4a7c59]/10 text-[#4a7c59] text-sm rounded-full font-medium">
                        {type === 'dry' ? '건성' : type === 'oily' ? '지성' : type === 'combination' ? '복합성' : type === 'sensitive' ? '민감성' : '보통'}
                      </span>
                    ))}
                  </div>

                  <button className="w-full py-3 bg-[#4a7c59] text-white rounded-lg text-sm lg:text-base font-semibold hover:bg-[#3d6549] transition-colors">
                    자세히 보기
                  </button>
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
    <Suspense fallback={
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a7c59] mx-auto mb-4"></div>
          <p className="text-gray-600">결과를 불러오는 중...</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}