
import React from 'react';
import { CATEGORIES } from '../constants.ts';
import { Answer, PropertyData } from '../types.ts';
import { RatingButton } from './RatingButton.tsx';
import { MapPin, StickyNote } from 'lucide-react';

interface Props {
  propertyData: PropertyData;
  setPropertyData: React.Dispatch<React.SetStateAction<PropertyData>>;
  onNext: () => void;
  onBack: () => void;
}

export const Step2Checklist: React.FC<Props> = ({ propertyData, setPropertyData, onNext, onBack }) => {
  const updateAnswer = (id: string, answer: Answer) => {
    setPropertyData(prev => ({
      ...prev,
      checklist: { ...prev.checklist, [id]: answer }
    }));
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">직접 본 매물을 체크해주세요</h2>
        <p className="text-gray-500">방금 본 그 집, 상태가 어땠나요?</p>
      </div>

      <div className="space-y-6 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center">
              <MapPin size={16} className="mr-1 text-blue-500" /> 매물 이름
            </label>
            <input 
              type="text" 
              placeholder="예: 강남역 푸르지오 302호"
              className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              value={propertyData.name}
              onChange={(e) => setPropertyData(p => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center">
              <StickyNote size={16} className="mr-1 text-blue-500" /> 간단 메모
            </label>
            <input 
              type="text" 
              placeholder="예: 채광은 좋은데 방음이 걱정됨"
              className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              value={propertyData.memo}
              onChange={(e) => setPropertyData(p => ({ ...p, memo: e.target.value }))}
            />
          </div>
        </div>

        <hr className="border-gray-100 my-8" />

        <div className="space-y-4">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between transition-all hover:bg-gray-50/50">
              <div className="mb-4 sm:mb-0">
                <h4 className="text-lg font-bold text-gray-900">{cat.name}</h4>
                <p className="text-xs text-gray-400 mt-1">상태가 만족스러웠나요?</p>
              </div>
              <div className="flex space-x-2">
                <RatingButton 
                  label="예" 
                  selected={propertyData.checklist[cat.id] === 'yes'} 
                  onClick={() => updateAnswer(cat.id, 'yes')} 
                />
                <RatingButton 
                  label="모르겠음" 
                  variant="gray"
                  selected={propertyData.checklist[cat.id] === 'maybe'} 
                  onClick={() => updateAnswer(cat.id, 'maybe')} 
                />
                <RatingButton 
                  label="아니오" 
                  selected={propertyData.checklist[cat.id] === 'no'} 
                  onClick={() => updateAnswer(cat.id, 'no')} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-8 bg-white/90 backdrop-blur p-4 border-t border-gray-100 flex justify-center">
        <button
          onClick={onNext}
          className="w-full max-w-md py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-700 transition-all active:scale-95"
        >
          결과 리포트 보기
        </button>
      </div>
    </div>
  );
};
