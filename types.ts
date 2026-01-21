
export type Importance = 'high' | 'medium' | 'low';
export type Answer = 'yes' | 'maybe' | 'no';

export type FeedbackValue = 'positive' | 'neutral' | 'negative';

export interface FeedbackData {
  helpfulness: FeedbackValue | null;
  accuracy: FeedbackValue | null;
}

export interface Category {
  id: string;
  name: string;
  questions: string[];
}

export interface UserCriteria {
  [categoryId: string]: Importance;
}

export interface ChecklistResponse {
  [categoryId: string]: Answer;
}

export interface PropertyData {
  name: string;
  memo: string;
  checklist: ChecklistResponse;
}

export enum AppStep {
  LANDING = 'LANDING',
  STEP1_CRITERIA = 'STEP1_CRITERIA',
  STEP2_CHECKLIST = 'STEP2_CHECKLIST',
  STEP3_RESULT = 'STEP3_RESULT',
  ADMIN = 'ADMIN'
}
