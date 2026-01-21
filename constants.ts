
import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'commute',
    name: '출퇴근 거리',
    questions: [] // 임대인에게 물어볼 필요 없음
  },
  {
    id: 'parents',
    name: '본가와의 거리',
    questions: [] // 임대인에게 물어볼 필요 없음
  },
  {
    id: 'safety',
    name: '치안/안전',
    questions: [
      "밤 10시 이후 골목 분위기는 어떤가요?",
      "여성 1인 거주에 불안 요소는 없나요?(CCTV/가로등/유동 인구)"
    ]
  },
  {
    id: 'cost',
    name: '월 고정비',
    questions: [
      "관리비에 포함되는 항목이 뭐예요? (수도/인터넷/청소비 등)",
      "여름·겨울 평균 공과금은 어느 정도인가요?"
    ]
  },
  {
    id: 'light',
    name: '채광/환기',
    questions: [
      "낮에 햇빛이 잘 드나요?",
      "창문 방향/환기 가능한 구조인가요?"
    ]
  },
  {
    id: 'noise',
    name: '소음/방음',
    questions: [
      "창문 닫았을 때 도로 소음이 어느 정도인가요?",
      "벽간 소음(옆집/윗집) 후기나 특징이 있나요?"
    ]
  },
  {
    id: 'condition',
    name: '집 컨디션',
    questions: [
      "곰팡이/결로 흔적이 있었던 적 있나요?",
      "온수는 잘 나오나요? 수압은 어떤가요?"
    ]
  },
  {
    id: 'building',
    name: '건물/층수/엘리베이터',
    questions: [
      "엘리베이터가 있다면 관리 상태는 괜찮나요?",
      "현관/계단/공용 공간이 깨끗한 편인가요?"
    ]
  },
  {
    id: 'infra',
    name: '생활 인프라',
    questions: [
      "주변에 공원, 병원 등이 가까이 있나요?",
      "지하철 역이 가까이 있나요?"
    ]
  },
  {
    id: 'contract',
    name: '계약 안정성',
    questions: [
      "전입신고와 확정일자 가능한가요?",
      "등기부등본 확인 가능할까요?",
      "임대인이 실소유자인지 확인할 수 있나요?"
    ]
  }
];

export const WEIGHT_MAP = {
  high: 3,
  medium: 2,
  low: 0
};

export const SCORE_MAP = {
  yes: 1,
  maybe: 0.5,
  no: 0
};
