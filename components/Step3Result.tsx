
import React, { useMemo, useState } from 'react';
import { UserCriteria, PropertyData, FeedbackData, FeedbackValue } from '../types.ts';
import { CATEGORIES } from '../constants.ts';
import { calculateScores, getGrade, getSmartQuestions } from '../services/analysisService.ts';
import { Copy, RefreshCw, MessageSquareText, HelpCircle, AlertCircle, Share2, Frown, Meh, Smile } from 'lucide-react';

interface Props {
  criteria: UserCriteria;
  propertyData: PropertyData;
  onRestart: () => void;
  onFeedbackSubmit: (feedback: FeedbackData) => void;
}

export const Step3Result: React.FC<Props> = ({ criteria, propertyData, onRestart, onFeedbackSubmit }) => {
  const score = useMemo(() => calculateScores(criteria, propertyData.checklist), [criteria, propertyData]);
  const grade = useMemo(() => getGrade(score), [score]);
  const recommendations = useMemo(() => getSmartQuestions(criteria, propertyData.checklist), [criteria, propertyData]);
  
  const [feedback, setFeedback] = useState<FeedbackData>({ helpfulness: null, accuracy: null });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const criticalItems = useMemo(() => {
    return CATEGORIES.filter(cat => 
      criteria[cat.id] === 'high' && 
      (propertyData.checklist[cat.id] === 'no' || propertyData.checklist[cat.id] === 'maybe')
    );
  }, [criteria, propertyData]);

  const copyQuestions = () => {
    const text = recommendations.join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedbackSelect = (type: 'helpfulness' | 'accuracy', value: FeedbackValue) => {
    if (submitted) return;
    const newFeedback = { ...feedback, [type]: value };
    setFeedback(newFeedback);
    
    if (newFeedback.helpfulness && newFeedback.accuracy) {
      onFeedbackSubmit(newFeedback);
      setSubmitted(true);
    }
  };

  const gradeColors: Record<string, string> = {
    'A': 'text-emerald-600 bg-emerald-50 border-emerald-100',
    'B': 'text-blue-600 bg-blue-50 border-blue-100',
    'C': 'text-rose-600 bg-rose-50 border-rose-100',
  };

  return (
    <div className="animate-in zoom-in duration-700">
      <div className="text-center mb-12">
        <p className="text-gray-500 font-medium mb-2">{propertyData.name || '방금 본 매물'}의 분석 결과</p>
        <div className="inline-flex items-center justify-center p-8 bg-white rounded-full shadow-2xl border-8 border-blue-50 relative">
          <div className="text-6xl font-black text-blue-600">{score}<span className="text-2xl font-bold text-gray-300">/100</span></div>
          <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-xl border flex items-center justify-center font-black text-2xl shadow-lg ${gradeColors[grade]}`}>
            {grade}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <MessageSquareText size={22} className="mr-2 text-blue-600" />
            이 매물, 종합 평가는?
          </h3>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              {grade === 'A' ? 
                '당신이 설정한 기준에 거의 완벽하게 부합하는 집입니다! 계약을 서두르는 것이 좋을 수도 있겠네요.' :
                grade === 'B' ?
                '전체적으로 무난한 집입니다. 다만 부족한 몇 가지 항목들이 당신의 우선순위와 맞는지 다시 한번 고민해보세요.' :
                '아쉽게도 당신의 기준과는 거리가 있는 매물입니다. 특히 중요한 항목에서 낮은 점수를 받았을 수 있으니 신중히 결정하세요.'
              }
            </p>
            
            {criticalItems.length > 0 && (
              <div className="mt-4 p-5 bg-amber-50 rounded-2xl border border-amber-100 border-dashed">
                <div className="flex items-center text-amber-700 font-bold mb-2">
                  <AlertCircle size={18} className="mr-2" />
                  주의 깊게 확인해보세요!
                </div>
                <p className="text-sm text-amber-800 leading-relaxed">
                  중요하게 생각하시는 <span className="font-bold underline">[{criticalItems.map(c => c.name).join(', ')}]</span> 항목이 '아니오' 또는 '모르겠음'으로 체크되었습니다. 이 부분은 결정하시기 전에 꼭 다시 한번 검토해보시는 것을 추천드려요.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="p-8 bg-blue-600 rounded-3xl shadow-xl text-white relative">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-1 relative">
              <h3 className="text-xl font-bold">임대인에게 물어볼 것들</h3>
              <div 
                className="cursor-pointer text-blue-200 hover:text-white transition-colors p-1"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
              >
                <HelpCircle size={18} />
              </div>
              {showTooltip && (
                <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2">
                  내가 체크한 항목 별 중요도 기반으로 질문이 생성돼요. 중요하지만 확인하지 못한 항목을 질문해 보세요!
                  <div className="absolute left-4 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900"></div>
                </div>
              )}
            </div>
            <button 
              onClick={copyQuestions}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center text-xs font-bold"
            >
              <Copy size={14} className="mr-1" />
              {copied ? '복사됨!' : '전체 복사'}
            </button>
          </div>
          <ul className="space-y-4">
            {recommendations.length > 0 ? recommendations.map((q, i) => (
              <li key={i} className="flex items-start space-x-3 text-sm font-medium">
                <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">{i+1}</span>
                <span className="leading-tight opacity-90">{q}</span>
              </li>
            )) : (
              <li className="opacity-70 text-sm italic">추가 확인이 필요한 사항이 없습니다.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 rounded-3xl border border-gray-100 p-8 mb-12 relative overflow-hidden">
        {submitted && (
          <div className="absolute inset-0 bg-blue-600/95 flex flex-col items-center justify-center text-white z-10 animate-in fade-in">
             <Smile size={48} className="mb-4 animate-bounce" />
             <h4 className="text-xl font-black">피드백 감사합니다!</h4>
             <p className="text-blue-100 mt-2">더 나은 분석을 위해 소중히 활용할게요.</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="text-center md:text-left">
            <h4 className="font-bold text-gray-800 mb-6">집 판단에 도움이 되었나요?</h4>
            <div className="flex justify-center md:justify-start space-x-3">
              <button 
                onClick={() => handleFeedbackSelect('helpfulness', 'positive')}
                className={`flex-1 flex flex-col items-center p-4 rounded-2xl border transition-all ${feedback.helpfulness === 'positive' ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-105' : 'bg-white border-gray-100 hover:border-blue-200'}`}
              >
                <Smile size={24} className={feedback.helpfulness === 'positive' ? 'text-white' : 'text-blue-600'} />
                <span className="text-[10px] font-black mt-2">도움이 됐어요</span>
              </button>
              <button 
                onClick={() => handleFeedbackSelect('helpfulness', 'neutral')}
                className={`flex-1 flex flex-col items-center p-4 rounded-2xl border transition-all ${feedback.helpfulness === 'neutral' ? 'bg-gray-600 border-gray-600 text-white shadow-lg scale-105' : 'bg-white border-gray-100 hover:border-gray-200'}`}
              >
                <Meh size={24} className={feedback.helpfulness === 'neutral' ? 'text-white' : 'text-gray-400'} />
                <span className="text-[10px] font-black mt-2">애매해요</span>
              </button>
              <button 
                onClick={() => handleFeedbackSelect('helpfulness', 'negative')}
                className={`flex-1 flex flex-col items-center p-4 rounded-2xl border transition-all ${feedback.helpfulness === 'negative' ? 'bg-rose-600 border-rose-600 text-white shadow-lg scale-105' : 'bg-white border-gray-100 hover:border-rose-200'}`}
              >
                <Frown size={24} className={feedback.helpfulness === 'negative' ? 'text-white' : 'text-rose-600'} />
                <span className="text-[10px] font-black mt-2">안 됐어요</span>
              </button>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-bold text-gray-800 mb-6">점수가 내 기준을 잘 반영하나요?</h4>
            <div className="flex justify-center md:justify-start space-x-3">
              <button 
                onClick={() => handleFeedbackSelect('accuracy', 'positive')}
                className={`flex-1 flex flex-col items-center p-4 rounded-2xl border transition-all ${feedback.accuracy === 'positive' ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-105' : 'bg-white border-gray-100 hover:border-blue-200'}`}
              >
                <Smile size={24} className={feedback.accuracy === 'positive' ? 'text-white' : 'text-blue-600'} />
                <span className="text-[10px] font-black mt-2">네!</span>
              </button>
              <button 
                onClick={() => handleFeedbackSelect('accuracy', 'neutral')}
                className={`flex-1 flex flex-col items-center p-4 rounded-2xl border transition-all ${feedback.accuracy === 'neutral' ? 'bg-gray-600 border-gray-600 text-white shadow-lg scale-105' : 'bg-white border-gray-100 hover:border-gray-200'}`}
              >
                <Meh size={24} className={feedback.accuracy === 'neutral' ? 'text-white' : 'text-gray-400'} />
                <span className="text-[10px] font-black mt-2">보통이에요</span>
              </button>
              <button 
                onClick={() => handleFeedbackSelect('accuracy', 'negative')}
                className={`flex-1 flex flex-col items-center p-4 rounded-2xl border transition-all ${feedback.accuracy === 'negative' ? 'bg-rose-600 border-rose-600 text-white shadow-lg scale-105' : 'bg-white border-gray-100 hover:border-rose-200'}`}
              >
                <Frown size={24} className={feedback.accuracy === 'negative' ? 'text-white' : 'text-rose-600'} />
                <span className="text-[10px] font-black mt-2">아니요</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
        <button 
          onClick={onRestart}
          className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all flex items-center justify-center"
        >
          <RefreshCw size={18} className="mr-2" /> 다시 시작하기
        </button>
        <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center">
          <Share2 size={18} className="mr-2" /> 결과 공유하기
        </button>
      </div>
    </div>
  );
};
