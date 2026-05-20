import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ENG" | "KOR";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  "nav.home": { ENG: "Home", KOR: "홈" },
  "nav.about": { ENG: "About", KOR: "소개" },
  "nav.journey": { ENG: "Journey", KOR: "여정" },
  "nav.skills": { ENG: "Skills", KOR: "스킬" },
  "nav.projects": { ENG: "Projects", KOR: "프로젝트" },
  "nav.vision": { ENG: "Vision", KOR: "비전" },
  "nav.contact": { ENG: "Contact", KOR: "연락" },

  // Hero
  "hero.badge": { ENG: "SW Engineer · AI Prompt Engineer", KOR: "SW 엔지니어 · AI 프롬프트 엔지니어" },
  "hero.title": { ENG: "Hi, I'm Mukhammed", KOR: "안녕하세요, 저는 무하마드입니다" },
  "hero.subtitle": { ENG: "I build practical software with C#, Python, cameras, databases, automation systems, and AI tools. I'm also learning prompt engineering and using AI to improve how I code, test ideas, debug problems, and build useful tools. My focus is simple: make things that actually work, solve real problems, and keep improving step by step.", KOR: "C#, Python, 카메라, 데이터베이스, 자동화 시스템, AI 도구로 실용적인 소프트웨어를 만들고 있습니다. 프롬프트 엔지니어링을 배우며 AI를 활용해 코딩, 아이디어 테스트, 디버깅, 유용한 도구 제작에 적용하고 있습니다. 목표는 단순합니다: 실제로 작동하고, 진짜 문제를 해결하며, 한 걸음씩 성장하는 것입니다." },
  "hero.cta1": { ENG: "See My Work", KOR: "내 작업 보기" },
  "hero.cta2": { ENG: "Play With My Skills", KOR: "내 스킬 플레이" },
  "hero.cta3": { ENG: "Contact Me", KOR: "연락하기" },

  // About
  "about.label": { ENG: "01 / About", KOR: "01 / 소개" },
  "about.title": { ENG: "Building my future, one block at a time", KOR: "미래를 한 블록씩 만들기" },
  "about.p1": { ENG: "I'm Mukhammed, an engineer from Uzbekistan now based in Korea. My journey has been about learning to build—not just code, but systems, tools, and solutions that solve real problems.", KOR: "저는 우즈베키스탄 출신이고 현재 한국에 거주하는 엔지니어 무하마드입니다. 제 여정은 배우는 것에 관한 것입니다—단지 코드뿐만 아니라 실제 문제를 해결하는 시스템, 도구, 솔루션을 만드는 것입니다." },
  "about.p2": { ENG: "I started in architecture, moved through business, and found my true passion in engineering. Every challenge—from learning Korean to mastering new technologies—has been a building block in my growth.", KOR: "저는 건축에서 시작했고, 비즈니스를 거쳐, 엔지니어링에서 진정한 열정을 찾았습니다. 한국어 배우기에서 새로운 기술 습득까지 모든 도전이 제 성장의 빌딩 블록이었습니다." },
  "about.p3": { ENG: "Today, I focus on three things: building practical systems, learning continuously, and improving every day. Whether it's Android apps, vision systems, or automation tools, I'm driven by the desire to create things that matter.", KOR: "오늘날 저는 세 가지에 집중합니다: 실용적인 시스템 구축, 지속적인 학습, 매일 개선. Android 앱, 비전 시스템, 자동화 도구 등 중요한 것을 만들고 싶습니다." },

  // Skills
  "skills.label": { ENG: "03 / Skills", KOR: "03 / 스킬" },
  "skills.title": { ENG: "My Skills", KOR: "내 스킬" },
  "skills.reset": { ENG: "Reset Playground", KOR: "플레이그라운드 리셋" },

  // Projects
  "projects.label": { ENG: "04 / Projects", KOR: "04 / 프로젝트" },
  "projects.title": { ENG: "Work I'm Proud Of", KOR: "자랑스러운 작업" },

  // Contact
  "contact.label": { ENG: "07 / Contact", KOR: "07 / 연락" },
  "contact.title": { ENG: "Let's Build Something", KOR: "뭔가 만들어봅시다" },
  "contact.send": { ENG: "Send Message", KOR: "메시지 보내기" },

  // Footer
  "footer.tagline": { ENG: "Made with ❤️ in Korea", KOR: "한국에서 ❤️로 만들었습니다" },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ENG");

  const toggleLanguage = () => {
    setLanguage(language === "ENG" ? "KOR" : "ENG");
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
