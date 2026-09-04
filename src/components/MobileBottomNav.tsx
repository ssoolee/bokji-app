import React from 'react';
import { CheckSquare, LayoutGrid, PhoneCall } from 'lucide-react';

interface MobileBottomNavProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  setActiveSection,
}) => {
  const handleNav = (id: string, secName: string) => {
    setActiveSection(secName);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="mobile-bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#f0f9ff]/90 backdrop-blur-xl border-t border-[#bae6fd]/90 shadow-[0_-4px_20px_rgba(2,132,199,0.08)] md:hidden flex justify-around items-center py-2 px-3 no-print"
    >
      <button
        type="button"
        onClick={() => handleNav('top', 'self-diagnosis')}
        className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all cursor-pointer active:scale-95 ${
          activeSection === 'self-diagnosis'
            ? 'text-[#0284c7] font-bold bg-[#e0f2fe]/80 shadow-2xs'
            : 'text-[#64748b] hover:text-[#0c4a6e]'
        }`}
      >
        <CheckSquare className="w-5 h-5" />
        <span className="text-[12px] font-semibold leading-tight mt-1">자가진단</span>
      </button>

      <button
        type="button"
        onClick={() => handleNav('customized-welfare-section', 'welfare-services')}
        className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all cursor-pointer active:scale-95 ${
          activeSection === 'welfare-services'
            ? 'text-[#0284c7] font-bold bg-[#e0f2fe]/80 shadow-2xs'
            : 'text-[#64748b] hover:text-[#0c4a6e]'
        }`}
      >
        <LayoutGrid className="w-5 h-5" />
        <span className="text-[12px] font-semibold leading-tight mt-1">맞춤 복지</span>
      </button>

      <button
        type="button"
        onClick={() => handleNav('phone-consultation-section', 'consultation')}
        className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all cursor-pointer active:scale-95 ${
          activeSection === 'consultation'
            ? 'text-[#0284c7] font-bold bg-[#e0f2fe]/80 shadow-2xs'
            : 'text-[#64748b] hover:text-[#0c4a6e]'
        }`}
      >
        <PhoneCall className="w-5 h-5" />
        <span className="text-[12px] font-semibold leading-tight mt-1">전화 상담</span>
      </button>
    </div>
  );
};
