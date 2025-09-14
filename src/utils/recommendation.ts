import { Product, QuizAnswer, SkinDiagnosisData } from '@/types';
import { products } from '@/data/products';

export interface SkinAnalysisScore {
  CPN: number; // Cleansing Power Need (클렌징 강도 필요도)
  MWL: number; // Makeup/Waterproof Load (메이크업/워터프루프 부담)
  SCP: number; // Sebum Control Priority (피지·모공 케어 필요도)
  HSN: number; // Hydration Support Need (수분/보습 보강 필요도)
  BGN: number; // Barrier Gentleness Need (장벽/민감 케어 필요도)
  EUD: number; // Environmental/UV Defense (환경/UV 방어 우선도)
}

export function calculateSkinAnalysisScores(quizAnswers: QuizAnswer[]): SkinAnalysisScore {
  const scores: SkinAnalysisScore = {
    CPN: 0,
    MWL: 0,
    SCP: 0,
    HSN: 0,
    BGN: 0,
    EUD: 0
  };

  quizAnswers.forEach(answer => {
    switch (answer.questionId) {
      case 1: // 피부 문제
        if (answer.answer === '멜라닌 색소침착 (기미, 잡티)') {
          scores.CPN += 20;
          scores.EUD += 30;
        } else if (answer.answer === '피지 과다분비 (모공, 블랙헤드)') {
          scores.CPN += 30;
          scores.SCP += 35;
        } else if (answer.answer === '염증성 트러블 (여드름, 뾰루지)') {
          scores.CPN += 25;
          scores.BGN += 30;
          scores.SCP += 20;
        } else if (answer.answer === '각질 및 건조 (거칠음, 당김)') {
          scores.CPN += 15;
          scores.HSN += 35;
        }
        break;

      case 2: // 자외선 노출량
        if (answer.answer === '실내 위주 (30분 미만)') {
          scores.EUD += 5;
        } else if (answer.answer === '일반 통근/통학 (30분-1시간)') {
          scores.EUD += 15;
        } else if (answer.answer === '야외 활동 빈번 (1-3시간)') {
          scores.EUD += 25;
          scores.CPN += 10;
        } else if (answer.answer === '장시간 야외 근무 (3시간 이상)') {
          scores.EUD += 35;
          scores.CPN += 15;
        }
        break;

      case 3: // 블루라이트 노출
        if (answer.answer === '최소 노출 (4시간 미만)') {
          scores.EUD += 5;
        } else if (answer.answer === '일반 사무직 (8시간)') {
          scores.EUD += 15;
          scores.BGN += 10;
        } else if (answer.answer === '고강도 업무 (10시간)') {
          scores.EUD += 25;
          scores.BGN += 15;
        } else if (answer.answer === '극도 집중 환경 (12시간 이상)') {
          scores.EUD += 30;
          scores.BGN += 20;
        }
        break;

      case 4: // 피부 타입
        if (answer.answer === '지성형 (T존 과도 유분, 모공 확장)') {
          scores.SCP += 30;
          scores.CPN += 25;
          scores.HSN += 5;
        } else if (answer.answer === '건성형 (전반적 수분 부족, 각질)') {
          scores.HSN += 35;
          scores.BGN += 20;
          scores.CPN += 10;
        } else if (answer.answer === '복합형 (T존 지성, U존 건성)') {
          scores.SCP += 20;
          scores.HSN += 20;
          scores.CPN += 15;
        } else if (answer.answer === '민감형 (자극 반응, 홍조 빈발)') {
          scores.BGN += 35;
          scores.HSN += 15;
          scores.CPN += 5;
        }
        break;

      case 5: // 메이크업 강도
        if (answer.answer === '미니멀 (자외선차단제, 톤업크림)') {
          scores.MWL += 10;
          scores.CPN += 5;
        } else if (answer.answer === '데일리 (파운데이션, 포인트 메이크업)') {
          scores.MWL += 20;
          scores.CPN += 15;
        } else if (answer.answer === '풀커버리지 (컨실러, 파우더 포함)') {
          scores.MWL += 30;
          scores.CPN += 25;
        } else if (answer.answer === '프로페셔널 (무대용, 특수 메이크업)') {
          scores.MWL += 35;
          scores.CPN += 30;
        }
        break;

      case 6: // 세안 후 반응
        if (answer.answer === '즉시 유분 재생성 (30분 내)') {
          scores.SCP += 30;
          scores.CPN += 20;
        } else if (answer.answer === '적정 수분-유분 밸런스 유지') {
          scores.HSN += 15;
          scores.BGN += 10;
        } else if (answer.answer === '경미한 당김감 발생') {
          scores.HSN += 25;
          scores.BGN += 15;
        } else if (answer.answer === '심각한 건조감 및 각질') {
          scores.HSN += 35;
          scores.BGN += 25;
          scores.CPN += 5;
        }
        break;

      case 7: // 환경적 스트레스
        if (answer.answer === '최소 (쾌적한 실내환경)') {
          scores.EUD += 5;
        } else if (answer.answer === '보통 (일반적 도시환경)') {
          scores.EUD += 15;
          scores.CPN += 10;
        } else if (answer.answer === '높음 (미세먼지, 오염물질)') {
          scores.EUD += 25;
          scores.CPN += 20;
          scores.BGN += 10;
        } else if (answer.answer === '극심 (산업지역, 고농도 오염)') {
          scores.EUD += 35;
          scores.CPN += 25;
          scores.BGN += 15;
        }
        break;

      case 8: // 워터프루프 제품
        if (answer.answer === '사용 안 함') {
          scores.MWL += 0;
        } else if (answer.answer === '가끔 사용 (주 1-2회)') {
          scores.MWL += 15;
          scores.CPN += 10;
        } else if (answer.answer === '정기 사용 (주 3-4회)') {
          scores.MWL += 25;
          scores.CPN += 20;
        } else if (answer.answer === '일상 사용 (거의 매일)') {
          scores.MWL += 35;
          scores.CPN += 30;
        }
        break;
    }
  });

  // 점수를 100점 만점으로 정규화
  const maxScores = { CPN: 100, MWL: 100, SCP: 100, HSN: 100, BGN: 100, EUD: 100 };
  
  Object.keys(scores).forEach(key => {
    const scoreKey = key as keyof SkinAnalysisScore;
    scores[scoreKey] = Math.min(scores[scoreKey], maxScores[scoreKey]);
  });

  return scores;
}

export function getRecommendedProduct(
  quizAnswers: QuizAnswer[],
  skinDiagnosisData?: SkinDiagnosisData
): Product {
  const scores = products.map(product => ({ product, score: 0 }));

  quizAnswers.forEach(answer => {
    switch (answer.questionId) {
      case 1: // 피부 문제
        if (answer.answer === '멜라닌 색소침착 (기미, 잡티)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-balm') s.score += 2;
            if (s.product.id === 'foaming-cream-cleanser') s.score += 1;
          });
        } else if (answer.answer === '피지 과다분비 (모공, 블랙헤드)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 3;
            if (s.product.id === 'gel-balm-cleanser') s.score += 2;
          });
        } else if (answer.answer === '염증성 트러블 (여드름, 뾰루지)') {
          scores.forEach(s => {
            if (s.product.id === 'gel-balm-cleanser') s.score += 2;
            if (s.product.id === 'foaming-cream-cleanser') s.score += 1;
          });
        } else if (answer.answer === '각질 및 건조 (거칠음, 당김)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-balm') s.score += 3;
            if (s.product.id === 'foaming-cream-cleanser') s.score += 2;
          });
        }
        break;

      case 2: // 자외선 노출량
        if (answer.answer === '장시간 야외 근무 (3시간 이상)' || answer.answer === '야외 활동 빈번 (1-3시간)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 2;
            if (s.product.id === 'cleansing-balm') s.score += 1;
          });
        }
        break;

      case 3: // 블루라이트 노출
        if (answer.answer === '고강도 업무 (10시간)' || answer.answer === '극도 집중 환경 (12시간 이상)') {
          scores.forEach(s => {
            if (s.product.id === 'gel-balm-cleanser') s.score += 2;
            if (s.product.id === 'foaming-cream-cleanser') s.score += 1;
          });
        }
        break;

      case 4: // 피부 타입
        if (answer.answer === '지성형 (T존 과도 유분, 모공 확장)') {
          scores.forEach(s => {
            if (s.product.suitableFor.skinType.includes('oily')) s.score += 3;
            if (s.product.id === 'cleansing-oil') s.score += 2;
            if (s.product.id === 'gel-balm-cleanser') s.score += 1;
          });
        } else if (answer.answer === '건성형 (전반적 수분 부족, 각질)') {
          scores.forEach(s => {
            if (s.product.suitableFor.skinType.includes('dry')) s.score += 3;
            if (s.product.id === 'cleansing-balm') s.score += 2;
            if (s.product.id === 'foaming-cream-cleanser') s.score += 2;
          });
        } else if (answer.answer === '복합형 (T존 지성, U존 건성)') {
          scores.forEach(s => {
            if (s.product.suitableFor.skinType.includes('combination')) s.score += 3;
            if (s.product.id === 'gel-balm-cleanser') s.score += 2;
          });
        } else if (answer.answer === '민감형 (자극 반응, 홍조 빈발)') {
          scores.forEach(s => {
            if (s.product.suitableFor.skinType.includes('sensitive')) s.score += 3;
            if (s.product.id === 'cleansing-balm') s.score += 2;
            if (s.product.id === 'foaming-cream-cleanser') s.score += 1;
          });
        }
        break;

      case 5: // 메이크업 강도
        if (answer.answer === '프로페셔널 (무대용, 특수 메이크업)' || answer.answer === '풀커버리지 (컨실러, 파우더 포함)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-balm') s.score += 3;
            if (s.product.id === 'cleansing-oil') s.score += 2;
          });
        } else if (answer.answer === '미니멀 (자외선차단제, 톤업크림)') {
          scores.forEach(s => {
            if (s.product.id === 'gel-balm-cleanser') s.score += 2;
            if (s.product.id === 'foaming-cream-cleanser') s.score += 2;
          });
        }
        break;

      case 6: // 세안 후 반응
        if (answer.answer === '즉시 유분 재생성 (30분 내)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 3;
            if (s.product.id === 'gel-balm-cleanser') s.score += 1;
          });
        } else if (answer.answer === '심각한 건조감 및 각질') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-balm') s.score += 3;
            if (s.product.id === 'foaming-cream-cleanser') s.score += 2;
          });
        }
        break;

      case 7: // 환경적 스트레스
        if (answer.answer === '극심 (산업지역, 고농도 오염)' || answer.answer === '높음 (미세먼지, 오염물질)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 2;
            if (s.product.id === 'cleansing-balm') s.score += 1;
          });
        }
        break;

      case 8: // 워터프루프 제품
        if (answer.answer === '일상 사용 (거의 매일)' || answer.answer === '정기 사용 (주 3-4회)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 3;
            if (s.product.id === 'cleansing-balm') s.score += 2;
          });
        } else if (answer.answer === '사용 안 함') {
          scores.forEach(s => {
            if (s.product.id === 'gel-balm-cleanser') s.score += 1;
            if (s.product.id === 'foaming-cream-cleanser') s.score += 1;
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