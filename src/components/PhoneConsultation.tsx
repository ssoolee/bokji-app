import React, { useState } from 'react';
import {
  CalendarDays,
  PhoneCall,
  PhoneForwarded,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { CONSULTATION_TOPICS, TIME_SLOTS } from '../data/welfareData';
import { ConsultationBooking } from '../types';

interface PhoneConsultationProps {
  onSuccessSubmit: (booking: ConsultationBooking) => void;
  preselectedTopic?: string;
}

export const PhoneConsultation: React.FC<PhoneConsultationProps> = ({
  onSuccessSubmit,
  preselectedTopic,
}) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [topic, setTopic] = useState<string>(preselectedTopic || 'income');
  const [timeSlot, setTimeSlot] = useState<string>('am');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const formatPhoneNumber = (val: string) => {
    const raw = val.replace(/[^0-9]/g, '');
    if (raw.length <= 3) return raw;
    if (raw.length <= 7) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
    return `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('신청인 성함을 입력해 주세요.');
      return;
    }
    if (!phone.trim() || phone.length < 11) {
      setErrorMessage('올바른 연락처(10~11자리)를 입력해 주세요.');
      return;
    }

    const selectedTopicObj = CONSULTATION_TOPICS.find((t) => t.value === topic);
    const selectedTimeObj = TIME_SLOTS.find((s) => s.value === timeSlot);

    const newBooking: ConsultationBooking = {
      id: `YP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      phone: phone.trim(),
      topic: selectedTopicObj ? selectedTopicObj.label : topic,
      timeSlot: selectedTimeObj ? selectedTimeObj.label : timeSlot,
      submittedAt: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: '접수완료',
    };

    onSuccessSubmit(newBooking);
    setName('');
    setPhone('');
    setErrorMessage('');
  };

  return (
    <section
      id="phone-consultation-section"
      className="w-full mt-12 pt-10 border-t border-[#bae6fd]"
    >
      <div className="max-w-[1140px] mx-auto px-4 md:px-10 space-y-6">
        {/* Header Box */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#f0f9ff] border border-[#bae6fd] shadow-xs">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e0f2fe] text-[#0c4a6e] text-[14px] sm:text-[15px] font-bold mb-2 border border-[#bae6fd]">
            <PhoneCall className="w-4 h-4 text-[#0284c7]" />
            군민 맞춤 유선 복지상담
          </div>
          <h2 className="text-[28px] sm:text-[34px] font-bold font-serif text-[#0c4a6e] tracking-tight flex items-center gap-2">
            <span>📞</span> 찾아가는 군민 전화상담 간편 신청
          </h2>
          <p className="text-[17px] sm:text-[19px] text-[#475569] pt-2 leading-relaxed">
            글씨가 작아 작성이 어려우거나 컴퓨터 사용이 서투른 어르신도 안심하세요. 성함과 연락처만 남겨주시면 전담 사회복지 공무원이 직접 전화드려 친절히 상담해 드립니다.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 rounded-3xl bg-white card-elevated border border-[#e0f2fe] space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-[#bae6fd]">
                <CalendarDays className="w-7 h-7 text-[#0284c7]" />
                <h3 className="text-[22px] sm:text-[24px] font-bold font-serif text-[#0c4a6e]">
                  간편 전화상담 예약 신청서
                </h3>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-red-50 text-red-700 text-[15px] font-semibold flex items-center gap-2 border border-red-200 animate-shake">
                  <span>⚠️ {errorMessage}</span>
                </div>
              )}

              {/* Name Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="consult-name"
                  className="block text-[17px] sm:text-[18px] font-bold text-[#0c4a6e]"
                >
                  1. 신청인 성함{' '}
                  <span className="text-[#0284c7] text-[15px] font-normal">
                    (어르신 또는 대리 가족)
                  </span>
                </label>
                <input
                  id="consult-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="예: 홍길동"
                  className="w-full p-3.5 rounded-2xl border border-[#bae6fd] bg-[#f8fafc] text-[17px] sm:text-[18px] text-[#0f172a] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/25 transition-all placeholder:text-[#64748b]"
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="consult-tel"
                  className="block text-[17px] sm:text-[18px] font-bold text-[#0c4a6e]"
                >
                  2. 연락처{' '}
                  <span className="text-[#0284c7] text-[15px] font-normal">
                    (전화받으실 번호)
                  </span>
                </label>
                <input
                  id="consult-tel"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="010-0000-0000"
                  maxLength={13}
                  className="w-full p-3.5 rounded-2xl border border-[#bae6fd] bg-[#f8fafc] text-[19px] sm:text-[20px] font-bold font-serif text-[#0284c7] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/25 tracking-wider transition-all placeholder:text-[#64748b]"
                />
              </div>

              {/* Topic Radios */}
              <div className="space-y-2">
                <label className="block text-[17px] sm:text-[18px] font-bold text-[#0c4a6e]">
                  3. 희망 상담 분야{' '}
                  <span className="text-[#475569] font-normal text-[15px]">
                    (원하시는 지원제도)
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CONSULTATION_TOPICS.map((item) => {
                    const isChecked = topic === item.value;
                    return (
                      <label
                        key={item.value}
                        className={`flex items-center gap-2.5 p-3 rounded-2xl cursor-pointer text-[14px] sm:text-[15px] font-medium transition-all border active:scale-98 ${
                          isChecked
                            ? 'bg-[#e0f2fe] text-[#0c4a6e] border-[#0284c7] font-bold shadow-xs'
                            : 'bg-[#f8fafc] text-[#334155] border-[#bae6fd]/60 hover:bg-[#e0f2fe]/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="consult-topic"
                          value={item.value}
                          checked={isChecked}
                          onChange={(e) => setTopic(e.target.value)}
                          className="w-4 h-4 text-[#0284c7] focus:ring-[#0284c7]"
                        />
                        <span>{item.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Time */}
              <div className="space-y-2">
                <label className="block text-[17px] sm:text-[18px] font-bold text-[#0c4a6e]">
                  4. 통화 편한 시간대
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isChecked = timeSlot === slot.value;
                    return (
                      <label
                        key={slot.value}
                        className={`flex items-center gap-2.5 p-3 rounded-2xl cursor-pointer text-[14px] sm:text-[15px] font-medium transition-all border active:scale-98 ${
                          isChecked
                            ? 'bg-[#e0f2fe] text-[#0c4a6e] border-[#0284c7] font-bold shadow-xs'
                            : 'bg-[#f8fafc] text-[#334155] border-[#bae6fd]/60 hover:bg-[#e0f2fe]/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="consult-time"
                          value={slot.value}
                          checked={isChecked}
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="w-4 h-4 text-[#0284c7] focus:ring-[#0284c7]"
                        />
                        <span>{slot.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full min-h-[60px] py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-[#0369a1] hover:to-[#075985] text-white text-[19px] sm:text-[21px] font-bold flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.985] cursor-pointer"
              >
                <PhoneForwarded className="w-6 h-6 text-white" />
                <span>전화상담 신청하기 (무료 접수)</span>
              </button>
              <p className="text-[14px] text-[#64748b] text-center pt-2">
                신청 즉시 담당 복지 플래너에게 접수 번호가 전달됩니다.
              </p>
            </div>
          </form>

          {/* Right Column: Immediate Connection & Direct Numbers */}
          <div className="space-y-5 flex flex-col justify-between">
            {/* Direct Call Box 1: Yangpyeong County Welfare Team */}
            <div className="p-6 md:p-8 rounded-3xl bg-white card-elevated border border-[#e0f2fe] space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#e0f2fe] text-[#0c4a6e] text-[13px] sm:text-[14px] font-bold border border-[#bae6fd]">
                  군청 직통 상담실
                </span>
                <span className="text-[13px] sm:text-[14px] text-[#0284c7] font-bold">통화료 무료</span>
              </div>
              <h3 className="text-[24px] sm:text-[26px] font-bold font-serif text-[#0c4a6e]">
                양평군청 복지조사팀장
              </h3>
              <div className="text-[32px] sm:text-[36px] text-[#0284c7] font-extrabold font-serif tracking-tight">
                031-770-2260
              </div>
              <p className="text-[15px] sm:text-[16px] text-[#475569] leading-relaxed">
                어르신 복지사업 전담 공무원과 바로 통화하시려면 아래 버튼을 눌러주세요.
              </p>
              <a
                href="tel:031-770-2260"
                className="w-full h-13 sm:h-14 rounded-2xl bg-[#0284c7] text-white text-[17px] sm:text-[18px] font-bold flex items-center justify-center gap-2 hover:bg-[#0369a1] shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <PhoneCall className="w-5 h-5 text-white" />
                즉시 통화 연결하기
              </a>
            </div>

            {/* Direct Call Box 2: Emergency 129 */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#f0f9ff] border border-[#bae6fd] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#e0f2fe] text-[#0c4a6e] text-[13px] sm:text-[14px] font-bold border border-[#bae6fd]">
                  보건복지부 콜센터
                </span>
                <span className="text-[13px] sm:text-[14px] text-[#64748b] font-bold">365일 24시간 운영</span>
              </div>
              <h4 className="text-[22px] sm:text-[24px] font-bold font-serif text-[#0c4a6e]">
                전국 긴급복지 상담전화
              </h4>
              <div className="text-[28px] sm:text-[32px] text-[#0c4a6e] font-extrabold font-serif">
                국번없이 129
              </div>
              <p className="text-[15px] sm:text-[16px] text-[#475569] leading-relaxed">
                야간 및 공휴일 긴급 위기가구 지원, 기초생활보장 긴급 상담이 가능합니다.
              </p>
              <a
                href="tel:129"
                className="w-full h-12 sm:h-13 rounded-2xl bg-white text-[#0284c7] border-2 border-[#0284c7] hover:bg-[#f0f9ff] text-[16px] sm:text-[17px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <PhoneCall className="w-5 h-5 text-[#0284c7]" />
                129 긴급상담 연결
              </a>
            </div>

            {/* Operating Hours & Privacy Notice */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#f0f9ff]/80 border border-[#bae6fd] shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-[16px] sm:text-[17px] font-bold font-serif text-[#0c4a6e]">
                <Clock className="w-5 h-5 text-[#0284c7]" />
                상담 창구 운영 안내
              </div>
              <ul className="space-y-1 text-[14px] sm:text-[15px] text-[#475569]">
                <li>
                  • <strong>평일:</strong> 오전 09:00 ~ 오후 18:00 (점심시간 12:00 ~ 13:00)
                </li>
                <li>
                  • <strong>주말·공휴일:</strong> 온라인 예약 접수 후 평일 오전 우선 연락
                </li>
              </ul>
              <div className="pt-2 flex items-start gap-2 text-[#475569] text-[13px] sm:text-[14px] border-t border-[#bae6fd] mt-2">
                <ShieldCheck className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                <span>
                  본 신청 정보는 군 복지 상담 목적 외에는 절대 사용되지 않으며 안전하게 보호됩니다.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
