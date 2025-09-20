import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "cleansing-balm",
    name: "클렌징 밤",
    description: "30초마다 한개씩 판매되는 오리지널 클렌징밤입니다.",
    image: "/images/클밤.jpg",
    benefits: [
      "건성 / 복합성 / 민감성",
      "시그니처 오일 블렌드",
      "딥 클렌징 & 각질 제거",
    ],
    ingredients: [
      "카모마일추출물",
      "유칼립투스잎오일",
      "클로브잎오일",
      "코코아버터",
    ],
    usage:
      "건조한 손으로 적당량을 취해 얼굴 전체에 부드럽게 마사지 후 미지근한 물로 헹구세요.",
    suitableFor: {
      skinType: ["dry", "sensitive", "normal"],
      concerns: ["메이크업 제거", "건조함", "민감함"],
      lifestyle: ["메이크업 자주 사용", "바쁜 일상"],
    },

    reasons: [
      {
        title: "시그니처 오일 블렌드",
        description: " 매끄럽고 촉촉한 피부결과 균형잡힌 안색 선사",
      },
      {
        title: "시그니처 오일 블렌드",
        description:
          "카모마일과 유칼립투스 등 천연 성분으로 클렌징과 동시에 피부 진정 효과를 제공합니다.",
      },
      {
        title: "한 번에 완료되는 세안",
        description:
          "바쁜 일상 속에서도 간편하게 사용할 수 있으며 더블 클렌징 없이도 깔끔한 마무리가 가능합니다.",
      },
    ],
  },
  {
    id: "gel-balm-cleanser",
    name: "젤 밤 클렌저",
    description: "가벼운제형과 펌프 타입으로 편리하게 사용하는 젤 밤 클렌저",
    image: "/images/젤밤.jpg",
    benefits: [
      "건성 / 복합성 / 수분 부족형 지성",
      "피부 진정 & 보습",
      "멀티 유즈",
    ],
    ingredients: [
      "유칼립투스잎오일",
      "클로브잎오일",
      "포도씨오일",
      "시어버터추출물",
    ],
    usage:
      "젖은 손에 적당량을 취해 거품을 낸 후 부드럽게 마사지하고 찬물로 헹구세요.",
    suitableFor: {
      skinType: ["combination", "normal", "oily"],
      concerns: ["복합성 피부", "균형감 필요", "상쾌한 세안감"],
      lifestyle: ["규칙적인 세안", "운동 후 세안"],
    },
    reasons: [
      {
        title: "진정 & 보습",
        description: "시어버터 성분으로 깊은 보습과 탄력 있는 피부 선사",
      },
      {
        title: "멀티 유즈",
        description: "남성면도 젤로도 활용 가능한 실키한 밤 포뮬러",
      },
      {
        title: "펌프형 용기",
        description: "언제 어디서나 위생적이고 간편한 사용",
      },
    ],
  },
  {
    id: "foaming-cream-cleanser",
    name: "포밍 크림 클렌저",
    description: "세안 후에도 촉촉함을 유지시켜주는 부드러운 데일리 클렌저",
    image: "/images/클폼.jpg",
    benefits: ["지성 / 모든 피부 타입", "섬세한 클렌징", "피부결 개선 & 보습"],
    ingredients: ["호박발효추출물", "바바수오일", "알란토인", "글리세린"],
    usage:
      "젖은 얼굴에 적당량을 발라 충분히 거품을 낸 후 원형으로 마사지하고 미지근한 물로 헹구세요.",
    suitableFor: {
      skinType: ["dry", "normal", "sensitive"],
      concerns: ["영양 부족", "거칠어진 피부", "깊은 세정"],
      lifestyle: ["충분한 세안 시간", "스킨케어 중시"],
    },
    reasons: [
      {
        title: "섬세한 클렌징",
        description: "모닝 클렌저 또는 2차 클렌저로 적합",
      },
      {
        title: "피부결 개선",
        description: "호박 효소 추출물이 매끄럽고 건강한 피부결 선사",
      },
      {
        title: "피부 보습",
        description: "이브롬 카밍 블렌드가 세안 후에도 촉촉함 유지",
      },
    ],
  },
  {
    id: "cleansing-oil",
    name: "클렌징 오일",
    description: "강력한 세정력과 풍부한 영양감을 동시에 담은 오일 클렌저",
    image: "/images/클오.jpg",
    benefits: [
      "건성 / 복합성 / 잦은 메이크업",
      "강력한 세정력 & 영양 공급",
      "깔끔한 사용감",
    ],
    ingredients: [
      "스쿠알란",
      "비타민E",
      "아미노산 복합체",
      "코리앤더 씨드오일",
    ],
    usage:
      "건조한 손과 얼굴에 적당량을 발라 30초간 마사지 후 소량의 물을 추가해 유화시킨 뒤 헹구세요.",
    suitableFor: {
      skinType: ["oily", "combination", "normal"],
      concerns: ["과도한 유분", "블랙헤드", "워터프루프 메이크업"],
      lifestyle: ["진한 메이크업", "활동적인 생활"],
    },
    reasons: [
      {
        title: "강력한 세정력",
        description: "워터프루프 메이크업과 노폐물까지 깔끔하게 제거",
      },
      {
        title: "영양 공급",
        description: "스쿠알란 & 바이오 지질이 피부 장벽을 탄탄하게 케어",
      },
      {
        title: "깔끔한 사용감",
        description: "기름진 잔여물을 남기지 않고 촉촉함만 남기는 오일",
      },
    ],
  },
];
