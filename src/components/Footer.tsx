import React from 'react';
import { Landmark, Phone, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#f0f9ff]/90 border-t border-[#bae6fd] py-12 mt-16 text-[#475569] no-print">
      <div className="max-w-[1140px] mx-auto px-4 md:px-10 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#bae6fd]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0284c7] text-white flex items-center justify-center shadow-xs">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[17px] font-bold font-serif text-[#0c4a6e] block">
                양평군청 복지기획과 어르신맞춤지원팀
              </span>
              <span className="text-[14px] text-[#475569]">
                군민 모두가 차별 없이 누리는 따뜻한 복지 공동체
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[14px]">
            <span className="inline-flex items-center gap-1.5 text-[#0284c7] font-bold">
              <Phone className="w-4 h-4" /> 군청 대표: 031-770-2000
            </span>
            <span className="text-[#bae6fd]">|</span>
            <span className="inline-flex items-center gap-1 text-[#0c4a6e] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#0284c7]" /> 개인정보처리방침
            </span>
            <span className="text-[#bae6fd]">|</span>
            <span className="hover:underline cursor-pointer text-[#475569]">이용약관</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 text-[14px] leading-relaxed">
          <div className="space-y-1">
            <p>
              (우 12538) 경기도 양평군 양평읍 군청앞길 2 양평군청 본관 2층 복지기획과
            </p>
            <p>
              보건복지상담 헬프라인: 국번없이 <strong className="text-[#0c4a6e]">129</strong> (365일 24시간) | 양평군청 복지기획과: <strong className="text-[#0c4a6e]">031-770-2260</strong>
            </p>
            <p className="text-[13px] text-[#64748b] pt-1">
              본 포털은 어르신 및 디지털 취약계층의 정보 접근성을 위해 큰글씨와 음성 안내(TTS) 기술을 지원합니다.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end justify-between">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e0f2fe] text-[#0c4a6e] text-[13px] font-semibold border border-[#bae6fd]">
              <Heart className="w-3.5 h-3.5 text-[#0284c7]" />
              어르신 배려 큰글씨 모드 적용 포털
            </div>
            <p className="text-[13px] text-[#64748b] pt-2">
              © Yangpyeong County Civic Welfare Portal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
