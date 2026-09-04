import React from 'react';
import { Phone, Volume2, VolumeX, Type, Landmark, PhoneCall, User, Sparkles } from 'lucide-react';
import { FontScale, FontPreset } from '../types';

interface HeaderProps {
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
  fontPreset: FontPreset;
  setFontPreset: (preset: FontPreset) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  isSpeaking: boolean;
  toggleTts: () => void;
  onOpenMyStatus: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  fontScale,
  setFontScale,
  fontPreset,
  setFontPreset,
  activeSection,
  setActiveSection,
  isSpeaking,
  toggleTts,
  onOpenMyStatus,
}) => {
  const scrollTo = (id: string, secName: string) => {
    setActiveSection(secName);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFontScaleQuick = () => {
    if (fontScale === 'normal') setFontScale('large');
    else if (fontScale === 'large') setFontScale('xlarge');
    else setFontScale('normal');
  };

  const cycleFontPreset = () => {
    const presets: FontPreset[] = ['lineseed', 'suit', 'paperlogy', 'pretendard'];
    const nextIdx = (presets.indexOf(fontPreset) + 1) % presets.length;
    setFontPreset(presets[nextIdx]);
  };

  const getFontPresetName = (preset: FontPreset) => {
    switch (preset) {
      case 'lineseed':
        return '라인시드 (세련미)';
      case 'suit':
        return '수트 (모던핀테크)';
      case 'paperlogy':
        return '페이퍼로지 (지오메트릭)';
      case 'pretendard':
        return '프리텐다드 (기본)';
      default:
        return '라인시드';
    }
  };

  return (
    <>
      {/* Top Municipal Bar */}
      <div className="w-full bg-[#0c4a6e] py-2 px-4 md:px-10 border-b border-[#0369a1] text-white">
        <div className="max-w-[1140px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-[#38bdf8]" />
            <span className="text-[14px] sm:text-[15px] font-semibold text-[#f0f9ff]">
              양평군청 복지기획과 공식 포털
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:129"
              className="flex items-center gap-1.5 text-[#bae6fd] hover:text-white text-[14px] sm:text-[15px] font-semibold transition-colors"
              title="보건복지상담센터 129 전화걸기"
            >
              <Phone className="w-4 h-4 text-[#38bdf8]" />
              <span>
                복지상담 헬프라인: <strong className="font-bold text-white underline underline-offset-2">국번없이 129</strong>
              </span>
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={cycleFontPreset}
                className="px-2.5 py-1 rounded-lg bg-[#075985]/80 hover:bg-[#0369a1] text-white text-[13px] sm:text-[14px] font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer border border-[#38bdf8]/40 active:scale-95"
                title="클릭하여 세련된 웹폰트 테마를 변경합니다"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#fde047]" />
                <span>폰트: {getFontPresetName(fontPreset)}</span>
              </button>

              <button
                type="button"
                onClick={toggleFontScaleQuick}
                className="px-2.5 py-1 rounded-lg bg-[#075985]/80 hover:bg-[#0369a1] text-white text-[13px] sm:text-[14px] font-semibold shadow-xs transition-all flex items-center gap-1 cursor-pointer border border-[#38bdf8]/40"
                title="글자 크기 변경"
              >
                <Type className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>큰글씨 {fontScale === 'xlarge' ? '(최대)' : fontScale === 'large' ? '(큼)' : ''}</span>
              </button>

              <button
                type="button"
                onClick={toggleTts}
                className={`px-2.5 py-1 rounded-lg text-[13px] sm:text-[14px] font-semibold shadow-xs transition-all flex items-center gap-1 cursor-pointer border ${
                  isSpeaking
                    ? 'bg-[#0284c7] text-white border-[#38bdf8] animate-pulse'
                    : 'bg-[#075985]/80 text-white border-[#38bdf8]/40 hover:bg-[#0369a1]'
                }`}
                title={isSpeaking ? "음성 안내 중지" : "음성 안내 듣기"}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-white" />
                    <span>음성중지</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>음성안내</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 w-full z-40 bg-[#f0f9ff]/90 backdrop-blur-xl shadow-[0_2px_14px_-4px_rgba(2,132,199,0.08)] border-b border-[#bae6fd]/90 transition-all">
        <div className="h-16 md:h-20 max-w-[1140px] mx-auto px-4 md:px-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo('top', 'self-diagnosis')}
              className="text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0284c7]/30 rounded-full transition-transform active:scale-95"
            >
              <div className="px-3.5 py-1.5 md:px-4 md:py-2 rounded-full bg-[#e0f2fe] text-[#0c4a6e] font-bold text-[15px] md:text-[17px] hover:bg-[#bae6fd]/70 transition-all shadow-2xs flex items-center gap-2 border border-[#bae6fd]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] animate-pulse"></span>
                <span className="font-serif font-bold tracking-tight">양평군민 맞춤복지 서비스</span>
              </div>
            </button>
          </div>

          <nav className="hidden md:flex items-center p-1 rounded-2xl bg-[#e0f2fe]/70 border border-[#bae6fd]/60">
            <button
              type="button"
              onClick={() => scrollTo('top', 'self-diagnosis')}
              className={`px-4 py-2 rounded-xl text-[16px] lg:text-[17px] transition-all cursor-pointer ${
                activeSection === 'self-diagnosis'
                  ? 'bg-[#0284c7] text-white font-bold shadow-xs'
                  : 'text-[#0369a1] hover:bg-white/80 hover:text-[#0c4a6e] font-semibold'
              }`}
            >
              자가진단 안내
            </button>

            <button
              type="button"
              onClick={() => scrollTo('customized-welfare-section', 'welfare-services')}
              className={`px-4 py-2 rounded-xl text-[16px] lg:text-[17px] transition-all cursor-pointer ${
                activeSection === 'welfare-services'
                  ? 'bg-[#0284c7] text-white font-bold shadow-xs'
                  : 'text-[#0369a1] hover:bg-white/80 hover:text-[#0c4a6e] font-semibold'
              }`}
            >
              맞춤 복지서비스
            </button>

            <button
              type="button"
              onClick={() => scrollTo('phone-consultation-section', 'consultation')}
              className={`px-4 py-2 rounded-xl text-[16px] lg:text-[17px] transition-all cursor-pointer ${
                activeSection === 'consultation'
                  ? 'bg-[#0284c7] text-white font-bold shadow-xs'
                  : 'text-[#0369a1] hover:bg-white/80 hover:text-[#0c4a6e] font-semibold'
              }`}
            >
              전화 상담 신청
            </button>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="tel:129"
              className="hidden sm:inline-flex items-center justify-center h-10 md:h-11 px-4 rounded-xl bg-[#0284c7] text-white text-[15px] md:text-[16px] font-bold hover:bg-[#0369a1] transition-all shadow-xs cursor-pointer active:scale-95"
              title="129 긴급복지 상담전화 연결"
            >
              <PhoneCall className="w-4 h-4 mr-1.5" />
              129 전화연결
            </a>

            <button
              type="button"
              onClick={onOpenMyStatus}
              className="w-10 h-10 rounded-full bg-[#0284c7] text-white flex items-center justify-center hover:bg-[#0369a1] transition-all shadow-xs cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-[#0284c7] active:scale-95"
              title="나의 상담 신청 내역 보기"
            >
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
