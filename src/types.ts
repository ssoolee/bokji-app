export type FontScale = 'normal' | 'large' | 'xlarge';
export type FontPreset = 'lineseed' | 'suit' | 'paperlogy' | 'pretendard';

export interface QuestionOption {
  title: string;
  desc: string;
}

export interface Question {
  id: number;
  step: number;
  stepTitle: string;
  category: string;
  icon: string;
  pct: string;
  progressWidth: string;
  heading: string;
  subheading: string;
  tip: string;
  optYes: QuestionOption;
  optNo: QuestionOption;
}

export interface WelfareBenefit {
  id: string;
  category: string;
  badge: string;
  badgeType?: 'primary' | 'secondary' | 'tertiary';
  title: string;
  shortDesc: string;
  department: string;
  phone: string;
  target: string;
  content: string;
  monthlyAmount?: string;
  requirements: string[];
  documents: string[];
  howToApply: string;
}

export interface ConsultationBooking {
  id: string;
  name: string;
  phone: string;
  topic: string;
  timeSlot: string;
  submittedAt: string;
  status: '접수완료' | '상담배정' | '상담완료';
}
