
import { CATEGORIES, WEIGHT_MAP, SCORE_MAP } from '../constants';
import { UserCriteria, ChecklistResponse } from '../types';

export const calculateScores = (criteria: UserCriteria, checklist: ChecklistResponse) => {
  let totalWeightedScore = 0;
  let totalPossibleWeight = 0;

  CATEGORIES.forEach((cat) => {
    const weight = WEIGHT_MAP[criteria[cat.id] || 'medium'];
    const answerScore = SCORE_MAP[checklist[cat.id] || 'maybe'];
    
    totalWeightedScore += (weight * answerScore);
    totalPossibleWeight += weight;
  });

  if (totalPossibleWeight === 0) return 0;
  return Math.round((totalWeightedScore / totalPossibleWeight) * 100);
};

export const getGrade = (score: number) => {
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  return 'C';
};

export const getSmartQuestions = (criteria: UserCriteria, checklist: ChecklistResponse) => {
  const finalQuestions: string[] = [];
  const MAX_TOTAL = 5;
  const excludedIds = ['commute', 'parents', 'contract'];

  // 1. '계약 안정성' 질문 무조건 1개 랜덤 포함
  const contractCat = CATEGORIES.find(c => c.id === 'contract');
  if (contractCat && contractCat.questions.length > 0) {
    const randomIndex = Math.floor(Math.random() * contractCat.questions.length);
    finalQuestions.push(contractCat.questions[randomIndex]);
  }

  // 2. 우선순위별 대상 카테고리 추출 (계약안정성/거리 항목 제외)
  // 1순위: '모르겠음' (maybe)
  const p1Categories = CATEGORIES.filter(cat => 
    !excludedIds.includes(cat.id) && checklist[cat.id] === 'maybe' && cat.questions.length > 0
  );

  // 2순위: '아니오' (no) + 중요도 '높음' (high)
  const p2Categories = CATEGORIES.filter(cat => 
    !excludedIds.includes(cat.id) && 
    checklist[cat.id] === 'no' && 
    criteria[cat.id] === 'high' && 
    cat.questions.length > 0 &&
    !p1Categories.find(p1 => p1.id === cat.id) // 혹시 모를 중복 방지
  );

  // 3. 라운드 로빈 방식으로 질문 채우기
  // 1순위 항목들 먼저 순회하며 하나씩 뽑기 -> 2순위 항목들 순회하며 하나씩 뽑기
  // 위 과정을 최대 개수(5개)가 찰 때까지 반복
  const fillQuestions = (targetCats: typeof CATEGORIES) => {
    let qIndex = 0;
    let hasMoreInGroup = true;

    while (finalQuestions.length < MAX_TOTAL && hasMoreInGroup) {
      hasMoreInGroup = false;
      for (const cat of targetCats) {
        if (finalQuestions.length >= MAX_TOTAL) break;
        
        const question = cat.questions[qIndex];
        if (question) {
          hasMoreInGroup = true;
          if (!finalQuestions.includes(question)) {
            finalQuestions.push(question);
          }
        }
      }
      qIndex++;
    }
  };

  // 1순위(모르겠음) 카테고리들에서 라운드 로빈
  fillQuestions(p1Categories);
  
  // 2순위(중요한데 아니오) 카테고리들에서 라운드 로빈
  fillQuestions(p2Categories);

  return finalQuestions;
};
