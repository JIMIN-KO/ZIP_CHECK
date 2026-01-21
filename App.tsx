
import React, { useState, useEffect } from 'react';
import { AppStep, UserCriteria, ChecklistResponse, PropertyData, FeedbackData } from './types.ts';
import { CATEGORIES } from './constants.ts';
import { Layout } from './components/Layout.tsx';
import { Landing } from './components/Landing.tsx';
import { Step1Criteria } from './components/Step1Criteria.tsx';
import { Step2Checklist } from './components/Step2Checklist.tsx';
import { Step3Result } from './components/Step3Result.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { ArrowLeft, LayoutDashboard, Home, Check } from 'lucide-react';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LANDING);
  
  // 피드백 통계를 위한 로컬 데이터
  const [allFeedbacks, setAllFeedbacks] = useState<FeedbackData[]>(() => {
    try {
      const saved = localStorage.getItem('house_feedbacks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const getInitialCriteria = (): UserCriteria => {
    const initial: UserCriteria = {};
    CATEGORIES.forEach(c => initial[c.id] = 'medium');
    return initial;
  };

  const getInitialPropertyData = (): PropertyData => {
    const initialChecklist: ChecklistResponse = {};
    CATEGORIES.forEach(c => initialChecklist[c.id] = 'maybe');
    return {
      name: '',
      memo: '',
      checklist: initialChecklist
    };
  };

  const [criteria, setCriteria] = useState<UserCriteria>(getInitialCriteria);
  const [propertyData, setPropertyData] = useState<PropertyData>(getInitialPropertyData);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleFeedbackSubmit = (feedback: FeedbackData) => {
    const updated = [...allFeedbacks, feedback];
    setAllFeedbacks(updated);
    localStorage.setItem('house_feedbacks', JSON.stringify(updated));
  };

  const goNext = () => {
    if (currentStep === AppStep.LANDING) setCurrentStep(AppStep.STEP1_CRITERIA);
    else if (currentStep === AppStep.STEP1_CRITERIA) setCurrentStep(AppStep.STEP2_CHECKLIST);
    else if (currentStep === AppStep.STEP2_CHECKLIST) setCurrentStep(AppStep.STEP3_RESULT);
  };

  const goBack = () => {
    if (currentStep === AppStep.STEP1_CRITERIA) setCurrentStep(AppStep.LANDING);
    else if (currentStep === AppStep.STEP2_CHECKLIST) setCurrentStep(AppStep.STEP1_CRITERIA);
    else if (currentStep === AppStep.STEP3_RESULT) setCurrentStep(AppStep.STEP2_CHECKLIST);
  };

  const handleRestart = () => {
    setCriteria(getInitialCriteria());
    setPropertyData(getInitialPropertyData());
    setCurrentStep(AppStep.LANDING);
  };

  const renderContent = () => {
    switch (currentStep) {
      case AppStep.LANDING:
        return <Landing onStart={goNext} />;
      case AppStep.STEP1_CRITERIA:
        return <Step1Criteria criteria={criteria} setCriteria={setCriteria} onNext={goNext} />;
      case AppStep.STEP2_CHECKLIST:
        return <Step2Checklist propertyData={propertyData} setPropertyData={setPropertyData} onNext={goNext} onBack={goBack} />;
      case AppStep.STEP3_RESULT:
        return (
          <Step3Result 
            criteria={criteria} 
            propertyData={propertyData} 
            onRestart={handleRestart} 
            onFeedbackSubmit={handleFeedbackSubmit}
          />
        );
      case AppStep.ADMIN:
        return <AdminDashboard feedbacks={allFeedbacks} onClose={() => setCurrentStep(AppStep.LANDING)} />;
      default:
        return <Landing onStart={goNext} />;
    }
  };

  return (
    <Layout>
      <div className="relative min-h-screen">
        {currentStep !== AppStep.LANDING && currentStep !== AppStep.ADMIN && (
          <div className="max-w-4xl mx-auto pt-6 px-4 flex justify-between items-center mb-4">
             <button onClick={goBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center text-gray-600">
               <ArrowLeft size={20} className="mr-1" />
               <span className="hidden sm:inline">이전으로</span>
             </button>
             <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
               Step {currentStep === AppStep.STEP1_CRITERIA ? '1' : currentStep === AppStep.STEP2_CHECKLIST ? '2' : '3'}
             </div>
          </div>
        )}

        <header className="fixed top-0 left-0 w-full h-16 bg-white/80 backdrop-blur-md z-40 border-b flex items-center justify-between px-6">
          <div className="flex items-center cursor-pointer group" onClick={() => setCurrentStep(AppStep.LANDING)}>
            <div className="relative w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm mr-2.5 transition-transform group-hover:scale-105">
              <Home size={20} strokeWidth={2.5} />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                <Check size={10} strokeWidth={4} className="text-white" />
              </div>
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900">이집어때</span>
          </div>
          <button 
            onClick={() => setCurrentStep(AppStep.ADMIN)}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title="관리자 대시보드"
          >
            <LayoutDashboard size={20} />
          </button>
        </header>

        <main className="pt-20 pb-20">
          {renderContent()}
        </main>
      </div>
    </Layout>
  );
};

export default App;
