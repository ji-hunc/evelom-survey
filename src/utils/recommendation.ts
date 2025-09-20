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
      case 1: // 피부 타입
        if (answer.answer === '지성 (과도한 유분 발생)') {
          scores.SCP += 35;
          scores.CPN += 25;
          scores.HSN += 5;
        } else if (answer.answer === '건성 (전반적 수분 부족)') {
          scores.HSN += 35;
          scores.BGN += 20;
          scores.CPN += 10;
        } else if (answer.answer === '복합성 (T존 지성, U존 건성)') {
          scores.SCP += 20;
          scores.HSN += 20;
          scores.CPN += 15;
        } else if (answer.answer === '민감성 (자극 민감, 홍조 빈발)') {
          scores.BGN += 35;
          scores.HSN += 15;
          scores.CPN += 5;
        }
        break;

      case 2: // 피부 고민
        if (answer.answer === '멜라닌 색소침착 (기미, 잡티)') {
          scores.CPN += 20;
          scores.EUD += 30;
        } else if (answer.answer === '피지 과다분비 (불락헤드, 화이트헤드)') {
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

      case 3: // 메이크업 강도
        if (answer.answer === '미니멀 (자외선차단제, 톤업크림)') {
          scores.MWL += 10;
          scores.CPN += 5;
        } else if (answer.answer === '데일리 (쿠션, 파운데이션, 포인트 메이크업)') {
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

      case 4: // 워터프루프 제품 사용
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

      case 5: // 자외선 노출
        if (answer.answer === '실내 위주 (1시간 미만)') {
          scores.EUD += 5;
        } else if (answer.answer === '일반 통근/통학 (1시간 ~ 2시간)') {
          scores.EUD += 15;
        } else if (answer.answer === '야외 활동 빈번 (2시간 ~ 4시간)') {
          scores.EUD += 25;
          scores.CPN += 10;
        } else if (answer.answer === '장시간 야외 활동 (4시간 이상)') {
          scores.EUD += 35;
          scores.CPN += 15;
        }
        break;

      case 6: // 블루라이트 노출
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

      case 8: // 세안 후 반응
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
      case 1: // 피부 타입
        if (answer.answer === '지성 (과도한 유분 발생)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 3; // 강력한 세정력
            if (s.product.id === 'gel-balm-cleanser') s.score += 2; // 지성 지원
          });
        } else if (answer.answer === '건성 (전반적 수분 부족)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-balm') s.score += 3; // 부드러운 밤 텍스처
            if (s.product.id === 'foaming-cream-cleanser') s.score += 2; // 풍부한 영양
          });
        } else if (answer.answer === '복합성 (T존 지성, U존 건성)') {
          scores.forEach(s => {
            if (s.product.id === 'gel-balm-cleanser') s.score += 3; // 완벽한 조화
            if (s.product.id === 'foaming-cream-cleanser') s.score += 1;
          });
        } else if (answer.answer === '민감성 (자극 민감, 홍조 빈발)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-balm') s.score += 3; // 시그니처 오일 블렌드
            if (s.product.id === 'foaming-cream-cleanser') s.score += 2; // 섬세한 클렌징
          });
        }
        break;

      case 2: // 피부 고민
        if (answer.answer === '멜라닌 색소침착 (기미, 잡티)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 2; // 깨끗한 사용감
            if (s.product.id === 'foaming-cream-cleanser') s.score += 1; // 피부결 개선
          });
        } else if (answer.answer === '피지 과다분비 (불락헤드, 화이트헤드)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 3; // 강력한 세정력
            if (s.product.id === 'gel-balm-cleanser') s.score += 2; // 진정 & 보습
          });
        } else if (answer.answer === '염증성 트러블 (여드름, 뾰루지)') {
          scores.forEach(s => {
            if (s.product.id === 'gel-balm-cleanser') s.score += 2; // 멀티 유즈
            if (s.product.id === 'foaming-cream-cleanser') s.score += 1; // 섬세한 클렌징
          });
        } else if (answer.answer === '각질 및 건조 (거칠음, 당김)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-balm') s.score += 3; // 한 번에 완료되는 세안
            if (s.product.id === 'foaming-cream-cleanser') s.score += 2; // 피부 보습
          });
        }
        break;

      case 3: // 메이크업 강도
        if (answer.answer === '미니멀 (자외선차단제, 톤업크림)') {
          scores.forEach(s => {
            if (s.product.id === 'gel-balm-cleanser') s.score += 2; // 펀프형 용기
            if (s.product.id === 'foaming-cream-cleanser') s.score += 2; // 섬세한 클렌징
          });
        } else if (answer.answer === '데일리 (쿠션, 파운데이션, 포인트 메이크업)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-balm') s.score += 2; // 한 번에 완료되는 세안
            if (s.product.id === 'gel-balm-cleanser') s.score += 1;
          });
        } else if (answer.answer === '풀커버리지 (컨실러, 파우더 포함)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-balm') s.score += 3;
            if (s.product.id === 'cleansing-oil') s.score += 2; // 강력한 세정력
          });
        } else if (answer.answer === '프로페셔널 (무대용, 특수 메이크업)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 3; // 강력한 메이크업 제거력
            if (s.product.id === 'cleansing-balm') s.score += 2;
          });
        }
        break;

      case 4: // 워터프루프 제품 사용
        if (answer.answer === '사용 안 함') {
          scores.forEach(s => {
            if (s.product.id === 'gel-balm-cleanser') s.score += 1;
            if (s.product.id === 'foaming-cream-cleanser') s.score += 1;
          });
        } else if (answer.answer === '가끔 사용 (주 1-2회)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-balm') s.score += 2;
            if (s.product.id === 'gel-balm-cleanser') s.score += 1;
          });
        } else if (answer.answer === '정기 사용 (주 3-4회)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 2; // 강력한 세정력
            if (s.product.id === 'cleansing-balm') s.score += 2;
          });
        } else if (answer.answer === '일상 사용 (거의 매일)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 3; // 워터프루프 완벽 제거
            if (s.product.id === 'cleansing-balm') s.score += 2;
          });
        }
        break;

      case 5: // 자외선 노출
        if (answer.answer === '실내 위주 (1시간 미만)') {
          scores.forEach(s => {
            if (s.product.id === 'foaming-cream-cleanser') s.score += 1;
          });
        } else if (answer.answer === '일반 통근/통학 (1시간 ~ 2시간)') {
          scores.forEach(s => {
            if (s.product.id === 'gel-balm-cleanser') s.score += 1;
          });
        } else if (answer.answer === '야외 활동 빈번 (2시간 ~ 4시간)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 2; // 예산 공급
            if (s.product.id === 'cleansing-balm') s.score += 1;
          });
        } else if (answer.answer === '장시간 야외 활동 (4시간 이상)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 3; // 깨끗한 사용감
            if (s.product.id === 'cleansing-balm') s.score += 1;
          });
        }
        break;

      case 6: // 블루라이트 노출
        if (answer.answer === '최소 노출 (4시간 미만)') {
          scores.forEach(s => {
            if (s.product.id === 'foaming-cream-cleanser') s.score += 1;
          });
        } else if (answer.answer === '일반 사무직 (8시간)') {
          scores.forEach(s => {
            if (s.product.id === 'gel-balm-cleanser') s.score += 1;
          });
        } else if (answer.answer === '고강도 업무 (10시간)' || answer.answer === '극도 집중 환경 (12시간 이상)') {
          scores.forEach(s => {
            if (s.product.id === 'gel-balm-cleanser') s.score += 2; // 멀티 유즈
            if (s.product.id === 'foaming-cream-cleanser') s.score += 1;
          });
        }
        break;

      case 7: // 환경적 스트레스
        if (answer.answer === '최소 (쾌적한 실내환경)') {
          scores.forEach(s => {
            if (s.product.id === 'foaming-cream-cleanser') s.score += 1;
          });
        } else if (answer.answer === '보통 (일반적 도시환경)') {
          scores.forEach(s => {
            if (s.product.id === 'gel-balm-cleanser') s.score += 1; // 펀프형 용기
          });
        } else if (answer.answer === '높음 (미세먼지, 오염물질)' || answer.answer === '극심 (산업지역, 고농도 오염)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 2; // 강력한 세정력
            if (s.product.id === 'cleansing-balm') s.score += 1;
          });
        }
        break;

      case 8: // 세안 후 반응
        if (answer.answer === '즉시 유분 재생성 (30분 내)') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-oil') s.score += 3; // 깨끗한 사용감
            if (s.product.id === 'gel-balm-cleanser') s.score += 1;
          });
        } else if (answer.answer === '적정 수분-유분 밸런스 유지') {
          scores.forEach(s => {
            if (s.product.id === 'gel-balm-cleanser') s.score += 2; // 진정 & 보습
            if (s.product.id === 'foaming-cream-cleanser') s.score += 1;
          });
        } else if (answer.answer === '경미한 당김감 발생') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-balm') s.score += 2; // 한 번에 완료되는 세안
            if (s.product.id === 'foaming-cream-cleanser') s.score += 2; // 피부 보습
          });
        } else if (answer.answer === '심각한 건조감 및 각질') {
          scores.forEach(s => {
            if (s.product.id === 'cleansing-balm') s.score += 3; // 시그니처 오일 블렌드
            if (s.product.id === 'foaming-cream-cleanser') s.score += 2; // 풍부한 영양
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