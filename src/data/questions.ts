import { QuizQuestion } from "@/types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "본인의 피부 타입을 선택해주세요.",
    type: "choice",
    options: [
      "지성 (과도한 유분 발생)",
      "건성 (전반적 수분 부족)",
      "복합성 (T존 지성, U존 건성)",
      "민감성 (자극 민감, 홍조 빈발)",
    ],
    category: "skinType",
  },
  {
    id: 2,
    question: "현재 가장 개선하고 싶은 피부 고민을 선택해주세요.",
    type: "choice",
    options: [
      "멜라닌 색소침착 (기미, 잡티)",
      "피지 과다분비 (불략해드, 화이트헤드)",
      "염증성 트러블 (여드름, 뾰루지)",
      "각질 및 건조 (거칠음, 당김)",
    ],
    category: "concerns",
  },
  {
    id: 3,
    question: "평소 외출 시 메이크업 정도를 선택해주세요.",
    type: "choice",
    options: [
      "미니멀 (자외선차단제, 톤업크림)",
      "데일리 (쿠션, 파운데이션, 포인트 메이크업)",
      "풀커버리지 (컨실러, 파우더 포함)",
      "프로페셔널 (무대용, 특수 메이크업)",
    ],
    category: "lifestyle",
  },
  {
    id: 4,
    question: "워터프루프 제품 사용 빈도를 선택해주세요.",
    type: "choice",
    options: [
      "사용 안 함",
      "가끔 사용 (주 1-2회)",
      "정기 사용 (주 3-4회)",
      "일상 사용 (거의 매일)",
    ],
    category: "lifestyle",
  },
  {
    id: 5,
    question: "일일 평균 자외선 노출시간을 선택해주세요.",
    type: "choice",
    options: [
      "실내 위주 (1시간 미만)",
      "일반 통근/통학 (1시간 ~ 2시간)",
      "야외 활동 빈번 (2시간 ~ 4시간)",
      "장시간 야외 활동 (4시간 이상)",
    ],
    category: "environmental",
  },
  {
    id: 6,
    question: "블루라이트 노출 환경을 선택해주세요.",
    type: "choice",
    options: [
      "최소 노출 (4시간 미만)",
      "일반 사무직 (8시간)",
      "고강도 업무 (10시간)",
      "극도 집중 환경 (12시간 이상)",
    ],
    category: "environmental",
  },
  {
    id: 7,
    question: "환경적 스트레스 노출 빈도를 선택해주세요.",
    type: "choice",
    options: [
      "최소 (쾌적한 실내환경)",
      "보통 (일반적 도시환경)",
      "높음 (미세먼지, 오염물질)",
      "극심 (산업지역, 고농도 오염)",
    ],
    category: "environmental",
  },
  {
    id: 8,
    question: "세안 후 피부 반응을 선택해주세요.",
    type: "choice",
    options: [
      "즉시 유분 재생성 (30분 내)",
      "적정 수분-유분 밸런스 유지",
      "경미한 당김감 발생",
      "심각한 건조감 및 각질",
    ],
    category: "skinType",
  },
];
