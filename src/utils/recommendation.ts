import { Product, QuizAnswer, SkinDiagnosisData } from '@/types';
import { products } from '@/data/products';

export function getRecommendedProduct(
  quizAnswers: QuizAnswer[],
  skinDiagnosisData?: SkinDiagnosisData
): Product {
  let scores = products.map(product => ({ product, score: 0 }));

  quizAnswers.forEach(answer => {
    switch (answer.questionId) {
      case 1: // 건조함
        if (answer.answer === '매우 그렇다' || answer.answer === 2) {
          scores.forEach(s => {
            if (s.product.suitableFor.skinType.includes('dry')) s.score += 3;
            if (s.product.id === 'cleansing-balm') s.score += 2;
            if (s.product.id === 'foaming-cream-cleanser') s.score += 2;
          });
        }
        break;

      case 2: // T존 유분
        if (answer.answer === '매우 그렇다' || answer.answer === 2) {
          scores.forEach(s => {
            if (s.product.suitableFor.skinType.includes('oily')) s.score += 3;
            if (s.product.id === 'cleansing-oil') s.score += 2;
            if (s.product.id === 'gel-balm-cleanser') s.score += 1;
          });
        }
        break;

      case 3: // 민감함
        if (answer.answer === 'yes' || answer.answer === true) {
          scores.forEach(s => {
            if (s.product.suitableFor.skinType.includes('sensitive')) s.score += 3;
            if (s.product.id === 'cleansing-balm') s.score += 2;
            if (s.product.id === 'foaming-cream-cleanser') s.score += 1;
          });
        }
        break;

      case 4: // 메이크업 빈도
        if (answer.answer === '매일' || answer.answer === 2) {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-balm') s.score += 3;
            if (s.product.id === 'cleansing-oil') s.score += 2;
          });
        } else if (answer.answer === '거의 안 함' || answer.answer === 0) {
          scores.forEach(s => {
            if (s.product.id === 'gel-balm-cleanser') s.score += 2;
            if (s.product.id === 'foaming-cream-cleanser') s.score += 2;
          });
        }
        break;

      case 5: // 워터프루프 제품
        if (answer.answer === 'yes' || answer.answer === true) {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 3;
            if (s.product.id === 'cleansing-balm') s.score += 2;
          });
        }
        break;

      case 6: // 세안 후 당김
        if (answer.answer === '항상 있다' || answer.answer === 2) {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-balm') s.score += 3;
            if (s.product.id === 'foaming-cream-cleanser') s.score += 2;
          });
        }
        break;

      case 7: // 모공/블랙헤드
        if (answer.answer === 'yes' || answer.answer === true) {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 3;
            if (s.product.id === 'gel-balm-cleanser') s.score += 1;
          });
        }
        break;

      case 8: // 세안 시간
        if (answer.answer === '빠르게 끝내고 싶다' || answer.answer === 0) {
          scores.forEach(s => {
            if (s.product.id === 'gel-balm-cleanser') s.score += 2;
            if (s.product.id === 'cleansing-oil') s.score += 1;
          });
        } else if (answer.answer === '충분한 시간을 갖고 싶다' || answer.answer === 2) {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-balm') s.score += 2;
            if (s.product.id === 'foaming-cream-cleanser') s.score += 2;
          });
        }
        break;
    }
  });

  // 피부진단 데이터가 있다면 추가 점수 부여
  if (skinDiagnosisData) {
    scores.forEach(s => {
      if (skinDiagnosisData.moisture < 30) { // 수분이 낮음
        if (s.product.id === 'cleansing-balm') s.score += 2;
        if (s.product.id === 'foaming-cream-cleanser') s.score += 1;
      }
      
      if (skinDiagnosisData.sebum > 70) { // 유분이 많음
        if (s.product.id === 'cleansing-oil') s.score += 2;
        if (s.product.id === 'gel-balm-cleanser') s.score += 1;
      }
      
      if (skinDiagnosisData.pores > 60) { // 모공이 큼
        if (s.product.id === 'cleansing-oil') s.score += 1;
      }
    });
  }

  // 가장 높은 점수의 제품 반환
  scores.sort((a, b) => b.score - a.score);
  return scores[0].product;
}