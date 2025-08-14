import { QuizQuestion } from '@/types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: '평소 피부가 건조하다고 느끼시나요?',
    type: 'scale',
    options: ['전혀 그렇지 않다', '보통이다', '매우 그렇다'],
    category: 'skinType'
  },
  {
    id: 2,
    question: 'T존(이마, 코, 턱) 부위에 유분기가 많이 느껴지시나요?',
    type: 'scale',
    options: ['전혀 그렇지 않다', '보통이다', '매우 그렇다'],
    category: 'skinType'
  },
  {
    id: 3,
    question: '화장품을 사용했을 때 피부가 따갑거나 알레르기 반응을 보인 경험이 있나요?',
    type: 'yesno',
    category: 'skinType'
  },
  {
    id: 4,
    question: '평소 메이크업을 자주 하시나요?',
    type: 'scale',
    options: ['거의 안 함', '가끔', '매일'],
    category: 'lifestyle'
  },
  {
    id: 5,
    question: '워터프루프 제품(아이라이너, 마스카라 등)을 사용하시나요?',
    type: 'yesno',
    category: 'lifestyle'
  },
  {
    id: 6,
    question: '세안 후 당김 현상이 느껴지시나요?',
    type: 'scale',
    options: ['전혀 없다', '가끔 있다', '항상 있다'],
    category: 'concerns'
  },
  {
    id: 7,
    question: '모공이나 블랙헤드 때문에 고민이시나요?',
    type: 'yesno',
    category: 'concerns'
  },
  {
    id: 8,
    question: '세안 시간을 충분히 가질 수 있나요?',
    type: 'choice',
    options: ['빠르게 끝내고 싶다', '적당히', '충분한 시간을 갖고 싶다'],
    category: 'preferences'
  }
];