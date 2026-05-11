"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const LOCALES = ["en", "tr", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  tr: "TR",
  de: "DE",
};

export const LOCALE_FULL_LABELS: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
  de: "Deutsch",
};

/* -------------------- DICTIONARY -------------------- */

type Dict = {
  nav: Record<
    "home" | "journey" | "projects" | "travel" | "think" | "contact" | "cv" | "search",
    string
  >;
  hero: {
    status: string;
    title1: string;
    title2: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaCv: string;
  };
  metrics: {
    years: string;
    yearsLabel: string;
    projects: string;
    projectsLabel: string;
    countries: string;
    countriesLabel: string;
    languages: string;
    languagesLabel: string;
  };
  stack: { title: string };
  selectedWork: {
    kicker: string;
    title: string;
    all: string;
    items: { kicker: string; title: string; summary: string; metric: string }[];
  };
  journey: {
    kicker: string;
    title: string;
    description: string;
    filterAll: string;
    filterWork: string;
    filterEducation: string;
    filterAchievement: string;
    present: string;
    items: {
      id: string;
      type: "work" | "education" | "achievement";
      period: string;
      title: string;
      org: string;
      location: string;
      summary: string;
    }[];
  };
  travel: {
    kicker: string;
    title: string;
    description: string;
    visited: string;
    selectHint: string;
    noPhotos: string;
    cities: string;
    year: string;
  };
  think: {
    kicker: string;
    title: string;
    description: string;
    skillsTitle: string;
    approachTitle: string;
    approach: { title: string; body: string }[];
    groups: { title: string; items: string[] }[];
  };
  projects: {
    kicker: string;
    title: string;
    description: string;
    filterAll: string;
    filterUni: string;
    filterPersonal: string;
    filterWork: string;
    filterResearch: string;
    linkGithub: string;
    linkDemo: string;
    linkPaper: string;
    emptyTitle: string;
    emptyBody: string;
  };
  tennis: {
    kicker: string;
    title: string;
    description: string;
    stats: { value: string; label: string }[];
    lessons: { title: string; body: string }[];
  };
  contact: {
    kicker: string;
    title: string;
    description: string;
    leftHeading: string;
    leftBody: string;
    socials: {
      email: string;
      linkedin: string;
      github: string;
      instagram: string;
      facebook: string;
    };
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      success: string;
      successBody: string;
      errorRequired: string;
      errorEmail: string;
    };
  };
  footer: {
    built: string;
  };
};

const en: Dict = {
  nav: {
    home: "Home",
    journey: "Journey",
    projects: "Projects",
    travel: "Travel",
    think: "Approach",
    contact: "Contact",
    cv: "CV",
    search: "Search",
  },
  hero: {
    status: "Munich · Open to internships and junior positions",
    title1: "Data, AI and",
    title2: "intelligent sensor systems.",
    description:
      "M.Eng. candidate in AI for Smart Sensors and Actuators at THD Deggendorf, Germany (GPA 1.0). Data analytics experience at Vodafone Türkiye and KPMG; B.Sc. Computer Engineering on a full scholarship from Kadir Has University. Competitive tennis player at 1. FC Nürnberg — coach to university students at Regensburg and FAU Erlangen-Nürnberg.",
    ctaPrimary: "Read my background",
    ctaSecondary: "Get in touch",
    ctaCv: "Download CV",
  },
  metrics: {
    years: "3+",
    yearsLabel: "Years in data and analytics",
    projects: "2",
    projectsLabel: "Degrees (B.Sc. + M.Eng. in progress)",
    countries: "12",
    countriesLabel: "Countries visited",
    languages: "4",
    languagesLabel: "Languages — TR & EN fluent, DE & FR learning",
  },
  stack: { title: "Tools I work with" },
  selectedWork: {
    kicker: "Selected experience",
    title: "Recent professional work.",
    all: "View full timeline",
    items: [
      {
        kicker: "Vodafone Türkiye",
        title: "Data Science Intern",
        summary:
          "KPI and performance analytics across Mobile and Fixed Broadband. Reporting built in SQL, DBeaver, and Tableau and used in weekly senior-management reviews.",
        metric: "2025 · Istanbul",
      },
      {
        kicker: "KPMG Türkiye",
        title: "Data Analyst & Digital Trainee",
        summary:
          "Data, analytics and automation engagements supporting clients' operating-model and reporting transformations.",
        metric: "2024–25 · Istanbul",
      },
      {
        kicker: "McKinsey & Company",
        title: "Forward Program — Digital Evolution",
        summary:
          "Selected for McKinsey's flagship development programme. Curriculum covered structured problem-solving, digital strategy, and analytical communication.",
        metric: "2023",
      },
    ],
  },
  journey: {
    kicker: "Journey",
    title: "Roles, education and recognition.",
    description:
      "A chronological view of the work and study that brought me here.",
    filterAll: "All",
    filterWork: "Work",
    filterEducation: "Education",
    filterAchievement: "Recognition",
    present: "Present",
    items: [
      {
        id: "thd-msc",
        type: "education",
        period: "2025 — Present",
        title: "M.Eng. Artificial Intelligence for Smart Sensors & Actuators",
        org: "Technische Hochschule Deggendorf",
        location: "Germany · Grade 1.0",
        summary:
          "Application-oriented Master's programme focused on intelligent sensor systems. Core areas: AI, machine learning, embedded control, system design, big data and IoT communication. Fully English, R&D-oriented.",
      },
      {
        id: "tennis-coach",
        type: "work",
        period: "2025 — Present",
        title: "Tennis Coach",
        org: "University of Regensburg & FAU Erlangen-Nürnberg",
        location: "Bavaria, Germany",
        summary:
          "Group and individual tennis coaching at two Bavarian universities alongside M.Eng. studies. Session planning, technique instruction and player development for university student programmes.",
      },
      {
        id: "vodafone",
        type: "work",
        period: "Jan — Nov 2025",
        title: "Data Science Intern",
        org: "Vodafone Türkiye",
        location: "Istanbul",
        summary:
          "KPI and performance analytics for Mobile and Fixed Broadband segments using SQL, DBeaver and Tableau. Structured training in data science, database management and automation tooling.",
      },
      {
        id: "kpmg",
        type: "work",
        period: "Sep 2024 — Jan 2025",
        title: "Data Analyst & Digital Trainee",
        org: "KPMG Türkiye",
        location: "Istanbul",
        summary:
          "Data, analytics and automation work for client operating-model transformations. Contributed to reporting infrastructure and analytical deliverables for engagement teams.",
      },
      {
        id: "khas-cs",
        type: "education",
        period: "2022 — 2025",
        title: "B.Sc. Computer Engineering",
        org: "Kadir Has University",
        location: "Istanbul",
        summary:
          "Full scholarship; programme delivered entirely in English. Coursework in Python, C++, SQL, data analysis, database systems, operating systems and software engineering principles.",
      },
      {
        id: "mckinsey",
        type: "achievement",
        period: "2023",
        title: "McKinsey Forward Program — Digital Evolution",
        org: "McKinsey & Company",
        location: "Selected participant",
        summary:
          "Selected for McKinsey's flagship development programme. Curriculum covered digital transformation, structured problem-solving and analytical leadership.",
      },
      {
        id: "astay",
        type: "work",
        period: "Jul — Sep 2022",
        title: "Construction Site Intern",
        org: "Astay Holding — Four Seasons Private Residences",
        location: "Istanbul",
        summary:
          "Progress monitoring and quantitative reporting across active site activities. First professional exposure to operations measured by data.",
      },
      {
        id: "khas-civil",
        type: "education",
        period: "2020 — 2022",
        title: "B.Sc. Civil Engineering (transferred)",
        org: "Kadir Has University",
        location: "Istanbul",
        summary:
          "Higher mathematics, probability and statistics, dynamics of physical systems, applied engineering mathematics and MATLAB. Internal transfer to Computer Engineering in 2022.",
      },
      {
        id: "tennis",
        type: "achievement",
        period: "2014",
        title: "Turkish Junior Tennis Champion",
        org: "Turkish Tennis Federation",
        location: "Türkiye",
        summary:
          "National junior champion. Tennis informed habits I still rely on: structured preparation, composure under pressure and patience with long-term work.",
      },
    ],
  },
  travel: {
    kicker: "Travel",
    title: "Where I have been.",
    description:
      "Twelve countries across Europe and Türkiye. Each entry collects photos and short notes from time spent there.",
    visited: "Visited",
    selectHint: "Select a country",
    noPhotos: "Photos to come.",
    cities: "Cities",
    year: "Year",
  },
  think: {
    kicker: "Approach",
    title: "How I work through a problem.",
    description:
      "The methods I use and the tools I rely on, in roughly the order I reach for them.",
    skillsTitle: "Toolkit",
    approachTitle: "Method",
    approach: [
      {
        title: "01 · Define the decision",
        body: "Begin with the decision the analysis must support. Without a decision in mind, there is no analysis worth running.",
      },
      {
        title: "02 · Profile the data",
        body: "Examine shape, volume, freshness and gaps. Understand what the data is before deciding what it should say.",
      },
      {
        title: "03 · Run the smallest useful experiment",
        body: "Choose the cheapest test that could disprove the hypothesis. Speed of feedback compounds faster than cleverness.",
      },
      {
        title: "04 · Hand it off cleanly",
        body: "Document assumptions, write SQL that reads naturally, and leave tests behind. The next maintainer is as much a stakeholder as the first reader.",
      },
      {
        title: "05 · Close the loop",
        body: "Report what was decided, not only what was learned. Verify whether the decision held and update the model of the world accordingly.",
      },
    ],
    groups: [
      {
        title: "Programming",
        items: ["Python", "C++", "SQL", "TypeScript", "MATLAB"],
      },
      {
        title: "Data & BI",
        items: ["Tableau", "Power BI", "DBeaver", "pandas", "NumPy"],
      },
      {
        title: "AI & ML",
        items: ["YOLOv8", "scikit-learn", "PyTorch", "Edge AI", "Smart sensors"],
      },
      {
        title: "Ways of working",
        items: [
          "Agile (Scrum)",
          "Project management",
          "Stakeholder communication",
          "Analytical writing",
        ],
      },
    ],
  },
  projects: {
    kicker: "Projects",
    title: "Selected projects.",
    description:
      "A working catalogue of university, professional and personal work. Each entry includes the problem, the stack and the takeaway. Filter by category or browse the full list.",
    filterAll: "All",
    filterUni: "University",
    filterPersonal: "Personal",
    filterWork: "Internship",
    filterResearch: "Research",
    linkGithub: "Code",
    linkDemo: "Demo",
    linkPaper: "Paper",
    emptyTitle: "No projects in this category yet.",
    emptyBody: "Try another filter.",
  },
  tennis: {
    kicker: "Off the court",
    title: "What tennis taught me.",
    description:
      "Competitive tennis since 2006; Turkish Junior Champion in 2014. Currently playing at 1. FC Nürnberg and coaching at the University of Regensburg and FAU Erlangen-Nürnberg. The court taught me habits I still rely on: structured preparation, composure under pressure and patience with long-term work.",
    stats: [
      { value: "2014", label: "Turkish Junior Champion" },
      { value: "18+", label: "Years on court" },
      { value: "2", label: "Universities coached at" },
    ],
    lessons: [
      {
        title: "Discipline",
        body: "Daily, structured practice, independent of motivation. The same logic compounds in engineering: small, consistent gains earned by simply showing up.",
      },
      {
        title: "Composure",
        body: "Tight matches train you to think clearly when it matters. The reflex transfers directly to production incidents and demanding deadlines.",
      },
      {
        title: "Long-term thinking",
        body: "Meaningful progress rarely shows up in a single match. I build software with the same patience: deliver, measure, refine, adjust.",
      },
    ],
  },
  contact: {
    kicker: "Contact",
    title: "Get in touch.",
    description:
      "Open to full-time roles, internships and research collaborations. I usually reply within a working day.",
    leftHeading: "Direct channels",
    leftBody:
      "Reach me on any of the channels below. For project enquiries, the form on the right is the most reliable route.",
    socials: {
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      instagram: "Instagram",
      facebook: "Facebook",
    },
    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@domain.com",
      messageLabel: "Message",
      messagePlaceholder: "A short note about the role, project or question.",
      submit: "Send message",
      submitting: "Sending…",
      success: "Message sent.",
      successBody:
        "Thank you. I will respond within a working day.",
      errorRequired: "Please fill in all fields.",
      errorEmail: "Please enter a valid email address.",
    },
  },
  footer: {
    built: "Built with Next.js.",
  },
};

const tr: Dict = {
  nav: {
    home: "Anasayfa",
    journey: "Yolculuk",
    projects: "Projeler",
    travel: "Seyahatler",
    think: "Yaklaşım",
    contact: "İletişim",
    cv: "CV",
    search: "Ara",
  },
  hero: {
    status: "Münih · Staj ve junior pozisyonlara açığım",
    title1: "Veri, yapay zekâ ve",
    title2: "akıllı sensör sistemleri.",
    description:
      "THD Deggendorf, Almanya'da Akıllı Sensörler ve Aktüatörler için Yapay Zekâ yüksek lisans adayı (GPA 1.0). Vodafone Türkiye ve KPMG'de veri analitiği deneyimi; Kadir Has Üniversitesi'nde tam burslu Bilgisayar Mühendisliği lisansı. 1. FC Nürnberg'de rekabetçi tenis — Regensburg Üniversitesi ve FAU Erlangen-Nürnberg'de öğrencilere antrenörlük.",
    ctaPrimary: "Geçmişimi incele",
    ctaSecondary: "İletişime geç",
    ctaCv: "CV'yi indir",
  },
  metrics: {
    years: "3+",
    yearsLabel: "Veri ve analitikte yıl",
    projects: "2",
    projectsLabel: "Derece (Lisans + devam eden Y.L.)",
    countries: "12",
    countriesLabel: "Gezilen ülke",
    languages: "4",
    languagesLabel: "Dil — TR & EN akıcı, DE & FR öğreniyor",
  },
  stack: { title: "Kullandığım araçlar" },
  selectedWork: {
    kicker: "Seçilmiş deneyim",
    title: "Yakın dönem profesyonel çalışmalar.",
    all: "Tüm zaman çizelgesi",
    items: [
      {
        kicker: "Vodafone Türkiye",
        title: "Veri Bilimi Stajyeri",
        summary:
          "Mobil ve Sabit Geniş Bant segmentlerinde KPI ve performans analitiği. SQL, DBeaver ve Tableau ile geliştirilen, haftalık üst yönetim toplantılarında kullanılan raporlar.",
        metric: "2025 · İstanbul",
      },
      {
        kicker: "KPMG Türkiye",
        title: "Veri Analisti & Dijital Trainee",
        summary:
          "Müşterilerin operasyon modeli ve raporlama dönüşümlerini destekleyen veri, analitik ve otomasyon projeleri.",
        metric: "2024–25 · İstanbul",
      },
      {
        kicker: "McKinsey & Company",
        title: "Forward Programı — Digital Evolution",
        summary:
          "McKinsey'nin amiral gemisi gelişim programına seçildim. İçerik: yapılandırılmış problem çözme, dijital strateji ve analitik iletişim.",
        metric: "2023",
      },
    ],
  },
  journey: {
    kicker: "Yolculuk",
    title: "Roller, eğitim ve takdir.",
    description:
      "Beni bu noktaya getiren iş ve eğitim adımlarının kronolojik dökümü.",
    filterAll: "Hepsi",
    filterWork: "İş",
    filterEducation: "Eğitim",
    filterAchievement: "Takdir",
    present: "Günümüz",
    items: [
      {
        id: "thd-msc",
        type: "education",
        period: "2025 — Günümüz",
        title: "M.Eng. Akıllı Sensörler ve Aktüatörler için Yapay Zekâ",
        org: "Technische Hochschule Deggendorf",
        location: "Almanya · Not 1.0",
        summary:
          "Akıllı sensör sistemlerine odaklı, uygulama ağırlıklı yüksek lisans programı. Çekirdek alanlar: yapay zekâ, makine öğrenmesi, gömülü kontrol, sistem tasarımı, big data ve IoT iletişimi. Tamamen İngilizce, AR-GE odaklı.",
      },
      {
        id: "tennis-coach",
        type: "work",
        period: "2025 — Günümüz",
        title: "Tenis Antrenörü",
        org: "Regensburg Üniversitesi & FAU Erlangen-Nürnberg",
        location: "Bavyera, Almanya",
        summary:
          "Yüksek lisans eğitimimin yanı sıra iki Bavyera üniversitesinde grup ve bireysel tenis antrenörlüğü. Ders planlaması, teknik eğitim ve üniversite öğrenci programları için oyuncu gelişimi.",
      },
      {
        id: "vodafone",
        type: "work",
        period: "Ocak — Kasım 2025",
        title: "Veri Bilimi Stajyeri",
        org: "Vodafone Türkiye",
        location: "İstanbul",
        summary:
          "Mobil ve Sabit Geniş Bant segmentlerinde SQL, DBeaver ve Tableau ile KPI ve performans analitiği. Veri bilimi, veritabanı yönetimi ve otomasyon araçları üzerine yapılandırılmış eğitim.",
      },
      {
        id: "kpmg",
        type: "work",
        period: "Eylül 2024 — Ocak 2025",
        title: "Veri Analisti & Dijital Trainee",
        org: "KPMG Türkiye",
        location: "İstanbul",
        summary:
          "Müşteri operasyon modeli dönüşümleri için veri, analitik ve otomasyon çalışmaları. Proje ekiplerinin raporlama altyapısına ve analitik çıktılarına katkı.",
      },
      {
        id: "khas-cs",
        type: "education",
        period: "2022 — 2025",
        title: "Lisans, Bilgisayar Mühendisliği",
        org: "Kadir Has Üniversitesi",
        location: "İstanbul",
        summary:
          "Tam burslu, tamamen İngilizce program. Python, C++, SQL, veri analizi, veritabanı sistemleri, işletim sistemleri ve yazılım mühendisliği temelleri.",
      },
      {
        id: "mckinsey",
        type: "achievement",
        period: "2023",
        title: "McKinsey Forward Programı — Digital Evolution",
        org: "McKinsey & Company",
        location: "Seçilmiş katılımcı",
        summary:
          "McKinsey'nin amiral gemisi gelişim programına seçildim. Müfredat: dijital dönüşüm, yapılandırılmış problem çözme ve analitik liderlik.",
      },
      {
        id: "astay",
        type: "work",
        period: "Temmuz — Eylül 2022",
        title: "Şantiye Stajyeri",
        org: "Astay Holding — Four Seasons Private Residences",
        location: "İstanbul",
        summary:
          "Saha faaliyetlerinde ilerleme takibi ve sayısal raporlama. Veri ile ölçülen operasyonlarla ilk profesyonel temas.",
      },
      {
        id: "khas-civil",
        type: "education",
        period: "2020 — 2022",
        title: "Lisans, İnşaat Mühendisliği (geçişli)",
        org: "Kadir Has Üniversitesi",
        location: "İstanbul",
        summary:
          "İleri matematik, olasılık ve istatistik, fiziksel sistemlerin dinamiği, uygulamalı mühendislik matematiği ve MATLAB. 2022'de Bilgisayar Mühendisliği'ne geçiş.",
      },
      {
        id: "tennis",
        type: "achievement",
        period: "2014",
        title: "Türkiye Junior Tenis Şampiyonu",
        org: "Türkiye Tenis Federasyonu",
        location: "Türkiye",
        summary:
          "Junior kategoride millî şampiyonluk. Tenis bana hâlâ kullandığım alışkanlıkları kazandırdı: yapılandırılmış hazırlık, baskı altında soğukkanlılık ve uzun vadeli çalışmaya sabır.",
      },
    ],
  },
  travel: {
    kicker: "Seyahatler",
    title: "Gittiğim yerler.",
    description:
      "Avrupa ve Türkiye'de on iki ülke. Her ülke için orada çekilmiş fotoğraflar ve kısa notlar.",
    visited: "Ziyaret edildi",
    selectHint: "Bir ülke seç",
    noPhotos: "Fotoğraflar yakında.",
    cities: "Şehirler",
    year: "Yıl",
  },
  think: {
    kicker: "Yaklaşım",
    title: "Bir problemi nasıl çözüyorum.",
    description:
      "Kullandığım yöntemler ve güvendiğim araçlar; kabaca onlara başvurma sırasıyla.",
    skillsTitle: "Alet çantası",
    approachTitle: "Yöntem",
    approach: [
      {
        title: "01 · Kararı tanımla",
        body: "Analizin desteklemesi gereken karardan başla. Verilecek bir karar yoksa, koşulmaya değer bir analiz de yoktur.",
      },
      {
        title: "02 · Veriyi profille",
        body: "Şekli, hacmi, tazeliği ve eksikleri incele. Verinin ne söylemesi gerektiğine karar vermeden önce ne olduğunu anla.",
      },
      {
        title: "03 · En küçük faydalı deneyi koş",
        body: "Hipotezi çürütebilecek en ucuz testi seç. Geri bildirim hızı, zekâdan daha hızlı birikir.",
      },
      {
        title: "04 · Düzgün bir şekilde devret",
        body: "Varsayımları belgele, doğal okunan SQL yaz ve arkanda test bırak. Sonraki bakım sahibi de en az ilk okuyucu kadar paydaştır.",
      },
      {
        title: "05 · Döngüyü kapat",
        body: "Sadece neyin öğrenildiğini değil, neye karar verildiğini raporla. Kararın geçerliliğini doğrula ve dünya modelini buna göre güncelle.",
      },
    ],
    groups: [
      {
        title: "Programlama",
        items: ["Python", "C++", "SQL", "TypeScript", "MATLAB"],
      },
      {
        title: "Veri & İş Zekâsı",
        items: ["Tableau", "Power BI", "DBeaver", "pandas", "NumPy"],
      },
      {
        title: "YZ & Makine Öğrenmesi",
        items: ["YOLOv8", "scikit-learn", "PyTorch", "Edge AI", "Akıllı sensörler"],
      },
      {
        title: "Çalışma biçimi",
        items: [
          "Agile (Scrum)",
          "Proje yönetimi",
          "Paydaş iletişimi",
          "Analitik yazma",
        ],
      },
    ],
  },
  projects: {
    kicker: "Projeler",
    title: "Seçilmiş projeler.",
    description:
      "Üniversite, profesyonel ve kişisel çalışmaların yaşayan kataloğu. Her giriş; problem, kullanılan stack ve çıkarımı içerir. Kategori filtrele veya tüm listeyi gez.",
    filterAll: "Hepsi",
    filterUni: "Üniversite",
    filterPersonal: "Kişisel",
    filterWork: "Staj",
    filterResearch: "Araştırma",
    linkGithub: "Kod",
    linkDemo: "Demo",
    linkPaper: "Makale",
    emptyTitle: "Bu kategoride henüz proje yok.",
    emptyBody: "Başka bir filtre dene.",
  },
  tennis: {
    kicker: "Kortun dışında",
    title: "Tenisin bana öğrettikleri.",
    description:
      "2006'dan beri rekabetçi tenis; 2014'te Türkiye Junior Şampiyonu. Şu an 1. FC Nürnberg'de aktif oyuncu; Regensburg Üniversitesi ve FAU Erlangen-Nürnberg'de tenis antrenörlüğü yapıyorum. Kort, hâlâ güvendiğim alışkanlıkları öğretti: yapılandırılmış hazırlık, baskı altında soğukkanlılık ve uzun vadeli çalışmaya sabır.",
    stats: [
      { value: "2014", label: "Türkiye Junior Şampiyonu" },
      { value: "18+", label: "Kortta geçen yıl" },
      { value: "2", label: "Üniversitede antrenörlük" },
    ],
    lessons: [
      {
        title: "Disiplin",
        body: "Motivasyondan bağımsız, günlük ve yapılandırılmış çalışma. Aynı mantık mühendislikte de birikir: ortaya çıkarak kazanılan küçük, tutarlı ilerlemeler.",
      },
      {
        title: "Soğukkanlılık",
        body: "Sıkı maçlar, önemli anlarda berrak düşünmeyi öğretir. Bu refleks doğrudan prodüksiyon olaylarına ve yoğun teslim tarihlerine taşınır.",
      },
      {
        title: "Uzun vadeli düşünme",
        body: "Anlamlı ilerleme nadiren tek bir maçta görünür. Yazılımı da aynı sabırla kuruyorum: çıkar, ölç, iyileştir, ayarla.",
      },
    ],
  },
  contact: {
    kicker: "İletişim",
    title: "İletişime geç.",
    description:
      "Tam zamanlı pozisyonlar, stajlar ve araştırma iş birliklerine açığım. Genellikle bir iş günü içinde yanıt veririm.",
    leftHeading: "Doğrudan kanallar",
    leftBody:
      "Aşağıdaki kanalların herhangi birinden bana ulaşabilirsiniz. Proje talepleri için sağdaki form en güvenilir yoldur.",
    socials: {
      email: "E-posta",
      linkedin: "LinkedIn",
      github: "GitHub",
      instagram: "Instagram",
      facebook: "Facebook",
    },
    form: {
      nameLabel: "İsim",
      namePlaceholder: "Adınız",
      emailLabel: "E-posta",
      emailPlaceholder: "siz@domain.com",
      messageLabel: "Mesaj",
      messagePlaceholder: "Pozisyon, proje veya sorunuza dair kısa bir not.",
      submit: "Mesajı gönder",
      submitting: "Gönderiliyor…",
      success: "Mesaj iletildi.",
      successBody:
        "Teşekkürler. Bir iş günü içinde size dönüş yapacağım.",
      errorRequired: "Lütfen tüm alanları doldurun.",
      errorEmail: "Lütfen geçerli bir e-posta adresi girin.",
    },
  },
  footer: {
    built: "Next.js ile kuruldu.",
  },
};

const de: Dict = {
  nav: {
    home: "Start",
    journey: "Werdegang",
    projects: "Projekte",
    travel: "Reisen",
    think: "Ansatz",
    contact: "Kontakt",
    cv: "Lebenslauf",
    search: "Suchen",
  },
  hero: {
    status: "München · Offen für Praktika und Junior-Positionen",
    title1: "Daten, KI und",
    title2: "intelligente Sensorsysteme.",
    description:
      "M.Eng.-Kandidat in KI für intelligente Sensoren und Aktoren an der THD Deggendorf (Note 1,0). Praxiserfahrung in Datenanalytik bei Vodafone Türkei und KPMG; B.Sc. Informatik mit Vollstipendium an der Kadir-Has-Universität. Wettkampftennis beim 1. FC Nürnberg — Trainer für Studierende an der Universität Regensburg und der FAU Erlangen-Nürnberg.",
    ctaPrimary: "Werdegang ansehen",
    ctaSecondary: "Kontakt aufnehmen",
    ctaCv: "Lebenslauf herunterladen",
  },
  metrics: {
    years: "3+",
    yearsLabel: "Jahre in Daten und Analytics",
    projects: "2",
    projectsLabel: "Abschlüsse (B.Sc. + M.Eng. laufend)",
    countries: "12",
    countriesLabel: "Bereiste Länder",
    languages: "4",
    languagesLabel: "Sprachen — TR & EN fließend, DE & FR in Lernphase",
  },
  stack: { title: "Meine Werkzeuge" },
  selectedWork: {
    kicker: "Ausgewählte Erfahrung",
    title: "Aktuelle berufliche Stationen.",
    all: "Vollständigen Werdegang",
    items: [
      {
        kicker: "Vodafone Türkei",
        title: "Data-Science-Praktikant",
        summary:
          "KPI- und Performance-Analytik für Mobil- und Festnetzbreitband. Reporting in SQL, DBeaver und Tableau, eingesetzt in den wöchentlichen Senior-Management-Reviews.",
        metric: "2025 · Istanbul",
      },
      {
        kicker: "KPMG Türkei",
        title: "Data Analyst & Digital Trainee",
        summary:
          "Daten-, Analytics- und Automatisierungsprojekte zur Unterstützung der Betriebsmodell- und Reporting-Transformationen von Kunden.",
        metric: "2024–25 · Istanbul",
      },
      {
        kicker: "McKinsey & Company",
        title: "Forward Program — Digital Evolution",
        summary:
          "Ausgewählter Teilnehmer im Flaggschiff-Entwicklungsprogramm. Inhalte: strukturierte Problemlösung, digitale Strategie und analytische Kommunikation.",
        metric: "2023",
      },
    ],
  },
  journey: {
    kicker: "Werdegang",
    title: "Stationen, Studium und Auszeichnungen.",
    description:
      "Eine chronologische Übersicht der Arbeit und des Studiums, die mich hierher geführt haben.",
    filterAll: "Alle",
    filterWork: "Arbeit",
    filterEducation: "Studium",
    filterAchievement: "Auszeichnungen",
    present: "Heute",
    items: [
      {
        id: "thd-msc",
        type: "education",
        period: "2025 — Heute",
        title: "M.Eng. Künstliche Intelligenz für intelligente Sensoren & Aktoren",
        org: "Technische Hochschule Deggendorf",
        location: "Deutschland · Note 1,0",
        summary:
          "Anwendungsorientiertes Master-Programm mit Fokus auf intelligenter Sensorik. Kernthemen: KI, Machine Learning, Embedded Control, Systemdesign, Big Data und IoT-Kommunikation. Vollständig auf Englisch, F&E-orientiert.",
      },
      {
        id: "tennis-coach",
        type: "work",
        period: "2025 — Heute",
        title: "Tennistrainer",
        org: "Universität Regensburg & FAU Erlangen-Nürnberg",
        location: "Bayern, Deutschland",
        summary:
          "Gruppen- und Einzeltraining an zwei bayerischen Universitäten neben dem M.Eng.-Studium. Trainingsplanung, Technikschulung und Spielerentwicklung im Rahmen universitärer Sportprogramme.",
      },
      {
        id: "vodafone",
        type: "work",
        period: "Jan — Nov 2025",
        title: "Data-Science-Praktikant",
        org: "Vodafone Türkei",
        location: "Istanbul",
        summary:
          "KPI- und Performance-Analytik für die Segmente Mobil- und Festnetzbreitband mit SQL, DBeaver und Tableau. Strukturierte Schulungen in Data Science, Datenbankmanagement und Automatisierungswerkzeugen.",
      },
      {
        id: "kpmg",
        type: "work",
        period: "Sep 2024 — Jan 2025",
        title: "Data Analyst & Digital Trainee",
        org: "KPMG Türkei",
        location: "Istanbul",
        summary:
          "Daten-, Analytics- und Automatisierungsarbeiten zur Transformation von Betriebsmodellen bei Kunden. Beitrag zur Reporting-Infrastruktur und zu analytischen Ergebnissen für Projektteams.",
      },
      {
        id: "khas-cs",
        type: "education",
        period: "2022 — 2025",
        title: "B.Sc. Informatik",
        org: "Kadir-Has-Universität",
        location: "Istanbul",
        summary:
          "Vollstipendium; Programm vollständig auf Englisch. Module in Python, C++, SQL, Datenanalyse, Datenbanksystemen, Betriebssystemen und Software-Engineering-Grundlagen.",
      },
      {
        id: "mckinsey",
        type: "achievement",
        period: "2023",
        title: "McKinsey Forward Program — Digital Evolution",
        org: "McKinsey & Company",
        location: "Ausgewählter Teilnehmer",
        summary:
          "Ausgewählter Teilnehmer im Flaggschiff-Entwicklungsprogramm. Curriculum: digitale Transformation, strukturierte Problemlösung und analytisches Leadership.",
      },
      {
        id: "astay",
        type: "work",
        period: "Jul — Sep 2022",
        title: "Baustellen-Praktikant",
        org: "Astay Holding — Four Seasons Private Residences",
        location: "Istanbul",
        summary:
          "Fortschrittskontrolle und quantitative Berichterstattung über laufende Bauaktivitäten. Erste berufliche Berührung mit datenbasierten Operationen.",
      },
      {
        id: "khas-civil",
        type: "education",
        period: "2020 — 2022",
        title: "B.Sc. Bauingenieurwesen (gewechselt)",
        org: "Kadir-Has-Universität",
        location: "Istanbul",
        summary:
          "Höhere Mathematik, Wahrscheinlichkeit und Statistik, Dynamik physikalischer Systeme, angewandte Ingenieurmathematik und MATLAB. 2022 interner Wechsel zur Informatik.",
      },
      {
        id: "tennis",
        type: "achievement",
        period: "2014",
        title: "Türkischer Junioren-Tennismeister",
        org: "Türkischer Tennisverband",
        location: "Türkei",
        summary:
          "Nationaler Juniorenmeister. Tennis hat mir Gewohnheiten vermittelt, auf die ich noch immer zurückgreife: strukturierte Vorbereitung, Ruhe unter Druck und Geduld bei langfristiger Arbeit.",
      },
    ],
  },
  travel: {
    kicker: "Reisen",
    title: "Wo ich war.",
    description:
      "Zwölf Länder in Europa und der Türkei. Zu jedem Eintrag gibt es Fotos und kurze Notizen aus der Zeit vor Ort.",
    visited: "Besucht",
    selectHint: "Wählen Sie ein Land",
    noPhotos: "Fotos folgen.",
    cities: "Städte",
    year: "Jahr",
  },
  think: {
    kicker: "Ansatz",
    title: "Wie ich ein Problem angehe.",
    description:
      "Die Methoden, die ich verwende, und die Werkzeuge, auf die ich zurückgreife — ungefähr in der Reihenfolge, in der ich sie einsetze.",
    skillsTitle: "Werkzeugkasten",
    approachTitle: "Methode",
    approach: [
      {
        title: "01 · Die Entscheidung definieren",
        body: "Beginne mit der Entscheidung, die die Analyse stützen soll. Ohne eine zu treffende Entscheidung gibt es keine sinnvolle Analyse.",
      },
      {
        title: "02 · Die Daten profilieren",
        body: "Form, Volumen, Aktualität und Lücken untersuchen. Verstehen, was die Daten sind, bevor entschieden wird, was sie sagen sollen.",
      },
      {
        title: "03 · Das kleinste sinnvolle Experiment durchführen",
        body: "Den günstigsten Test wählen, der die Hypothese widerlegen könnte. Feedback-Geschwindigkeit schlägt Cleverness.",
      },
      {
        title: "04 · Sauber übergeben",
        body: "Annahmen dokumentieren, SQL schreiben, das natürlich liest, und Tests hinterlassen. Der nächste Wartende ist genauso Stakeholder wie der erste Leser.",
      },
      {
        title: "05 · Den Kreis schließen",
        body: "Berichten Sie nicht nur, was gelernt wurde, sondern was entschieden wurde. Prüfen, ob die Entscheidung trägt, und das Modell entsprechend aktualisieren.",
      },
    ],
    groups: [
      {
        title: "Programmierung",
        items: ["Python", "C++", "SQL", "TypeScript", "MATLAB"],
      },
      {
        title: "Daten & BI",
        items: ["Tableau", "Power BI", "DBeaver", "pandas", "NumPy"],
      },
      {
        title: "KI & Machine Learning",
        items: ["YOLOv8", "scikit-learn", "PyTorch", "Edge AI", "Intelligente Sensoren"],
      },
      {
        title: "Arbeitsweise",
        items: [
          "Agile (Scrum)",
          "Projektmanagement",
          "Stakeholder-Kommunikation",
          "Analytisches Schreiben",
        ],
      },
    ],
  },
  projects: {
    kicker: "Projekte",
    title: "Ausgewählte Projekte.",
    description:
      "Ein laufender Katalog universitärer, beruflicher und persönlicher Arbeiten. Jeder Eintrag enthält das Problem, den Stack und die Erkenntnis. Nach Kategorie filtern oder die gesamte Liste durchsehen.",
    filterAll: "Alle",
    filterUni: "Universität",
    filterPersonal: "Persönlich",
    filterWork: "Praktikum",
    filterResearch: "Forschung",
    linkGithub: "Code",
    linkDemo: "Demo",
    linkPaper: "Paper",
    emptyTitle: "Noch keine Projekte in dieser Kategorie.",
    emptyBody: "Bitte einen anderen Filter wählen.",
  },
  tennis: {
    kicker: "Abseits des Platzes",
    title: "Was Tennis mich gelehrt hat.",
    description:
      "Wettkampftennis seit 2006; türkischer Junior-Meister 2014. Derzeit aktiver Spieler beim 1. FC Nürnberg und Trainer an der Universität Regensburg und der FAU Erlangen-Nürnberg. Der Platz hat mir Gewohnheiten vermittelt, auf die ich heute noch baue: strukturierte Vorbereitung, Ruhe unter Druck und Geduld bei langfristiger Arbeit.",
    stats: [
      { value: "2014", label: "Türkischer Junior-Meister" },
      { value: "18+", label: "Jahre auf dem Platz" },
      { value: "2", label: "Hochschulen als Trainer" },
    ],
    lessons: [
      {
        title: "Disziplin",
        body: "Tägliches, strukturiertes Training, unabhängig von der Motivation. Dieselbe Logik wirkt im Engineering: kleine, konstante Fortschritte, erarbeitet durch beständiges Auftauchen.",
      },
      {
        title: "Ruhe",
        body: "Enge Matches schulen klares Denken im richtigen Moment. Diese Reflexe übertragen sich direkt auf Produktionsstörungen und enge Termine.",
      },
      {
        title: "Langfristiges Denken",
        body: "Bedeutsamer Fortschritt zeigt sich selten in einem einzelnen Match. Software baue ich mit derselben Geduld: ausliefern, messen, verfeinern, anpassen.",
      },
    ],
  },
  contact: {
    kicker: "Kontakt",
    title: "Kontakt aufnehmen.",
    description:
      "Offen für Festanstellungen, Praktika und Forschungskooperationen. Ich antworte in der Regel innerhalb eines Werktags.",
    leftHeading: "Direkte Kanäle",
    leftBody:
      "Sie erreichen mich über einen der unten stehenden Kanäle. Für Projektanfragen ist das Formular rechts der zuverlässigste Weg.",
    socials: {
      email: "E-Mail",
      linkedin: "LinkedIn",
      github: "GitHub",
      instagram: "Instagram",
      facebook: "Facebook",
    },
    form: {
      nameLabel: "Name",
      namePlaceholder: "Ihr Name",
      emailLabel: "E-Mail",
      emailPlaceholder: "sie@domain.com",
      messageLabel: "Nachricht",
      messagePlaceholder: "Eine kurze Notiz zur Rolle, zum Projekt oder zur Frage.",
      submit: "Nachricht senden",
      submitting: "Wird gesendet…",
      success: "Nachricht gesendet.",
      successBody:
        "Vielen Dank. Ich melde mich innerhalb eines Werktags zurück.",
      errorRequired: "Bitte alle Felder ausfüllen.",
      errorEmail: "Bitte eine gültige E-Mail-Adresse eingeben.",
    },
  },
  footer: {
    built: "Mit Next.js gebaut.",
  },
};

const DICTIONARIES: Record<Locale, Dict> = { en, tr, de };

/* -------------------- PROVIDER + HOOK -------------------- */

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
};

const LocaleContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "locale";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && (LOCALES as readonly string[]).includes(stored)) {
    return stored as Locale;
  }
  const nav = window.navigator.language.toLowerCase();
  if (nav.startsWith("tr")) return "tr";
  if (nav.startsWith("de")) return "de";
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    setLocaleState(getInitialLocale());
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({ locale, setLocale, t: DICTIONARIES[locale] }),
    [locale, setLocale]
  );

  return createElement(LocaleContext.Provider, { value }, children);
}

export function useT() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useT must be used inside <LanguageProvider>");
  }
  return ctx;
}
