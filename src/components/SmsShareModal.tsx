import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface SmsShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmsShareModal: React.FC<SmsShareModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setPhoneNumber('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/40 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#bae6fd] p-6 md:p-8 space-y-5">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#64748b] hover:bg-[#e0f2fe] transition-all cursor-pointer"
        >
          <X className="w-5 h-5 text-[#0369a1]" />
        </button>

        <div className="text-center space-y-1.5">
          <div className="w-12 h-12 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center mx-auto mb-2 border border-[#bae6fd]">
            <MessageSquare className="w-6 h-6 text-[#0284c7]" />
          </div>
          <h3 className="text-[22px] font-bold font-serif text-[#0c4a6e]">문자로 결과 받기</h3>
          <p className="text-[15px] text-[#475569]">
            받으실 휴대전화 번호를 입력하시면 자가진단 결과와 신청 안내 링크를 문자로 보내드립니다.
          </p>
        </div>

        {isSent ? (
          <div className="p-6 rounded-xl bg-[#f0f9ff] border border-[#bae6fd] text-center space-y-2 animate-fadeIn">
            <CheckCircle2 className="w-10 h-10 text-[#0284c7] mx-auto" />
            <span className="text-[17px] font-bold font-serif text-[#0c4a6e] block">
              문자(알림톡) 전송이 완료되었습니다!
            </span>
            <p className="text-[14px] text-[#475569]">
              잠시 후 입력하신 휴대전화로 결과 안내 문자가 도착합니다.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label htmlFor="sms-phone" className="block text-[15px] font-bold text-[#0c4a6e] mb-1">
                휴대전화 번호
              </label>
              <input
                id="sms-phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full p-3.5 rounded-xl border border-[#bae6fd] bg-[#f8fafc] text-[18px] text-[#0f172a] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={!phoneNumber.trim()}
              className="w-full h-12 rounded-xl bg-[#0284c7] text-white text-[16px] font-bold hover:bg-[#0369a1] disabled:opacity-50 disabled:cursor-not-allowed shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              문자 전송하기
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
