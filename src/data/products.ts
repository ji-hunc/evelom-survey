import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "cleansing-balm",
    name: "클렌징 밤",
    description:
      "부드럽게 녹여내는 프리미엄 클렌징 밤으로 메이크업과 노폐물을 완벽하게 제거합니다.",
    image: "/images/클렌징밤.jpg",
    benefits: [
      "완벽한 메이크업 제거",
      "깊은 모공 정화",
      "피부 수분 보호",
      "부드러운 텍스처",
    ],
    ingredients: ["세라마이드", "호호바오일", "비타민E", "카모마일 추출물"],
    usage:
      "건조한 손으로 적당량을 취해 얼굴 전체에 부드럽게 마사지 후 미지근한 물로 헹구세요.",
    suitableFor: {
      skinType: ["dry", "sensitive", "normal"],
      concerns: ["메이크업 제거", "건조함", "민감함"],
      lifestyle: ["메이크업 자주 사용", "바쁜 일상"],
    },
  },
  {
    id: "gel-balm-cleanser",
    name: "젤 밤 클렌저",
    description:
      "젤과 밤의 장점을 결합한 혁신적인 클렌저로 상쾌하면서도 촉촉한 세안감을 선사합니다.",
    image: "/images/젤밤클렌저.jpg",
    benefits: [
      "이중 세정 효과",
      "상쾌한 마무리",
      "수분 공급",
      "모든 피부타입 적합",
    ],
    ingredients: [
      "히알루론산",
      "녹차 추출물",
      "알로에 베라",
      "펩타이드 복합체",
    ],
    usage:
      "젖은 손에 적당량을 취해 거품을 낸 후 부드럽게 마사지하고 찬물로 헹구세요.",
    suitableFor: {
      skinType: ["combination", "normal", "oily"],
      concerns: ["복합성 피부", "균형감 필요", "상쾌한 세안감"],
      lifestyle: ["규칙적인 세안", "운동 후 세안"],
    },
  },
  {
    id: "foaming-cream-cleanser",
    name: "포밍 크림 클렌저",
    description:
      "부드러운 크림 텍스처에서 풍부한 거품이 생성되어 깊은 세정과 영양 공급을 동시에 제공합니다.",
    image: "/images/포밍크림클렌저.jpg",
    benefits: ["풍부한 거품", "깊은 세정력", "영양 공급", "부드러운 마무리"],
    ingredients: ["콜라겐", "로즈힙오일", "나이아신아마이드", "판테놀"],
    usage:
      "젖은 얼굴에 적당량을 발라 충분히 거품을 낸 후 원형으로 마사지하고 미지근한 물로 헹구세요.",
    suitableFor: {
      skinType: ["dry", "normal", "sensitive"],
      concerns: ["영양 부족", "거칠어진 피부", "깊은 세정"],
      lifestyle: ["충분한 세안 시간", "스킨케어 중시"],
    },
  },
  {
    id: "cleansing-oil",
    name: "클렌징 오일",
    description:
      "가벼우면서도 강력한 세정력의 클렌징 오일로 워터프루프 메이크업까지 깔끔하게 제거합니다.",
    image: "/images/클렌징오일.jpg",
    benefits: [
      "강력한 메이크업 제거",
      "워터프루프 제품 제거",
      "모공 깊숙이 세정",
      "산뜻한 마무리",
    ],
    ingredients: ["스쿠알란", "아르간오일", "티트리오일", "오렌지 추출물"],
    usage:
      "건조한 손과 얼굴에 적당량을 발라 30초간 마사지 후 소량의 물을 추가해 유화시킨 뒤 헹구세요.",
    suitableFor: {
      skinType: ["oily", "combination", "normal"],
      concerns: ["과도한 유분", "블랙헤드", "워터프루프 메이크업"],
      lifestyle: ["진한 메이크업", "활동적인 생활"],
    },
  },
];
