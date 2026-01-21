
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { X, TrendingUp, Users, Heart, Star, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { FeedbackData } from '../types';

interface Props {
  onClose: () => void;
  feedbacks: FeedbackData[];
}

const MOCK_AVG_SCORES = [
  { name: '1월', score: 65 },
  { name: '2월', score: 72 },
  { name: '3월', score: 68 },
  { name: '4월', score: 75 },
  { name: '5월', score: 82 },
];

const MOCK_IMPORTANCE = CATEGORIES.map(cat => ({
  name: cat.name,
  count: Math.floor(Math.random() * 50) + 10
})).sort((a, b) => b.count - a.count).slice(0, 5);

export const AdminDashboard: React.FC<Props> = ({ onClose, feedbacks }) => {
  
  // 실제 피드백 데이터 가공
  const getFeedbackStats = (type: 'helpfulness' | 'accuracy') => {
    const stats = { positive: 0, neutral: 0, negative: 0 };
    feedbacks.forEach(f => {
      if (f[type]) stats[f[type] as keyof typeof stats]++;
    });
    
    // 만약 데이터가 없으면 Mock 데이터로 시연
    if (feedbacks.length === 0) {
      return [
        { name: '만족', value: 75, color: '#2563EB' },
        { name: '보통', value: 20, color: '#60A5FA' },
        { name: '불만족', value: 5, color: '#F43F5E' },
      ];
    }

    return [
      { name: '만족', value: stats.positive, color: '#2563EB' },
      { name: '보통', value: stats.neutral, color: '#60A5FA' },
      { name: '불만족', value: stats.negative, color: '#F43F5E' },
    ];
  };

  const helpfulStats = getFeedbackStats('helpfulness');
  const accuracyStats = getFeedbackStats('accuracy');

  // 총 만족도 계산
  const totalCount = feedbacks.length || 100;
  const positiveCount = feedbacks.filter(f => f.helpfulness === 'positive').length || 75;
  const satisfactionRate = Math.round((positiveCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-6 md:p-12 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black text-gray-900">이집어때 관리자 센터</h1>
            <p className="text-gray-500">사용자 피드백 및 매물 평가 데이터 현황</p>
          </div>
          <button onClick={onClose} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
             <div className="flex items-center text-blue-600 mb-2">
               <Users size={20} className="mr-2" />
               <span className="text-sm font-bold">누적 평가 수</span>
             </div>
             <div className="text-3xl font-black text-blue-700">{feedbacks.length || 1242}건</div>
             <div className="text-xs text-blue-500 mt-1">최근 24시간: +42건</div>
           </div>
           <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
             <div className="flex items-center text-emerald-600 mb-2">
               <TrendingUp size={20} className="mr-2" />
               <span className="text-sm font-bold">평균 만족도</span>
             </div>
             <div className="text-3xl font-black text-emerald-700">{satisfactionRate}%</div>
             <div className="text-xs text-emerald-500 mt-1">"도움이 됐어요" 응답 기준</div>
           </div>
           <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100">
             <div className="flex items-center text-rose-600 mb-2">
               <Star size={20} className="mr-2" />
               <span className="text-sm font-bold">가장 높은 신뢰도</span>
             </div>
             <div className="text-3xl font-black text-rose-700">A 등급</div>
             <div className="text-xs text-rose-500 mt-1">상위 평가 매물의 88%가 계약 고려</div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Question 1: Helpfulness Chart */}
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <div className="flex items-center mb-6">
               <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                 <Heart size={20} />
               </div>
               <div>
                 <h3 className="text-lg font-bold">집 판단에 도움이 되었나요?</h3>
                 <p className="text-xs text-gray-400">전체 사용자 응답 비율</p>
               </div>
            </div>
            <div className="h-64 w-full flex flex-col items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={helpfulStats}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {helpfulStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex space-x-6 mt-2">
                {helpfulStats.map((item, idx) => (
                  <div key={idx} className="flex items-center text-xs">
                     <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                     <span className="text-gray-500 font-bold">{item.name}: {item.value}건</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question 2: Accuracy Chart */}
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <div className="flex items-center mb-6">
               <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mr-3">
                 <CheckCircle2 size={20} />
               </div>
               <div>
                 <h3 className="text-lg font-bold">점수가 내 기준을 잘 반영하나요?</h3>
                 <p className="text-xs text-gray-400">데이터 신뢰도 평가 결과</p>
               </div>
            </div>
            <div className="h-64 w-full flex flex-col items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={accuracyStats}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {accuracyStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex space-x-6 mt-2">
                {accuracyStats.map((item, idx) => (
                  <div key={idx} className="flex items-center text-xs">
                     <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                     <span className="text-gray-500 font-bold">{item.name}: {item.value}건</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Importance Chart */}
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h3 className="text-lg font-bold mb-6">가장 많이 선택된 '중요' 항목 TOP 5</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_IMPORTANCE} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#f3f4f6' }} />
                  <Bar dataKey="count" fill="#2563EB" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Score Trend */}
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h3 className="text-lg font-bold mb-6">월별 매물 평균 점수 추이</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_AVG_SCORES}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={4} dot={{ fill: '#2563EB', r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
