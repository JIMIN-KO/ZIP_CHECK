
import React from 'react';
import { Home, Zap, ArrowRight, MousePointer2, ClipboardCheck, FileText, CheckCircle2, Check } from 'lucide-react';

export const Landing: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center mt-8 sm:mt-16 space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Hero Section */}
      <div className="text-center space-y-8 px-4">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="relative w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl">
            <Home size={44} strokeWidth={2.5} />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
              <Check size={20} strokeWidth={4} className="text-white" />
            </div>
          </div>
        </div>
        <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
          내 인생 첫 자취방,<br/><span className="text-blue-600 font-black">이집어때</span>와 평가하세요.
        </h1>
        <p className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
          나에게 중요한 데이터 위주로 기억하는<br/>
          <span className="text-gray-900">'내 기준' 매물 분석 서비스</span>
        </p>
        <div className="pt-8">
          <button
            onClick={onStart}
            className="group relative px-12 py-6 bg-blue-600 text-white text-xl font-black rounded-[2rem] shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.5)] hover:-translate-y-1 transition-all active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              평가 시작하기
              <Zap className="ml-2 w-6 h-6 group-hover:animate-pulse" />
            </span>
          </button>
        </div>
      </div>

      {/* Onboarding Visual Guide Section */}
      <div className="w-full max-w-6xl px-6 py-20 bg-gray-50/50 rounded-[3rem] border border-gray-100 mb-20">
        <div className="text-center mb-20">
          <span className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-3 block">HOW IT WORKS</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">이렇게 이용하세요!</h2>
          <p className="text-gray-500 font-medium text-lg">매물 별 특징, 단 3단계로 평가해요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1: Criteria Setup Mockup */}
          <div className="group flex flex-col items-center">
            <div className="w-full aspect-[4/3] bg-white rounded-3xl mb-8 p-6 shadow-xl border border-gray-100 group-hover:-translate-y-3 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mr-3">
                  <MousePointer2 size={20} />
                </div>
                <div className="h-4 w-24 bg-gray-100 rounded-full"></div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`p-3 rounded-xl border flex items-center justify-between ${i === 1 ? 'border-blue-200 bg-blue-50/30' : 'border-gray-50'}`}>
                    <div className="h-2 w-16 bg-gray-200 rounded-full"></div>
                    <div className="flex space-x-1">
                      <div className={`px-2 py-1 rounded text-[8px] font-bold ${i === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>중요</div>
                      <div className="px-2 py-1 rounded bg-gray-50 text-[8px] font-bold text-gray-300">보통</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-4 right-4 animate-bounce">
                <div className="bg-blue-600 p-2 rounded-full shadow-lg">
                  <MousePointer2 size={12} className="text-white" />
                </div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-gray-900">01. 나만의 기준 설정</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                채광, 소음, 보안 등 내가 양보할 수 없는<br/>
                <span className="text-blue-600 font-bold">항목별 중요도</span>를 먼저 설정하세요.
              </p>
            </div>
          </div>

          {/* Step 2: Property Checklist Mockup */}
          <div className="group flex flex-col items-center">
            <div className="w-full aspect-[4/3] bg-white rounded-3xl mb-8 p-6 shadow-xl border border-gray-100 group-hover:-translate-y-3 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mr-3">
                    <ClipboardCheck size={20} />
                  </div>
                  <div className="h-4 w-20 bg-gray-100 rounded-full"></div>
                </div>
                <CheckCircle2 size={20} className="text-emerald-500" />
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-emerald-50/50 rounded-2xl flex items-center justify-between border border-emerald-100">
                  <div className="h-2 w-20 bg-emerald-700/20 rounded-full"></div>
                  <div className="flex space-x-1">
                    <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-[10px] text-white font-bold">예</div>
                    <div className="w-6 h-6 rounded-lg bg-white border border-gray-100"></div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between opacity-60">
                  <div className="h-2 w-16 bg-gray-200 rounded-full"></div>
                  <div className="flex space-x-1">
                    <div className="w-6 h-6 rounded-lg bg-white border border-gray-100"></div>
                    <div className="w-6 h-6 rounded-lg bg-gray-400 flex items-center justify-center text-[10px] text-white font-bold">X</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-gray-900">02. 객관적 점수 산출</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                매물을 보며 느낀 상태를 체크하면<br/>
                <span className="text-emerald-600 font-bold">100점 만점의 객관적 점수</span>가 계산됩니다.
              </p>
            </div>
          </div>

          {/* Step 3: Result & Questions Mockup */}
          <div className="group flex flex-col items-center">
            <div className="w-full aspect-[4/3] bg-blue-600 rounded-3xl mb-8 p-6 shadow-xl group-hover:-translate-y-3 transition-all duration-500 relative overflow-hidden flex flex-col justify-center items-center text-white">
              <div className="w-24 h-24 rounded-full border-[6px] border-blue-400 flex flex-col items-center justify-center relative bg-blue-700 shadow-inner mb-4">
                <span className="text-3xl font-black">88</span>
                <span className="text-[10px] font-bold opacity-60">SCORE</span>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white text-blue-600 rounded-2xl flex items-center justify-center text-lg font-black shadow-lg">A</div>
              </div>
              <div className="w-full space-y-2 px-2">
                <div className="h-2 w-full bg-blue-400/30 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-white rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <FileText size={14} className="opacity-60" />
                  <div className="h-1.5 w-full bg-blue-400/50 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText size={14} className="opacity-60" />
                  <div className="h-1.5 w-2/3 bg-blue-400/50 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-gray-900">03. 스마트 질문 생성</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                중요하지만 확인하지 못한 항목을 분석해<br/>
                <span className="text-blue-600 font-bold">임대인용 맞춤 질문 리스트</span>를 드려요.
              </p>
            </div>
          </div>
        </div>

        {/* Closing CTA Card */}
        <div className="mt-24 p-12 bg-gray-900 rounded-[3rem] text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full"></div>
             <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full"></div>
          </div>
          <h3 className="text-3xl font-black text-white mb-6">이제 당신의 차례입니다.</h3>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed">
            나에게 딱 맞는 집을 찾기 위한 첫 걸음,<br/>
            이집어때가 가장 든든한 가이드가 되어드릴게요.
          </p>
          <button 
            onClick={onStart}
            className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all flex items-center mx-auto shadow-lg"
          >
            시작하기 <ArrowRight size={20} className="ml-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
