import React from 'react';
import { X, CheckCircle2, Phone, Calendar, Clock, User, Hash } from 'lucide-react';
import { ConsultationBooking } from '../types';

interface ConsultationConfirmModalProps {
  booking: ConsultationBooking | null;
  onClose: () => void;
  pastBookings?: ConsultationBooking[];
}

export const ConsultationConfirmModal: React.FC<ConsultationConfirmModalProps> = ({
  booking,
  onClose,
  pastBookings = [],
}) => {
  if (!booking && pastBookings.length === 0) return null;

  const currentItem = booking || pastBookings[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/40 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#bae6fd] p-6 md:p-8 space-y-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#64748b] hover:bg-[#e0f2fe] transition-all cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-6 h-6 text-[#0369a1]" />
        </button>

        {/* Confirmation Icon & Title */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-16 h-16 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center mx-auto shadow-xs border border-[#bae6fd]">
            <CheckCircle2 className="w-10 h-10 text-[#0284c7]" />
          </div>
          <h3 className="text-[24px] sm:text-[26px] font-bold font-serif text-[#0c4a6e]">
            {booking ? '전화상담 예약이 접수되었습니다' : '나의 상담 예약 내역'}
          </h3>
          <p className="text-[16px] text-[#475569]">
            {booking
              ? '담당 복지 공무원이 선택하신 시간대에 친절하게 연락드리겠습니다.'
              : '현재 접수되어 배정 진행 중인 상담 내역입니다.'}
          </p>
        </div>

        {/* Receipt Card */}
        <div className="p-5 rounded-xl bg-[#f0f9ff] border border-[#bae6fd] space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#bae6fd]">
            <div className="flex items-center gap-1.5 text-[15px] font-semibold text-[#0284c7]">
              <Hash className="w-4 h-4" />
              접수 번호
            </div>
            <span className="text-[16px] font-mono font-bold text-[#0284c7]">
              {currentItem.id}
            </span>
          </div>

          <div className="space-y-2.5 text-[15px]">
            <div className="flex items-center justify-between">
              <span className="text-[#64748b] flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#0284c7]" /> 신청인
              </span>
              <span className="font-bold text-[#0c4a6e]">{currentItem.name}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#64748b] flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#0284c7]" /> 연락처
              </span>
              <span className="font-bold text-[#0c4a6e]">{currentItem.phone}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#64748b] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#0284c7]" /> 상담 분야
              </span>
              <span className="font-bold text-[#0284c7]">{currentItem.topic}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#64748b] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#0284c7]" /> 희망 시간대
              </span>
              <span className="font-bold text-[#0c4a6e]">{currentItem.timeSlot}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#bae6fd]">
              <span className="text-[#64748b]">접수 상태</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#e0f2fe] text-[#0c4a6e] text-[13px] font-bold border border-[#bae6fd]">
                {currentItem.status}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Help Note */}
        <div className="p-3.5 rounded-xl bg-[#e0f2fe]/50 border border-[#bae6fd] text-[14px] text-[#334155] leading-relaxed">
          💡 긴급한 생계 위기나 질환 상담은 양평군청 복지조사팀(<strong>031-770-2260</strong>) 또는 국번없이 <strong>129</strong>로 즉시 전화하시면 바로 통화하실 수 있습니다.
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full h-13 rounded-xl bg-[#0284c7] text-white text-[17px] font-bold hover:bg-[#0369a1] shadow-xs transition-all cursor-pointer"
        >
          확인
        </button>
      </div>
    </div>
  );
};
