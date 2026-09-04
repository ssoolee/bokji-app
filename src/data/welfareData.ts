import { Question, WelfareBenefit } from '../types';

export const QUESTIONS_DATA: Question[] = [
  {
    id: 1,
    step: 1,
    stepTitle: "1단계: 거주지 확인 진행 중",
    category: "질문 1 · 거주지 확인",
    icon: "home_pin",
    pct: "25%",
    progressWidth: "25%",
    heading: "현재 우리 군(관내)에 주민등록을 두고 살고 계신가요?",
    subheading: "가족이나 본인의 주민등록 등본 상 주소지를 기준으로 선택해 주세요.",
    tip: "주민등록상 주소지가 경기도 군 관내 읍·면으로 등록되어 있어야 군비 지원 및 맞춤 복지 사업을 바로 신청하실 수 있습니다.",
    optYes: {
      title: "예 (그렇습니다)",
      desc: "우리 군에 주소지를 두고 거주 중입니다"
    },
    optNo: {
      title: "아니오 (아닙니다)",
      desc: "타 지역 거주자이거나 잘 모르겠습니다"
    }
  },
  {
    id: 2,
    step: 2,
    stepTitle: "2단계: 연령 요건 확인 중",
    category: "질문 2 · 어르신 연령 확인",
    icon: "badge",
    pct: "50%",
    progressWidth: "50%",
    heading: "신청하시는 분의 연령이 만 65세 이상이신가요?",
    subheading: "올해 생일 기준 만 65세가 넘으셨거나 곰 도래하는 어르신 대상입니다.",
    tip: "만 65세 이상인 경우 기초연금, 노인맞춤돌보, 무료 교통카드 등 주요 혜택의 90% 이상을 지원받으실 수 있습니다.",
    optYes: {
      title: "예 (만 65세 이상입니다)",
      desc: "1959년 이전 출생자 또는 신분증상 65세 이상"
    },
    optNo: {
      title: "아니오 (만 65세 미만입니다)",
      desc: "만 65세 미만 일반 가구 복지 확인으로 이동합니다"
    }
  },
  {
    id: 3,
    step: 3,
    stepTitle: "3단계: 가구 소득 및 생활 여건 확인 (2026년 기준)",
    category: "질문 3 · 2026년 소득인정액 요건",
    icon: "currency_krw",
    pct: "75%",
    progressWidth: "75%",
    heading: "현재 기초연금을 받고 계시거나 2026년 가구 소득인정액 기준 이하이신가요?",
    subheading: "2026년 최신 기준: 단독가구 기초연금 월 247만원 이하, 생계급여 월 82만원 이하 등",
    tip: "아래의 [2026년 주요 복지선정기준(소득인정액) 안내표]를 참고해 주세요. 정확한 금액을 몰라도 평소에 기초연금을 받고 계시거나 생활비 지원이 필요하시다면 '예'를 눌러주세요.",
    optYes: {
      title: "예 (기초연금 수급 또는 2026년 소득기준 이하)",
      desc: "현재 지원을 받고 있거나 가구 소득인정액 기준에 해당합니다"
    },
    optNo: {
      title: "아니오 / 잘 모르겠습니다",
      desc: "공무원의 개별 소득재산 조사를 통한 정확한 확인을 희망합니다"
    }
  }
];

export interface IncomeCriterion2026 {
  id: string;
  program: string;
  category: string;
  badge: string;
  criteriaRatio: string;
  singleHousehold: string;
  coupleHousehold: string;
  fourPersonHousehold?: string;
  keyBenefit: string;
  note: string;
}

export const INCOME_CRITERIA_2026: IncomeCriterion2026[] = [
  {
    id: "basic-pension-criterion",
    program: "기초연금",
    category: "노후소득보장",
    badge: "소득 하위 70%",
    criteriaRatio: "소득인정액 하위 70% 이하 (기준중위소득 96.3%)",
    singleHousehold: "월 2,470,000원 이하",
    coupleHousehold: "월 3,952,000원 이하",
    keyBenefit: "단독가구 월 최대 334,810원 / 부부가구 합산 월 최대 535,680원 현금 입금",
    note: "만 65세 이상 어르신 대상 매월 25일 정기 지급"
  },
  {
    id: "livelihood-criterion",
    program: "기초생활 생계급여",
    category: "기초생활보장",
    badge: "중위 32%",
    criteriaRatio: "기준 중위소득 32% 이하",
    singleHousehold: "월 820,556원 이하",
    coupleHousehold: "월 1,350,000원 이하",
    fourPersonHousehold: "월 2,078,316원 이하",
    keyBenefit: "일상생활 유지비(생계비) 매월 20일 전후 통장 현금 지급",
    note: "소득인정액이 0원인 1인 가구는 월 최대 820,556원 전액 지급"
  },
  {
    id: "medical-criterion",
    program: "의료급여",
    category: "의료안전망",
    badge: "중위 40%",
    criteriaRatio: "기준 중위소득 40% 이하",
    singleHousehold: "월 1,025,695원 이하",
    coupleHousehold: "월 1,685,000원 이하",
    fourPersonHousehold: "월 2,597,895원 이하",
    keyBenefit: "병원·약국 진료비 및 처방조제비 본인부담금 대폭 감면",
    note: "1종(외래 1,000원~2,000원선 / 입원 무료), 2종(본인부담 10~15%)"
  },
  {
    id: "housing-criterion",
    program: "주거급여",
    category: "주거안정",
    badge: "중위 48%",
    criteriaRatio: "기준 중위소득 48% 이하",
    singleHousehold: "월 1,230,834원 이하",
    coupleHousehold: "월 2,022,000원 이하",
    fourPersonHousehold: "월 3,117,474원 이하",
    keyBenefit: "임차가구 임차료(월세) 실비 지원 / 자가가구 주택 지붕·단열 개보수",
    note: "부양의무자 소득재산 기준 미적용으로 본인 가구만 평가"
  },
  {
    id: "near-poverty-criterion",
    program: "차상위계층 지원",
    category: "차상위안전망",
    badge: "중위 50%",
    criteriaRatio: "기준 중위소득 50% 이하",
    singleHousehold: "월 1,282,119원 이하",
    coupleHousehold: "월 2,106,500원 이하",
    fourPersonHousehold: "월 3,247,369원 이하",
    keyBenefit: "정부양곱 50% 할인, 통신비·전기·도시가스 요금 감면, 돌보 우선 선발",
    note: "기초수급에 들지 못해도 폭넓은 감면 및 일자리 참여 기회 부여"
  }
];

export const MEDIAN_INCOME_2026 = {
  single: "2,564,238원",
  two: "4,213,000원",
  four: "6,494,738원",
  increaseRate: "2025년 대비 6.51% (1인가구 7.20%) 인상 결정"
};

export const WELFARE_SERVICES: WelfareBenefit[] = [
  {
    id: "basic-pension",
    category: "소득·생계지원",
    badge: "매월 정기지급",
    badgeType: "tertiary",
    title: "기초연금 및 생계급여 지원",
    shortDesc: "만 65세 이상 소득인정액 기준 하위 70% 어르신 대상 매월 안정적인 기초 생활자금을 계좌로 입금해 드립니다.",
    department: "읍·면 맞춤형 복지팀",
    phone: "031-770-2260",
    target: "관내 거주 만 65세 이상 어르신 중 소득인정액 하위 70% 이하인 자",
    content: "단독가구 기준 매월 최대 334,810원, 부부가구 합산 최대 535,680원을 매월 25일 지정 금융계좌로 직접 현금 입금합니다.",
    monthlyAmount: "월 최대 334,810원",
    requirements: [
      "만 65세 이상 대한민국 국적자로 국내 거주자",
      "가구의 소득인정액이 2026년도 선정기준액 이하인 어르신",
      "2026년 선정기준: 단독가구 2,470,000원 이하 / 부부가구 3,952,000원 이하"
    ],
    documents: [
      "신분증 (주민등록증 또는 운전면허증)",
      "기초연금을 지급받을 통장 사본 (본인 명의)",
      "금융정보 등 제공동의서 (읍·면 구비)",
      "임대차계약서 (전·월세 거주자에 한함)"
    ],
    howToApply: "주소지 관할 읍·면 행정복지센터 방문 또는 복지로(bokjiro.go.kr) 온라인 신청 가능. 거동이 불편하신 경우 찾아가는 복지상담 신청 시 직원이 방문 접수를 도와드립니다."
  },
  {
    id: "senior-care",
    category: "돌보·동행",
    badge: "방문 전담관리",
    badgeType: "tertiary",
    title: "어르신 맞춤돌보 및 안부살퐠",
    shortDesc: "생활지원사가 주 1~2회 가정에 방문하여 말벗, 안전 확인, 외출 및 병원 동행을 따뜻하게 도와드립니다.",
    department: "노인복지관 돌보센터",
    phone: "031-770-2345",
    target: "만 65세 이상 기초생활수급자, 차상위계층 또는 기초연금 수급자 중 돌보이 필요한 분",
    content: "안전지원(방문/전화 안부확인, ICT 응급안전안심장비 연계), 사회참여(자조모임, 문화활동), 생활교육(영양/보건 교육), 일상생활지원(병원동행, 장보기 지원) 제공",
    monthlyAmount: "전액 무료 (군비 지원)",
    requirements: [
      "독거노인, 조손가구, 고령부부 가구 등 취약 어르신",
      "신체적 기능 저하로 일상생활 영위가 어려운 어르신",
      "장기요양보험 등급 외 판정자 우선 지원"
    ],
    documents: [
      "신청서 및 개인정보 수집동의서",
      "신분증 사본",
      "필요시 의사소견서 또는 진단서 (병원동행 필요시)"
    ],
    howToApply: "거주지 읍·면 행정복지센터 방문 신청 또는 유선상담 신청을 통해 배정 생활지원사가 사전 방문 상담 후 맞춤형 돌보 계획 수립."
  },
  {
    id: "senior-job",
    category: "일자리·사회활동",
    badge: "활기찬 노후",
    badgeType: "tertiary",
    title: "군민 노인일자리 및 사회활동 지원",
    shortDesc: "공공시설 지킴이, 환경정비, 스쿨존 안전도우미 등 어르신의 활력 있는 노후를 지원하는 맞춤 일자리를 연계합니다.",
    department: "군 시니어클럽",
    phone: "031-770-3880",
    target: "만 65세 이상(사업 유형에 따라 만 60세 이상) 군민",
    content: "공익활동(스쿨존 안전지킴이, 하천 환경정화), 사회서비스형(보육시설 지원, 공공행정 도우미), 시장형(지역 특산물 가공, 시니어 카페 운영) 등",
    monthlyAmount: "월 29만원 ~ 76만원 (근무 형태별)",
    requirements: [
      "공익형: 만 65세 이상 기초연금 수급자",
      "사회서비스형: 만 65세 이상 (일부 만 60세 이상)",
      "시장형/취업알선형: 만 60세 이상 사업참여가능자"
    ],
    documents: [
      "주민등록등본 1부",
      "참여신청서 (시니어클럽 비치)",
      "관련 자격증 사본 (해당자에 한함)"
    ],
    howToApply: "군 시니어클럽, 대한노인회 지회 또는 읍·면 행정복지센터에서 연중 수시 접수 및 연말 정기모집 신청."
  },
  {
    id: "free-bus",
    category: "교통·이동지원",
    badge: "군비 100% 무상",
    badgeType: "tertiary",
    title: "어르신 무상교통(행복버스) 카드",
    shortDesc: "관내 시내버스 및 마을버스 무제한 탑승 지원 카드를 관내 농협 및 행정복지센터에서 당일 즉시 발급해 드립니다.",
    department: "군청 교통행정과",
    phone: "031-770-2290",
    target: "관내에 주민등록을 둔 만 65세 이상 모든 어르신",
    content: "관내를 운행하는 모든 일반 시내버스 및 마을버스 요금을 무제한 군비로 보전 지원 (단말기 태그 시 요금 0원 처리 또는 환급)",
    monthlyAmount: "무제한 전액 무료",
    requirements: [
      "양평군 관내 실거주 및 주민등록 등재 어르신",
      "신청일 현재 만 65세 이상"
    ],
    documents: [
      "본인 신분증 (주민등록증 또는 운전면허증)",
      "기존에 사용하던 농협 통장 또는 체크카드 (연계 희망시)"
    ],
    howToApply: "신분증 지참 후 관내 지역농협 영업점 또는 읍·면 행정복지센터 방문 즉시 IC 교통카드 현장 발급."
  },
  {
    id: "energy-voucher",
    category: "주거·에너지",
    badge: "동절기 긴급",
    badgeType: "tertiary",
    title: "동절기 난방비 및 에너지바우처",
    shortDesc: "추운 겨울철 취약 어르신 가구의 전기, 도시가스, 연탄, 등유 구매 비용을 직접 차감 지원합니다.",
    department: "읍·면 사회복지창구",
    phone: "031-770-2260",
    target: "국민기초생활보장법 상 생계·의료·주거·교육급여 수급자 중 노인, 영유아, 장애인 포함 세대",
    content: "전기, 도시가스, 지역난방 요금고지서에서 자동 차감되는 전자바우처 또는 등유, LPG, 연탄을 구매할 수 있는 국민행복카드 지원",
    monthlyAmount: "가구원수별 연 최대 40만원",
    requirements: [
      "생계급여 또는 의료급여 수급 가구",
      "만 65세 이상 주민등록상 세대원 포함 가구",
      "중복수혜(연탄쿠폰 등) 여부 확인 후 적격 지원"
    ],
    documents: [
      "신분증",
      "가장 최근 납부한 전기 또는 도시가스 요금고지서 영수증"
    ],
    howToApply: "거주지 읍·면 행정복지센터 사회복지팀 창구 방문 신청 (매년 5월 ~ 12월 말 접수)."
  },
  {
    id: "health-medical",
    category: "의료·건강지원",
    badge: "실비 환급지원",
    badgeType: "tertiary",
    title: "틀니·임플란트 및 무릅관절 수술비",
    shortDesc: "치아 결손 및 관절 질환으로 고통받으시는 어르신을 위해 비급여 치료비 및 시술 본인부담금을 군비로 보조합니다.",
    department: "보건소 진료의약팀",
    phone: "031-770-3490",
    target: "관내 거주 만 65세 이상 어르신 (소득 기준 충족자)",
    content: "무릅 인공관절 수술비 본인부담금(한쪽 무릅당 최대 120만원, 양측 240만원 지원), 틀니/임플란트 시술 지원 및 정기 검진비 환급",
    monthlyAmount: "최대 240만원 한도",
    requirements: [
      "만 65세 이상 기초생활수급자, 차상위계층, 한부모가족",
      "건강보험료 부과기준 하위 50% 이하 가구",
      "반드시 수술 전 사전 검진 및 신청 승인 필요"
    ],
    documents: [
      "진단서(소견서) 1부 (인공관절 치환술 필요 명시)",
      "건강보험료 납부확인서 또는 기초수급 증명서",
      "주민등록등본 1부"
    ],
    howToApply: "지정 협약 의료기관에서 사전 진단 후 관할 보건소 보건행정과에 수술 전 신청서 접수."
  }
];

export const CONSULTATION_TOPICS = [
  { value: "income", label: "기초연금 · 생계지원" },
  { value: "care", label: "어르신 돌보 · 안부" },
  { value: "warm", label: "동절기 난방비 지원" },
  { value: "job", label: "노인일자리 · 활동" },
  { value: "health", label: "교통카드 · 건강의료" },
  { value: "general", label: "기타 전반 종합상담" }
];

export const TIME_SLOTS = [
  { value: "am", label: "오전 09:00 ~ 12:00" },
  { value: "pm1", label: "오후 13:00 ~ 15:00" },
  { value: "pm2", label: "오후 15:00 ~ 18:00" },
  { value: "any", label: "근무시간 중 언제나" }
];
