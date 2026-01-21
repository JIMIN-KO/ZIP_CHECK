
import { CATEGORIES, WEIGHT_MAP, SCORE_MAP } from '../constants.ts';
import { UserCriteria, ChecklistResponse } from '../types.ts';

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

  const contractCat = CATEGORIES.find(c => c.id === 'contract');
  if (contractCat && contractCat.questions.length > 0) {
    const randomIndex = Math.floor(Math.random() * contractCat.questions.length);
    finalQuestions.push(contractCat.questions[randomIndex]);
  }

  const p1Categories = CATEGORIES.filter(cat => 
    !excludedIds.includes(cat.id) && checklist[cat.id] === 'maybe' && cat.questions.length > 0
  );

  const p2Categories = CATEGORIES.filter(cat => 
    !excludedIds.includes(cat.id) && 
    checklist[cat.id] === 'no' && 
    criteria[cat.id] === 'high' && 
    cat.questions.length > 0 &&
    !p1Categories.find(p1 => p1.id === cat.id)
  );

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

  fillQuestions(p1Categories);
  fillQuestions(p2Categories);

  return finalQuestions;
};
