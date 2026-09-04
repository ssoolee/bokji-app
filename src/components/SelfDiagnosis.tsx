import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Printer,
  MessageSquare,
  Sparkles,
  Info,
  Check,
  ChevronRight,
  Home,
  Award,
  Wallet,
  ShieldCheck,
  CalendarCheck,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { FontScale, WelfareBenefit } from '../types';
import {
  QUESTIONS_DATA,
  WELFARE_SERVICES,
  INCOME_CRITERIA_2026,
  MEDIAN_INCOME_2026
} from '../data/welfareData';

interface SelfDiagnosisProps {
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
  onOpenDetailModal: (benefit: WelfareBenefit) => void;
  onOpenSmsModal: () => void;
  onBookConsultationForBenefit: (topic: string) => void;
}

export const SelfDiagnosis: React.FC<SelfDiagnosisProps> = ({
  fontScale,
  setFontScale,
  onOpenDetailModal,
  onOpenSmsModal,
  onBookConsultationForBenefit,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [resetNotification, setResetNotification] = useState<string | null>(null);

  const totalQuestions = QUESTIONS_DATA.length;
  const isFinished = currentStepIndex >= totalQuestions;
  const currentQuestion = QUESTIONS_DATA[currentStepIndex];

  const handleAnswer = (answer: boolean) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStepIndex] = answer;
    setAnswers(updatedAnswers);
    setCurrentStepIndex((prev) => prev + 1);

    const cardEl = document.getElementById('card-viewport');
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setAnswers([]);
    setResetNotification('자가진단이 성공적으로 초기화되었습니다. 1단계(거주지 확인)부터 다시 시작합니다.');
    setTimeout(() => {
      setResetNotification(null);
    }, 5000);
    const rootEl = document.getElementById('questionnaire-root');
    if (rootEl) {
      rootEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'home_pin':
        return <Home className="w-5 h-5 text-[#0284c7]" />;
      case 'badge':
        return <Award className="w-5 h-5 text-[#0284c7]" />;
      case 'currency_krw':
        return <Wallet className="w-5 h-5 text-[#0284c7]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#0284c7]" />;
    }
  };

  // Matched benefits calculation
  const isYangpyeongResident = answers[0] !== false;
  const isSenior65 = answers[1] !== false;
  const isLowIncome = answers[2] !== false;

  const matchedBenefits = WELFARE_SERVICES.filter((service) => {
    if (service.id === 'basic-pension') return isSenior65;
    if (service.id === 'free-bus') return isSenior65 && isYangpyeongResident;
    if (service.id === 'senior-care') return isSenior65;
    if (service.id === 'health-medical') return isSenior65;
    return true;
  }).slice(0, 4);

  return (
    <section id="questionnaire-root" className="w-full py-8 md:py-12">
      <div className="max-w-[1140px] mx-auto px-4 md:px-10">
        {/* Reset Notification Toast Banner */}
        {resetNotification && (
          <div className="mb-6 p-4 rounded-xl bg-[#e0f2fe] border-2 border-[#0284c7] text-[#0c4a6e] flex items-center justify-between gap-3 animate-fadeIn shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#0284c7] shrink-0" />
              <div>
                <span className="text-[16px] sm:text-[17px] font-bold block">
                  {resetNotification}
                </span>
                <span className="text-[14px] text-[#0369a1]">
                  원하시는 답변을 다시 선택해 맞춤형 복지 혜택을 새롭게 산출해보세요.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setResetNotification(null)}
              className="p-1.5 rounded-lg text-[#0369a1] hover:text-[#0c4a6e] hover:bg-white/60 transition-all cursor-pointer"
              aria-label="알림 닫기"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Senior Accessibility Toolbar & Guidance Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e0f2fe] text-[#0369a1] text-[13px] sm:text-[13.5px] font-bold shadow-2xs border border-[#bae6fd] transition-colors">
              <Check className="w-3.5 h-3.5 text-[#0284c7]" />
              간편 자격확인 자가진단
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f9ff] text-[#0284c7] text-[13px] sm:text-[13.5px] font-semibold border border-[#bae6fd] transition-colors">
              <CalendarCheck className="w-3.5 h-3.5 text-[#0284c7]" />
              예상 소요시간 약 3분
            </span>
          </div>

          {/* Senior Font-Size Zoom Controls */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white shadow-xs border border-[#bae6fd]">
            <span className="text-[15px] text-[#475569] pl-2 pr-1 flex items-center gap-1 font-semibold">
              글자 크기
            </span>
            <div className="inline-flex rounded-lg bg-[#e0f2fe] p-1 gap-1">
              <button
                type="button"
                onClick={() => setFontScale('normal')}
                className={`px-3 py-1.5 rounded-md text-[15px] font-semibold transition-all cursor-pointer ${
                  fontScale === 'normal'
                    ? 'bg-white text-[#0284c7] shadow-xs font-bold'
                    : 'text-[#475569] hover:text-[#0c4a6e]'
                }`}
              >
                보통
              </button>
              <button
                type="button"
                onClick={() => setFontScale('large')}
                className={`px-3 py-1.5 rounded-md text-[15px] font-semibold transition-all cursor-pointer ${
                  fontScale === 'large'
                    ? 'bg-white text-[#0284c7] shadow-xs font-bold'
                    : 'text-[#475569] hover:text-[#0c4a6e]'
                }`}
              >
                크게
              </button>
              <button
                type="button"
                onClick={() => setFontScale('xlarge')}
                className={`px-3 py-1.5 rounded-md text-[15px] font-semibold transition-all cursor-pointer ${
                  fontScale === 'xlarge'
                    ? 'bg-white text-[#0284c7] shadow-xs font-bold'
                    : 'text-[#475569] hover:text-[#0c4a6e]'
                }`}
              >
                아주 크게
              </button>
            </div>
          </div>
        </div>

        {/* Main Title Block */}
        <div className="space-y-2 mb-8 max-w-3xl">
          <h1 className="text-[32px] sm:text-[38px] md:text-[42px] font-bold font-serif text-[#0c4a6e] tracking-tight leading-tight">
            내가 받을 수 있는 복지 혜택,<br className="hidden sm:inline" />{' '}
            <span className="text-[#0284c7] underline decoration-[#38bdf8] decoration-wavy decoration-3 underline-offset-8">
              3분 만에 간편하게
            </span>{' '}
            확인해보세요
          </h1>
          <p className="text-[19px] sm:text-[21px] text-[#475569] pt-2 leading-relaxed">
            복잡한 서류 없이 어르신도 천천히 하나씩 누르시면 지원 가능한 사업 목록을 바로 안내해 드립니다.
          </p>
        </div>

        {/* Stepper / Progress Bar */}
        <div className="p-5 md:p-7 rounded-3xl bg-white card-elevated mb-8">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0284c7] text-white text-[15px] font-bold shadow-xs">
                {isFinished ? '4' : currentQuestion.step}
              </span>
              <span className="text-[19px] sm:text-[21px] font-bold font-serif text-[#0c4a6e]">
                {isFinished ? '4단계: 복지 혜택 진단 완료' : currentQuestion.stepTitle}
              </span>
            </div>
            <div className="text-[19px] sm:text-[21px] text-[#0284c7] font-bold font-serif">
              <span>{isFinished ? '100%' : currentQuestion.pct}</span> 완료
            </div>
          </div>

          {/* Progress Track */}
          <div className="w-full h-3.5 rounded-full bg-[#e0f2fe] overflow-hidden p-0.5 border border-[#bae6fd]/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0369a1] via-[#0284c7] to-[#38bdf8] transition-all duration-500 ease-out shadow-xs"
              style={{ width: isFinished ? '100%' : currentQuestion.progressWidth }}
            />
          </div>

          {/* Four-Step Milestones */}
          <div className="grid grid-cols-4 gap-2 pt-4 text-center">
            {[
              { num: 1, label: '거주지 확인' },
              { num: 2, label: '연령 확인' },
              { num: 3, label: '소득·가구 상황' },
              { num: 4, label: '결과 확인' },
            ].map((st) => {
              const isActive = isFinished ? true : st.num <= currentStepIndex + 1;
              const isCurrent = isFinished ? st.num === 4 : st.num === currentStepIndex + 1;
              return (
                <div key={st.num} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[14px] sm:text-[15px] font-bold transition-all shadow-xs ${
                      isActive
                        ? isFinished
                          ? 'bg-[#0369a1] text-white'
                          : 'bg-[#0284c7] text-white ring-2 ring-offset-2 ring-[#0284c7]/30'
                        : 'bg-[#e0f2fe] text-[#0369a1]'
                    }`}
                  >
                    {isFinished && st.num < 4 ? <Check className="w-4 h-4" /> : st.num}
                  </div>
                  <span
                    className={`text-[13px] sm:text-[15px] transition-all ${
                      isCurrent
                        ? 'text-[#0284c7] font-bold'
                        : isActive
                        ? 'text-[#0c4a6e] font-semibold'
                        : 'text-[#64748b]'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Interaction Card Container */}
        <div
          id="card-viewport"
          className="relative overflow-hidden rounded-3xl bg-white card-elevated shadow-[0_4px_24px_-4px_rgba(2,132,199,0.08)] transition-all duration-300"
        >
          {/* Top Gradient Accent Bar: Ocean wave */}
          <div className="h-2 w-full bg-gradient-to-r from-[#0369a1] via-[#0284c7] to-[#06b6d4]" />

          <div className="p-6 md:p-10">
            {!isFinished ? (
              /* Question View */
              <div className="space-y-6">
                {/* Category Tag Pill */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0f2fe] text-[#0c4a6e] text-[15px] font-semibold border border-[#bae6fd]">
                    {getIcon(currentQuestion.icon)}
                    <span>{currentQuestion.category}</span>
                  </div>
                  <span className="text-[15px] text-[#64748b]">어르신 눈높이 큰글씨 모드 지원</span>
                </div>

                {/* Main Question Heading */}
                <div className="space-y-2">
                  <h2 className="text-[26px] sm:text-[30px] md:text-[34px] font-bold font-serif text-[#0c4a6e] leading-snug">
                    {currentQuestion.heading}
                  </h2>
                  <p className="text-[19px] sm:text-[21px] text-[#475569] leading-relaxed">
                    {currentQuestion.subheading}
                  </p>
                </div>

                {/* Helpful Tip Box */}
                <div className="flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-[#f0f9ff] border border-[#bae6fd] text-[#1e293b]">
                  <Lightbulb className="w-7 h-7 text-[#0284c7] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-[17px] font-bold text-[#0284c7] block">도움 안내</span>
                    <p className="text-[16px] sm:text-[18px] text-[#334155] leading-relaxed">
                      {currentQuestion.tip}
                    </p>
                  </div>
                </div>

                {/* 3단계 전용: 2026년 주요 복지선정기준(소득인정액) 종합 안내 표 및 카드 */}
                {currentStepIndex === 2 && (
                  <div className="space-y-4 p-5 sm:p-6 rounded-2xl bg-[#f0f9ff] border-2 border-[#bae6fd] shadow-xs animate-fadeIn">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#bae6fd]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#0284c7] text-white flex items-center justify-center font-bold text-[15px] font-serif shrink-0 shadow-xs">
                          2026
                        </div>
                        <div>
                          <h3 className="text-[19px] sm:text-[21px] font-bold font-serif text-[#0c4a6e] flex items-center gap-2">
                            2026년 주요 복지선정기준 (소득인정액)
                          </h3>
                          <p className="text-[14px] sm:text-[15px] text-[#475569]">
                            보건복지부 고시 최신 기준 기준 중위소득 및 가구원수별 소득인정액 상한 기준
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e0f2fe] text-[#0c4a6e] text-[13px] font-bold border border-[#bae6fd] self-start sm:self-auto">
                        <TrendingUp className="w-3.5 h-3.5 text-[#0284c7]" />
                        {MEDIAN_INCOME_2026.increaseRate}
                      </span>
                    </div>

                    {/* 2026 기준 중위소득 요약 바 */}
                    <div className="p-3.5 rounded-xl bg-white border border-[#bae6fd] flex flex-wrap items-center justify-between gap-3 text-[14px] sm:text-[15px] shadow-2xs">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <span className="font-bold text-[#0284c7] bg-[#e0f2fe] px-2.5 py-1 rounded-md text-[13px]">
                          2026 기준 중위소득(100%)
                        </span>
                        <span className="text-[#334155]">
                          1인 가구: <strong className="text-[#0c4a6e]">월 {MEDIAN_INCOME_2026.single}</strong>
                        </span>
                        <span className="text-[#bae6fd] hidden sm:inline">|</span>
                        <span className="text-[#334155]">
                          2인 가구: <strong className="text-[#0c4a6e]">월 {MEDIAN_INCOME_2026.two}</strong>
                        </span>
                        <span className="text-[#bae6fd] hidden md:inline">|</span>
                        <span className="text-[#334155] hidden md:inline">
                          4인 가구: <strong className="text-[#0c4a6e]">월 {MEDIAN_INCOME_2026.four}</strong>
                        </span>
                      </div>
                      <span className="text-[13px] text-[#64748b]">
                        (모든 복지급여 선정의 기본 척도)
                      </span>
                    </div>

                    {/* 사업별 2026 소득인정액 선정기준 그리드 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      {INCOME_CRITERIA_2026.map((criterion) => (
                        <div
                          key={criterion.id}
                          className="p-4 rounded-xl bg-white border border-[#e0f2fe] hover:border-[#0284c7] hover:shadow-xs transition-all flex flex-col justify-between space-y-2.5"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[17px] sm:text-[18px] font-bold font-serif text-[#0c4a6e]">
                                  {criterion.program}
                                </span>
                                <span className="text-[12px] font-medium text-[#0369a1] bg-[#e0f2fe] px-2 py-0.5 rounded border border-[#bae6fd]">
                                  {criterion.category}
                                </span>
                              </div>
                              <span className="text-[12px] font-bold text-[#0c4a6e] bg-[#e0f2fe] px-2.5 py-0.5 rounded-full border border-[#bae6fd] shrink-0">
                                {criterion.badge}
                              </span>
                            </div>

                            {/* 1인/2인 가구 소득인정액 기준액 */}
                            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] my-2">
                              <div>
                                <span className="text-[12px] text-[#64748b] block">단독(1인) 가구</span>
                                <span className="text-[15px] sm:text-[16px] font-bold font-serif text-[#0284c7]">
                                  {criterion.singleHousehold}
                                </span>
                              </div>
                              <div>
                                <span className="text-[12px] text-[#64748b] block">부부(2인) 가구</span>
                                <span className="text-[15px] sm:text-[16px] font-bold font-serif text-[#0c4a6e]">
                                  {criterion.coupleHousehold}
                                </span>
                              </div>
                            </div>

                            <p className="text-[13px] text-[#334155] leading-snug">
                              <strong className="text-[#0284c7]">주요 혜택:</strong> {criterion.keyBenefit}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-[#f0f9ff] flex items-center justify-between text-[12px] text-[#64748b]">
                            <span>{criterion.note}</span>
                            <span className="font-mono text-[#0284c7] font-semibold">2026 확정</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 소득인정액 계산 안내 팁 */}
                    <div className="p-3.5 rounded-xl bg-[#e0f2fe]/80 border border-[#bae6fd] text-[13px] sm:text-[14px] text-[#1e293b] flex items-start gap-2.5 leading-relaxed">
                      <Info className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#0c4a6e]">소득인정액이란?</strong> 실제 통장 월급뿐만 아니라 보유 주택·토지·금융재산을 월 소득으로 환산하고 기본재산공제(농어촌·군 지역 기본공제 약 7,700만원 이상) 및 근로소득 기본공제를 차감하여 계산합니다. 실제 체감 재산보다 소득인정액이 낮게 산정되는 경우가 많으므로 기준에 근접하시거나 정확하지 않으시다면 <strong>'예'</strong>를 선택하여 진단을 이어가시는 것이 권장됩니다.
                      </div>
                    </div>
                  </div>
                )}

                {/* Large Senior-Friendly Tactile Choice Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* YES BUTTON */}
                  <button
                    type="button"
                    onClick={() => handleAnswer(true)}
                    className="group w-full min-h-[84px] p-5 rounded-2xl bg-white hover:bg-[#f0f9ff] border-2 border-[#38bdf8] hover:border-[#0284c7] shadow-xs hover:shadow-md flex items-center justify-between text-left transition-all duration-200 cursor-pointer active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        <CheckCircle2 className="w-8 h-8 text-[#0284c7]" />
                      </div>
                      <div>
                        <span className="block text-[20px] sm:text-[22px] font-bold text-[#0c4a6e] group-hover:text-[#0284c7]">
                          {currentQuestion.optYes.title}
                        </span>
                        <span className="block text-[15px] sm:text-[16px] text-[#475569]">
                          {currentQuestion.optYes.desc}
                        </span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#e0f2fe] text-[#0284c7] shrink-0 group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-5 h-5 text-[#0284c7]" />
                    </div>
                  </button>

                  {/* NO BUTTON */}
                  <button
                    type="button"
                    onClick={() => handleAnswer(false)}
                    className="group w-full min-h-[84px] p-5 rounded-2xl bg-white hover:bg-[#f8fafc] border-2 border-[#cbd5e1] hover:border-[#94a3b8] shadow-xs hover:shadow-sm flex items-center justify-between text-left transition-all duration-200 cursor-pointer active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#f1f5f9] text-[#64748b] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <XCircle className="w-8 h-8 text-[#64748b]" />
                      </div>
                      <div>
                        <span className="block text-[20px] sm:text-[22px] font-bold text-[#334155] group-hover:text-[#0f172a]">
                          {currentQuestion.optNo.title}
                        </span>
                        <span className="block text-[15px] sm:text-[16px] text-[#64748b]">
                          {currentQuestion.optNo.desc}
                        </span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#f1f5f9] text-[#64748b] shrink-0 group-hover:translate-x-1 transition-transform">
                      <ChevronRight className="w-5 h-5 text-[#64748b]" />
                    </div>
                  </button>
                </div>

                {/* Navigation and Reset Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-[#bae6fd]">
                  {currentStepIndex > 0 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#e0f2fe] text-[#0369a1] font-semibold text-[16px] hover:bg-[#bae6fd]/50 border border-[#bae6fd] transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      이전 질문으로 돌아가기
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[#64748b] hover:text-[#0c4a6e] hover:bg-[#e0f2fe] text-[15px] font-medium transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    처음부터 다시하기
                  </button>
                </div>
              </div>
            ) : (
              /* Final Result View */
              <div className="space-y-8 animate-fadeIn">
                {/* Top Reset Alert Bar (자가진단 완료 후 초기화 배너) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#e0f2fe] border-2 border-[#bae6fd] shadow-xs">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <RotateCcw className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="font-bold text-[#0c4a6e] text-[17px] sm:text-[18px] font-serif block">
                        자가진단 완료 후 초기화 기능
                      </span>
                      <span className="text-[14px] sm:text-[15px] text-[#475569]">
                        다른 가족의 조건으로 새로 진단하거나, 답변을 수정하여 다시 추천받으시려면 초기화하세요.
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="h-11 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 hover:from-amber-600 hover:via-orange-600 hover:to-orange-700 text-white text-[15px] sm:text-[16px] font-bold shadow-xs hover:shadow-md flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4 text-white" />
                    조건 초기화 (다시하기)
                  </button>
                </div>

                {/* Result Banner */}
                <div className="p-6 md:p-8 rounded-2xl bg-[#f0f9ff] border border-[#bae6fd] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0f2fe] text-[#0c4a6e] text-[15px] font-bold border border-[#bae6fd]">
                        <Sparkles className="w-4 h-4 text-[#0284c7]" />
                        진단 완료 · 군민 맞춤 혜택 도출
                      </div>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 hover:from-amber-600 hover:via-orange-600 hover:to-orange-700 text-white text-[13px] sm:text-[14px] font-bold shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-white" />
                        조건 초기화
                      </button>
                    </div>
                    <h2 className="text-[26px] sm:text-[30px] font-bold font-serif text-[#0c4a6e] leading-snug">
                      축하합니다!{' '}
                      <span className="text-[#0284c7] underline decoration-[#38bdf8] decoration-2 underline-offset-4">
                        총 {matchedBenefits.length}개 주요 복지 사업
                      </span>
                      의 지원 대상 가능성이 높습니다.
                    </h2>
                    <p className="text-[17px] sm:text-[19px] text-[#475569] leading-relaxed">
                      작성해주신 정보를 기반으로 혜택을 매칭했습니다. 지금 바로 유선 상담이나 인터넷 방문 신청을 진행하실 수 있습니다.
                    </p>
                  </div>

                  <div className="shrink-0 flex flex-col items-center p-5 rounded-2xl bg-white shadow-xs border border-[#bae6fd] text-center min-w-[220px]">
                    <span className="text-[15px] text-[#64748b] font-medium">예상 월 최대 지원환산</span>
                    <span className="text-[32px] sm:text-[36px] text-[#0284c7] font-extrabold font-serif tracking-tight">
                      약 42만원
                    </span>
                    <span className="text-[14px] text-[#0c4a6e] font-semibold bg-[#e0f2fe] px-2.5 py-0.5 rounded-full mt-1 border border-[#bae6fd]">
                      기초연금 + 교통비 등 결합
                    </span>
                  </div>
                </div>

                {/* Welfare Matched Benefits List */}
                <div className="space-y-4">
                  <h3 className="text-[22px] sm:text-[24px] font-bold font-serif text-[#0c4a6e] flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-[#0284c7]" />
                    회원님께 추천하는 맞춤 지원 사업 {matchedBenefits.length}건
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matchedBenefits.map((benefit) => (
                      <div
                        key={benefit.id}
                        className="p-5 md:p-6 rounded-2xl bg-white card-elevated flex flex-col justify-between space-y-4 border border-[#e0f2fe]"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-1 rounded-md bg-[#e0f2fe] text-[#0c4a6e] text-[14px] font-bold border border-[#bae6fd]">
                              {benefit.category}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#f0f9ff] text-[#0284c7] text-[13px] font-bold border border-[#bae6fd]">
                              {benefit.badge}
                            </span>
                          </div>
                          <h4 className="text-[20px] sm:text-[22px] font-bold font-serif text-[#0c4a6e]">
                            {benefit.title}
                          </h4>
                          <p className="text-[16px] sm:text-[17px] text-[#334155] leading-relaxed">
                            {benefit.shortDesc}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#bae6fd]/60 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[14px] text-[#0284c7] font-semibold">
                            신청처: {benefit.department}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onOpenDetailModal(benefit)}
                              className="px-3.5 py-1.5 rounded-xl bg-[#0284c7] text-white text-[14px] font-bold hover:bg-[#0369a1] transition-all cursor-pointer shadow-xs active:scale-95"
                            >
                              상세 안내
                            </button>
                            <button
                              type="button"
                              onClick={() => onBookConsultationForBenefit(benefit.category)}
                              className="px-3.5 py-1.5 rounded-xl bg-[#e0f2fe] text-[#0c4a6e] text-[14px] font-bold hover:bg-[#bae6fd]/70 border border-[#bae6fd] transition-all cursor-pointer active:scale-95"
                            >
                              상담 예약
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diagnosed Answers Summary Box (선택한 답변 내역 요약 및 개별/전체 초기화) */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#f0f9ff] border border-[#bae6fd] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-[17px] font-bold font-serif text-[#0c4a6e]">
                      내가 선택한 자가진단 답변 내역
                    </span>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-[14px] font-bold text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4 text-orange-600" />
                      전체 답변 조건 초기화
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[14px]">
                    <div className="p-3 rounded-xl bg-white border border-[#bae6fd] flex items-center justify-between">
                      <span className="text-[#64748b]">1단계: 관내 주소</span>
                      <span className="font-bold text-[#0c4a6e]">
                        {answers[0] ? '예 (관내 거주)' : '아니오/미확인'}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#bae6fd] flex items-center justify-between">
                      <span className="text-[#64748b]">2단계: 만 65세 이상</span>
                      <span className="font-bold text-[#0c4a6e]">
                        {answers[1] ? '예 (만 65세 이상)' : '아니오 (미만)'}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#bae6fd] flex items-center justify-between">
                      <span className="text-[#64748b]">3단계: 2026 소득인정액</span>
                      <span className="font-bold text-[#0c4a6e]">
                        {answers[2] ? '예 (기준 이하)' : '아니오/미확인'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Senior CTAs */}
                <div className="p-6 md:p-8 rounded-2xl bg-[#e0f2fe] border border-[#bae6fd] flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[20px] font-bold font-serif text-[#0c4a6e] block">
                      인쇄하시거나 자녀분께 결과를 문자로 보내시겠습니까?
                    </span>
                    <p className="text-[16px] text-[#475569]">
                      진단 결과표를 읍·면 사무소에 제출하시면 더 신속하게 접수할 수 있습니다.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="h-12 px-4.5 rounded-xl bg-white text-[#0c4a6e] text-[16px] font-bold hover:bg-[#f0f9ff] border border-[#bae6fd] shadow-xs flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Printer className="w-5 h-5 text-[#0284c7]" />
                      결과 인쇄하기
                    </button>
                    <button
                      type="button"
                      onClick={onOpenSmsModal}
                      className="h-12 px-5 rounded-xl bg-[#0284c7] text-white text-[16px] font-bold hover:bg-[#0369a1] shadow-xs flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-5 h-5 text-white" />
                      문자로 결과 받기
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="h-12 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 hover:from-amber-600 hover:via-orange-600 hover:to-orange-700 text-white text-[16px] font-bold shadow-xs hover:shadow-md flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                    >
                      <RotateCcw className="w-5 h-5 text-white" />
                      조건 초기화 (처음부터 다시하기)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Overview: What Comes Next (Roadmap Section) */}
        <div className="mt-8 p-5 md:p-6 rounded-2xl bg-[#f0f9ff] border border-[#bae6fd] shadow-xs">
          <div className="flex items-center gap-2 pb-2">
            <Info className="w-5 h-5 text-[#0284c7]" />
            <h3 className="text-[19px] sm:text-[21px] font-bold font-serif text-[#0c4a6e]">
              자가진단 4단계 전체 과정 안내
            </h3>
          </div>
          <p className="text-[16px] text-[#475569] pb-4">
            자가진단은 개인정보를 서버에 저장하지 않으며, 군민 여러분의 권익 보호를 위해 즉석에서 알고리즘 판정됩니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-white border border-[#bae6fd] shadow-xs space-y-1">
              <span className="text-[15px] font-bold text-[#0284c7] block">1단계 · 관내 주소</span>
              <p className="text-[15px] text-[#334155] leading-snug">
                양평군 관내 읍·면 거주등록 여부 확인
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#bae6fd] shadow-xs space-y-1">
              <span className="text-[15px] font-bold text-[#0284c7] block">2단계 · 연령 조건</span>
              <p className="text-[15px] text-[#334155] leading-snug">
                만 65세 이상 노인복지법 상 기준 해당 확인
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#bae6fd] shadow-xs space-y-1">
              <span className="text-[15px] font-bold text-[#0284c7] block">3단계 · 소득 및 가구</span>
              <p className="text-[15px] text-[#334155] leading-snug">
                기초연금 수급 또는 가구원 수 대비 소득 파악
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#bae6fd] shadow-xs space-y-1">
              <span className="text-[15px] font-bold text-[#0369a1] block">4단계 · 결과 추천</span>
              <p className="text-[15px] text-[#334155] leading-snug">
                즉시 수혜 가능한 4대 지원제도 안내서 출력
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
