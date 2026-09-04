import React, { useState } from 'react';
import { LayoutGrid, Search, CheckSquare } from 'lucide-react';
import { WelfareBenefit } from '../types';
import { WELFARE_SERVICES } from '../data/welfareData';

interface WelfareServicesProps {
  onOpenDetailModal: (benefit: WelfareBenefit) => void;
  onJumpToSelfDiagnosis: () => void;
}

const CATEGORIES = [
  '전체',
  '소득·생계지원',
  '돌보·동행',
  '일자리·사회활동',
  '교통·이동지원',
  '주거·에너지',
  '의료·건강지원',
];

export const WelfareServices: React.FC<WelfareServicesProps> = ({
  onOpenDetailModal,
  onJumpToSelfDiagnosis,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredServices = WELFARE_SERVICES.filter((item) => {
    const matchesCategory =
      selectedCategory === '전체' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="customized-welfare-section"
      className="w-full mt-12 pt-10 border-t border-[#bae6fd]"
    >
      <div className="max-w-[1140px] mx-auto px-4 md:px-10 space-y-6">
        {/* Header Box */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 rounded-3xl bg-[#f0f9ff] border border-[#bae6fd] shadow-xs">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e0f2fe] text-[#0c4a6e] text-[14px] sm:text-[15px] font-bold border border-[#bae6fd]">
              <LayoutGrid className="w-4 h-4 text-[#0284c7]" />
              우리 군 전체 복지서비스 한눈에 보기
            </div>
            <h2 className="text-[28px] sm:text-[34px] font-bold font-serif text-[#0c4a6e] tracking-tight">
              군민을 위한 맞춤형 복지서비스 안내
            </h2>
            <p className="text-[17px] sm:text-[19px] text-[#475569] leading-relaxed">
              분야별 대표 지원사업을 확인하시고 원하시는 서비스의 자격 요건과 신청 방법을 편리하게 확인하세요.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onJumpToSelfDiagnosis}
              className="h-12 md:h-13 px-5 rounded-2xl bg-[#0284c7] text-white text-[16px] sm:text-[17px] font-bold hover:bg-[#0369a1] shadow-xs flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <CheckSquare className="w-5 h-5 text-white" />
              간편 자격확인 자가진단
            </button>
          </div>
        </div>

        {/* Filter Chips & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[14px] sm:text-[15px] font-semibold transition-all cursor-pointer border active:scale-95 ${
                  selectedCategory === cat
                    ? 'bg-[#0284c7] text-white border-[#0284c7] shadow-xs'
                    : 'bg-white text-[#475569] border-[#bae6fd] hover:bg-[#f0f9ff] hover:text-[#0c4a6e]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-[#0284c7] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="지원 사업 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-[15px] rounded-xl border border-[#bae6fd] bg-white text-[#0f172a] placeholder:text-[#64748b] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/25 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="p-6 md:p-7 rounded-3xl bg-white card-elevated border border-[#e0f2fe] space-y-3.5 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-[#e0f2fe] text-[#0c4a6e] text-[14px] font-bold border border-[#bae6fd]">
                    {service.category}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-[#f0f9ff] text-[#0284c7] text-[13px] font-bold border border-[#bae6fd]">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-[21px] sm:text-[23px] font-bold font-serif text-[#0c4a6e]">
                  {service.title}
                </h3>
                <p className="text-[16px] sm:text-[17px] text-[#334155] leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#bae6fd]/60 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[14px] sm:text-[15px] text-[#0284c7] font-semibold">
                  문의: {service.department}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenDetailModal(service)}
                    className="px-3.5 py-2 rounded-xl bg-[#e0f2fe] text-[#0c4a6e] text-[14px] font-bold hover:bg-[#bae6fd]/70 border border-[#bae6fd] transition-all cursor-pointer active:scale-95"
                  >
                    상세 안내
                  </button>
                  <button
                    type="button"
                    onClick={onJumpToSelfDiagnosis}
                    className="px-3.5 py-2 rounded-xl bg-[#0284c7] text-white text-[14px] font-bold hover:bg-[#0369a1] transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    자가진단 하기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
