import React, { useState, useEffect, useRef } from 'react';
import { FontScale, FontPreset, WelfareBenefit, ConsultationBooking } from './types';
import { Header } from './components/Header';
import { SelfDiagnosis } from './components/SelfDiagnosis';
import { WelfareServices } from './components/WelfareServices';
import { PhoneConsultation } from './components/PhoneConsultation';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ConsultationConfirmModal } from './components/ConsultationConfirmModal';
import { SmsShareModal } from './components/SmsShareModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

export default function App() {
  const [fontScale, setFontScale] = useState<FontScale>('large');
  const [fontPreset, setFontPreset] = useState<FontPreset>(() => {
    try {
      const saved = localStorage.getItem('yp_welfare_font');
      if (saved && ['lineseed', 'suit', 'paperlogy', 'pretendard'].includes(saved)) {
        return saved as FontPreset;
      }
    } catch {
      // ignore
    }
    return 'lineseed';
  });
  const [activeSection, setActiveSection] = useState<string>('self-diagnosis');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [selectedBenefit, setSelectedBenefit] = useState<WelfareBenefit | null>(null);
  const [isSmsModalOpen, setIsSmsModalOpen] = useState<boolean>(false);
  const [recentBooking, setRecentBooking] = useState<ConsultationBooking | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [preselectedTopic, setPreselectedTopic] = useState<string>('income');
  const [pastBookings, setPastBookings] = useState<ConsultationBooking[]>([]);

  const ttsUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Apply font preset to html document
  useEffect(() => {
    document.documentElement.setAttribute('data-font', fontPreset);
    try {
      localStorage.setItem('yp_welfare_font', fontPreset);
    } catch {
      // ignore
    }
  }, [fontPreset]);

  // Load past bookings from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('yp_welfare_bookings');
      if (saved) {
        setPastBookings(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Update root font size when fontScale changes
  useEffect(() => {
    const root = document.documentElement;
    if (fontScale === 'large') {
      root.style.fontSize = '112%';
    } else if (fontScale === 'xlarge') {
      root.style.fontSize = '125%';
    } else {
      root.style.fontSize = '100%';
    }
  }, [fontScale]);

  // Handle Speech Synthesis TTS
  const toggleTts = () => {
    if (!('speechSynthesis' in window)) {
      alert('사용하시는 브라우저가 음성 안내(TTS) 기능을 지원하지 않습니다.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead =
        '양평군민 맞춤 복지 서비스 포털입니다. 내가 받을 수 있는 복지 혜택, 3분 만에 간편하게 확인해보세요. 1단계 거주지 확인부터 연령 및 소득 상황을 선택하시면 받을 수 있는 복지 혜택을 즉시 안내해 드립니다.';

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.9; // Elderly friendly comfortable tempo
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      ttsUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleOpenDetailModal = (benefit: WelfareBenefit) => {
    setSelectedBenefit(benefit);
  };

  const handleCloseDetailModal = () => {
    setSelectedBenefit(null);
  };

  const handleBookConsultationForBenefit = (topic: string) => {
    let topicKey = 'income';
    if (topic.includes('돌보')) topicKey = 'care';
    else if (topic.includes('난방')) topicKey = 'warm';
    else if (topic.includes('일자리')) topicKey = 'job';
    else if (topic.includes('교통') || topic.includes('의료')) topicKey = 'health';

    setPreselectedTopic(topicKey);
    setActiveSection('consultation');
    const el = document.getElementById('phone-consultation-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJumpToSelfDiagnosis = () => {
    setActiveSection('self-diagnosis');
    const el = document.getElementById('questionnaire-root');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConsultationSuccess = (newBooking: ConsultationBooking) => {
    setRecentBooking(newBooking);
    const updated = [newBooking, ...pastBookings];
    setPastBookings(updated);
    try {
      localStorage.setItem('yp_welfare_bookings', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setIsConfirmModalOpen(true);
  };

  const handleOpenMyStatus = () => {
    if (pastBookings.length > 0 || recentBooking) {
      setIsConfirmModalOpen(true);
    } else {
      alert('현재 접수된 전화상담 내역이 없습니다. 아래 전화상담 신청서를 작성해 주세요.');
      const el = document.getElementById('phone-consultation-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-pattern text-[#0f172a] font-sans antialiased pb-20 md:pb-0" id="top">
      {/* Header */}
      <Header
        fontScale={fontScale}
        setFontScale={setFontScale}
        fontPreset={fontPreset}
        setFontPreset={setFontPreset}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSpeaking={isSpeaking}
        toggleTts={toggleTts}
        onOpenMyStatus={handleOpenMyStatus}
      />

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* 1. Self Diagnosis Section */}
        <SelfDiagnosis
          fontScale={fontScale}
          setFontScale={setFontScale}
          onOpenDetailModal={handleOpenDetailModal}
          onOpenSmsModal={() => setIsSmsModalOpen(true)}
          onBookConsultationForBenefit={handleBookConsultationForBenefit}
        />

        {/* 2. Tailored Welfare Services Section */}
        <WelfareServices
          onOpenDetailModal={handleOpenDetailModal}
          onJumpToSelfDiagnosis={handleJumpToSelfDiagnosis}
        />

        {/* 3. Phone Consultation Section */}
        <PhoneConsultation
          onSuccessSubmit={handleConsultationSuccess}
          preselectedTopic={preselectedTopic}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Nav */}
      <MobileBottomNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Modals */}
      <ServiceDetailModal
        benefit={selectedBenefit}
        onClose={handleCloseDetailModal}
        onBookConsultation={handleBookConsultationForBenefit}
      />

      <ConsultationConfirmModal
        booking={recentBooking}
        pastBookings={pastBookings}
        onClose={() => setIsConfirmModalOpen(false)}
      />

      <SmsShareModal
        isOpen={isSmsModalOpen}
        onClose={() => setIsSmsModalOpen(false)}
      />
    </div>
  );
}
