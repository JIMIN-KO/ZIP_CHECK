
import React from 'react';
import { CATEGORIES } from '../constants.ts';
import { Importance, UserCriteria } from '../types.ts';
import { RatingButton } from './RatingButton.tsx';
import { Info } from 'lucide-react';

interface Props {
  criteria: UserCriteria;
  setCriteria: React.Dispatch<React.SetStateAction<UserCriteria>>;
  onNext: () => void;
}

export const Step1Criteria: React.FC<Props> = ({ criteria, setCriteria, onNext }) => {
  const updateImportance = (id: string, importance: Importance) => {
    setCriteria(prev => ({ ...prev, [id]: importance }));
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">어떤 점이 가장 중요한가요?</h2>
        <p className="text-gray-500">나만의 기준에 따라 항목별 가중치를 설정해주세요.</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start space-x-3 mb-10">
        <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
        <p className="text-sm text-blue-800 leading-relaxed">
          '중요해요' 항목은 최종 점수에 더 큰 영향을 미칩니다. <br/>
          정말 포기할 수 없는 조건들에 체크해보세요!
        </p>
      </div>

      <div className="space-y-4 mb-12">
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <span className="text-lg font-semibold text-gray-800 mb-3 sm:mb-0">{cat.name}</span>
            <div className="flex space-x-2">
              <RatingButton 
                label="중요해요" 
                selected={criteria[cat.id] === 'high'} 
                onClick={() => updateImportance(cat.id, 'high')} 
              />
              <RatingButton 
                label="보통이에요" 
                selected={criteria[cat.id] === 'medium'} 
                onClick={() => updateImportance(cat.id, 'medium')} 
              />
              <RatingButton 
                label="상관없어요" 
                selected={criteria[cat.id] === 'low'} 
                onClick={() => updateImportance(cat.id, 'low')} 
              />
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-8 bg-white/90 backdrop-blur p-4 border-t border-gray-100 flex justify-center">
        <button
          onClick={onNext}
          className="w-full max-w-md py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-700 transition-all active:scale-95"
        >
          다음 단계로 넘어가기
        </button>
      </div>
    </div>
  );
};
