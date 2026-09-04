import React from 'react';
import { X, Phone, Building2, CheckCircle, FileText, Send, Calendar } from 'lucide-react';
import { WelfareBenefit } from '../types';

interface ServiceDetailModalProps {
  benefit: WelfareBenefit | null;
  onClose: () => void;
  onBookConsultation: (topic: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  benefit,
  onClose,
  onBookConsultation,
}) => {
  if (!benefit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/40 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-[#bae6fd] p-6 md:p-8 space-y-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#64748b] hover:bg-[#e0f2fe] transition-all cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-6 h-6 text-[#0369a1]" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-[#e0f2fe] text-[#0c4a6e] text-[14px] font-bold border border-[#bae6fd]">
              {benefit.category}
            </span>
            <span className="px-3 py-0.5 rounded-full bg-[#f0f9ff] text-[#0284c7] text-[13px] font-bold border border-[#bae6fd]">
              {benefit.badge}
            </span>
          </div>
          <h3 className="text-[24px] sm:text-[28px] font-bold font-serif text-[#0c4a6e]">
            {benefit.title}
          </h3>
          <p className="text-[17px] text-[#475569]">{benefit.shortDesc}</p>
        </div>

        {/* Quick Highlights Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#e0f2fe]/60 border border-[#bae6fd]">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-[#0284c7] shrink-0" />
            <div>
              <span className="text-[13px] text-[#64748b] block">담당부서</span>
              <span className="text-[15px] font-bold text-[#0c4a6e]">{benefit.department}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-5 h-5 text-[#0284c7] shrink-0" />
            <div>
              <span className="text-[13px] text-[#64748b] block">직통 전화</span>
              <a
                href={`tel:${benefit.phone}`}
                className="text-[15px] font-bold text-[#0284c7] hover:underline"
              >
                {benefit.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-4">
          {/* Target */}
          <div className="space-y-1.5">
            <h4 className="text-[17px] font-bold font-serif text-[#0c4a6e] flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#0284c7]" />
              지원 대상 및 자격
            </h4>
            <p className="text-[15px] text-[#334155] bg-[#f8fafc] p-3 rounded-xl border border-[#e2e8f0]">
              {benefit.target}
            </p>
          </div>

          {/* Benefit Content */}
          <div className="space-y-1.5">
            <h4 className="text-[17px] font-bold font-serif text-[#0c4a6e] flex items-center gap-1.5">
              <Send className="w-4 h-4 text-[#0284c7]" />
              지원 내용 및 혜택
            </h4>
            <p className="text-[15px] text-[#334155] bg-[#f8fafc] p-3 rounded-xl border border-[#e2e8f0]">
              {benefit.content}
            </p>
          </div>

          {/* Requirements */}
          <div className="space-y-1.5">
            <h4 className="text-[17px] font-bold font-serif text-[#0c4a6e] flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0284c7]" />
              선정 기준 세부사항
            </h4>
            <ul className="list-disc list-inside space-y-1 text-[15px] text-[#334155] bg-[#f8fafc] p-3 rounded-xl border border-[#e2e8f0]">
              {benefit.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>

          {/* Documents */}
          <div className="space-y-1.5">
            <h4 className="text-[17px] font-bold font-serif text-[#0c4a6e] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#0284c7]" />
              구비 서류 안내
            </h4>
            <ul className="list-disc list-inside space-y-1 text-[15px] text-[#334155] bg-[#f8fafc] p-3 rounded-xl border border-[#e2e8f0]">
              {benefit.documents.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </div>

          {/* How to apply */}
          <div className="space-y-1.5">
            <h4 className="text-[17px] font-bold font-serif text-[#0c4a6e] flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#0284c7]" />
              신청 방법 및 절차
            </h4>
            <p className="text-[15px] text-[#334155] bg-[#f8fafc] p-3 rounded-xl border border-[#e2e8f0]">
              {benefit.howToApply}
            </p>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="pt-4 border-t border-[#bae6fd] flex flex-wrap items-center justify-end gap-3">
          <a
            href={`tel:${benefit.phone}`}
            className="h-12 px-4.5 rounded-xl bg-white border border-[#bae6fd] hover:bg-[#f0f9ff] text-[#0c4a6e] text-[15px] font-bold flex items-center gap-2 transition-all"
          >
            <Phone className="w-4 h-4 text-[#0284c7]" />
            담당부서 전화 문의 ({benefit.phone})
          </a>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookConsultation(benefit.category);
            }}
            className="h-12 px-5 rounded-xl bg-[#0284c7] text-white text-[15px] font-bold hover:bg-[#0369a1] shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            이 사업 상담 예약하기
          </button>
        </div>
      </div>
    </div>
  );
};
