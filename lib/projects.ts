/**
 * Projeler — iş başvurularında kullanacağın asıl vitrin.
 *
 * YENİ PROJE EKLEMEK İÇİN:
 *   1) Aşağıdaki PROJECTS dizisinin başına yeni bir {} objesi ekle.
 *   2) Dilediğin kategoriyi seç:
 *        "uni"       → Üniversite projeleri / okul ödevleri
 *        "work"      → Staj / iş projeleri (Vodafone, KPMG vb.)
 *        "personal"  → Kişisel / hobi projeleri
 *        "research"  → Araştırma / tez / akademik
 *   3) titles, summaries, descriptions → her dilde yaz (EN/TR/DE).
 *   4) tech → stack chip'leri olarak çıkar.
 *   5) links → varsa GitHub / demo / paper URL'leri.
 *   6) cover → /public/projects/<slug>.jpg veya benzeri. İstersen boş bırak,
 *       kart otomatik gradient kapak üretir.
 *   7) featured: true → karta "Öne çıkan" vurgusu gelir. 3 proje featured tut.
 *
 * Kategori renkleri: uni=yeşil, work=mavi, personal=mor, research=amber.
 */

import type { Locale } from "./i18n";

export type ProjectCategory = "uni" | "work" | "personal" | "research";

export type Project = {
  slug: string;
  year: string;
  category: ProjectCategory;
  featured?: boolean;
  titles: Record<Locale, string>;
  summaries: Record<Locale, string>;        // 1-2 cümle kart özeti
  descriptions?: Record<Locale, string>;    // opsiyonel, daha uzun
  tech: string[];                            // ["Python", "SQL", ...]
  tags?: string[];                           // ["Data Viz", "NLP"] vb.
  links?: { github?: string; demo?: string; paper?: string; api?: string };
  cover?: string;                            // "/projects/<slug>.jpg"
  role?: Record<Locale, string>;             // "Lead dev", "Team of 3" gibi
};

export const CATEGORY_COLORS: Record<ProjectCategory, string> = {
  uni: "#10b981",       // emerald
  work: "#378ADD",      // accent blue
  personal: "#8b5cf6",  // violet
  research: "#f59e0b",  // amber
};

export const PROJECTS: Project[] = [
  /* ──────────── RESEARCH ──────────── */
  {
    slug: "ariel",
    year: "2026",
    category: "research",
    featured: true,
    titles: {
      en: "Project Ariel — Low-Altitude Aerial Detection",
      tr: "Proje Ariel — Alçak İrtifa Hava Tespiti",
      de: "Projekt Ariel — Niedrigflug-Objekterkennung",
    },
    summaries: {
      en: "Research collaboration at THD × THI × Fraunhofer IVI: fine-tuned YOLOv8n achieving 91.8% mAP@0.5 on a custom low-altitude drone dataset. Real-time ready at 4.2 ms per frame.",
      tr: "THD × THI × Fraunhofer IVI araştırma iş birliği: özel alçak irtifa drone veri setinde %91,8 mAP@0.5 elde eden YOLOv8n. Kare başına 4,2 ms ile gerçek zamanlı hazır.",
      de: "Forschungskooperation THD × THI × Fraunhofer IVI: YOLOv8n mit 91,8 % mAP@0.5 auf Niedrigflug-Drohnen-Datensatz. Echtzeittauglich bei 4,2 ms/Frame.",
    },
    tech: ["Python", "YOLOv8n", "PyTorch", "OpenCV", "Roboflow", "X-AnyLabeling", "ONNX", "Google Colab"],
    tags: ["Research", "Computer Vision", "Edge AI"],
    role: {
      en: "ML Engineering — frame extraction, annotation methodology, dataset construction · Group-One, THD × THI",
      tr: "ML Mühendisliği — kare çıkarma, etiketleme metodolojisi, veri seti · Group-One, THD × THI",
      de: "ML Engineering — Frame-Extraktion, Annotationsmethodik, Datensatz · Group-One, THD × THI",
    },
    links: {
      github: "https://github.com/BUAksakal/low-altitude-aerial-detection",
      paper: "/projects/ariel/report.pdf",
    },
    cover: "/projects/ariel.svg",
  },

  /* ──────────── WORK ──────────── */
  {
    slug: "vodafone-kpi-dashboard",
    year: "2025",
    category: "work",
    featured: true,
    titles: {
      en: "Broadband KPI Analytics @ Vodafone",
      tr: "Vodafone'da Geniş Bant KPI Analitiği",
      de: "Breitband-KPI-Analytik bei Vodafone",
    },
    summaries: {
      en: "End-to-end KPI and performance analytics for Mobile and Fixed Broadband, used in senior-management decision-making.",
      tr: "Mobil ve Sabit Geniş Bant için uçtan uca KPI ve performans analitiği; üst yönetimin karar süreçlerinde kullanıldı.",
      de: "End-to-End-KPI- und Performance-Analytik für Mobil- und Festnetzbreitband, eingesetzt in Entscheidungsprozessen des Senior Managements.",
    },
    descriptions: {
      en: "Designed reusable SQL queries in DBeaver and built Tableau dashboards tracking Mobile and Fixed Broadband performance. Worked with the Data and Analytics team to convert open-ended business questions into concrete metrics and reports referenced by senior leadership in their weekly business reviews.",
      tr: "DBeaver'da tekrar kullanılabilir SQL sorguları tasarladım ve Mobil ile Sabit Geniş Bant performansını izleyen Tableau panoları geliştirdim. Data & Analytics ekibiyle birlikte açık uçlu iş sorularını somut metriklere ve raporlara dönüştürdüm; bu çıktılar üst yönetim tarafından haftalık iş değerlendirmelerinde kullanıldı.",
      de: "Wiederverwendbare SQL-Abfragen in DBeaver entworfen und Tableau-Dashboards zur Überwachung der Mobil- und Festnetzbreitband-Performance entwickelt. Gemeinsam mit dem Data-and-Analytics-Team offene Geschäftsfragen in konkrete Metriken und Berichte überführt, die von der Führungsebene in den wöchentlichen Business Reviews verwendet wurden.",
    },
    tech: ["SQL", "DBeaver", "Tableau", "Data Modeling"],
    tags: ["Analytics", "Reporting"],
    role: {
      en: "Data Science Intern · Istanbul",
      tr: "Veri Bilimi Stajyeri · İstanbul",
      de: "Data Science Praktikant · Istanbul",
    },
    cover: "/projects/vodafone-kpi-dashboard.svg",
  },
  {
    slug: "kpmg-automation",
    year: "2024",
    category: "work",
    titles: {
      en: "Data & Automation Solutions @ KPMG",
      tr: "KPMG'de Veri & Otomasyon Çözümleri",
      de: "Daten- & Automatisierungslösungen bei KPMG",
    },
    summaries: {
      en: "Analytics and automation engagements supporting client operating-model and data-strategy transformations.",
      tr: "Müşterilerin operasyon modeli ve veri stratejisi dönüşümlerini destekleyen analitik ve otomasyon projeleri.",
      de: "Analytics- und Automatisierungsprojekte zur Unterstützung von Betriebsmodell- und Datenstrategie-Transformationen bei Kunden.",
    },
    tech: ["SQL", "Python", "Power BI", "Agile"],
    tags: ["Consulting", "Automation"],
    role: {
      en: "Data Analyst & Digital Trainee · Istanbul",
      tr: "Veri Analisti & Dijital Trainee · İstanbul",
      de: "Data Analyst & Digital Trainee · Istanbul",
    },
  },

  /* ──────────── M.ENG. COURSEWORK ──────────── */
  {
    slug: "helmet-detection",
    year: "2026",
    category: "uni",
    featured: true,
    titles: {
      en: "PPE Helmet Detection — Live Cloud Deploy",
      tr: "Baret Tespiti — Canlı Cloud Deploy",
      de: "Helmerkennung — Live-Cloud-Deploy",
    },
    summaries: {
      en: "YOLOv8s fine-tuned for construction-site PPE compliance: 94.9% mAP@50, 103 FPS. Packaged as a FastAPI REST API + Streamlit dashboard, containerised in Docker, and deployed on Render with GitHub Actions CI/CD.",
      tr: "İnşaat alanı KKD uyumu için ince ayarlı YOLOv8s: %94,9 mAP@50, 103 FPS. FastAPI REST API + Streamlit dashboard olarak paketlendi, Docker'da containerize edildi ve GitHub Actions CI/CD ile Render'da deploy edildi.",
      de: "Feinabgestimmtes YOLOv8s für Baustellen-PSA-Compliance: 94,9 % mAP@50, 103 FPS. Als FastAPI REST API + Streamlit-Dashboard verpackt, in Docker containerisiert und mit GitHub Actions CI/CD auf Render deployed.",
    },
    descriptions: {
      en: "Final case study for the Machine Learning and Deep Learning course at THD Deggendorf — extended beyond coursework requirements into a full production deployment.\n\nModel: YOLOv8s trained on a curated PPE dataset. Achieved 94.9% mAP@50 at 103 FPS on GPU. Dataset quality and augmentation (mosaic, lighting shifts, perspective transforms) proved more impactful than model scaling.\n\nDeployment stack: inference wrapped in a FastAPI REST API, paired with an interactive Streamlit dashboard for live video upload and annotation preview. Both services containerised with Docker and deployed on Render. GitHub Actions handles CI/CD — every push to main triggers a rebuild and redeploy automatically.\n\nKey learning: the gap between held-out test accuracy and live-camera performance closed significantly after adding 200 frames from the actual deployment environment to the training set.",
      tr: "THD Deggendorf'ta Makine Öğrenmesi ve Derin Öğrenme dersi için nihai vaka çalışması — ders gerekliliklerinin ötesine geçilerek tam production deployment'a uzatıldı.\n\nModel: Özenle hazırlanmış bir KKD veri setinde eğitilmiş YOLOv8s. GPU'da 103 FPS'de %94,9 mAP@50 elde edildi. Model ölçeklendirmesinden çok veri seti kalitesi ve augmentasyon (mozaik, aydınlatma kaymaları, perspektif dönüşümler) belirleyici oldu.\n\nDeploy stack'i: çıkarım, FastAPI REST API'ya sarıldı; canlı video yükleme ve anotasyon önizlemesi için interaktif bir Streamlit dashboard ile eşleştirildi. Her iki servis Docker ile containerize edilerek Render'da deploy edildi. GitHub Actions CI/CD'yi yönetiyor — main'e her push yeniden build ve deploy'u tetikliyor.\n\nTemel öğrenim: Gerçek deployment ortamından 200 kare eğitim setine eklendikten sonra test doğruluğu ile canlı kamera performansı arasındaki uçurum önemli ölçüde kapandı.",
      de: "Abschließende Fallstudie für den Kurs Machine Learning and Deep Learning an der THD Deggendorf — über die Kursanforderungen hinaus zu einem vollständigen Produktions-Deployment ausgebaut.\n\nModell: YOLOv8s auf einem kuratierten PSA-Datensatz trainiert. 94,9 % mAP@50 bei 103 FPS auf GPU erreicht. Datensatzqualität und Augmentierung (Mosaik, Beleuchtungsverschiebungen, Perspektivtransformationen) erwiesen sich als wirkungsvoller als Model-Skalierung.\n\nDeployment-Stack: Inferenz in einer FastAPI REST API gekapselt, kombiniert mit einem interaktiven Streamlit-Dashboard für Live-Video-Upload und Annotationsvorschau. Beide Services in Docker containerisiert und auf Render deployed. GitHub Actions verwaltet CI/CD — jeder Push auf main löst automatisch einen Rebuild und Redeploy aus.\n\nKernlernpunkt: Die Lücke zwischen Test-Accuracy und Live-Kamera-Performance schloss sich deutlich, nachdem 200 Frames aus der tatsächlichen Deployment-Umgebung in den Trainingssatz aufgenommen wurden.",
    },
    tech: ["Python", "YOLOv8s", "PyTorch", "OpenCV", "FastAPI", "Docker", "Render", "GitHub Actions", "Streamlit"],
    tags: ["CV", "MLOps", "Edge AI", "Deploy"],
    role: {
      en: "Solo · M.Eng. coursework extended to full production deploy",
      tr: "Bireysel · Y.L. ders projesi → production deploy",
      de: "Einzelarbeit · M.Eng.-Kursarbeit bis zum produktiven Deploy",
    },
    links: {
      github: "https://github.com/salamon30/helmet-detection",
      demo: "https://helmet-streamlit.onrender.com",
      api: "https://helmet-detection-6kf7.onrender.com/docs",
    },
    cover: "/projects/helmet-detection/still-1.jpg",
  },

  /* ──────────── PERSONAL / OPEN-SOURCE ──────────── */
  {
    slug: "sensor-anomaly-detection",
    year: "2026",
    category: "personal",
    featured: true,
    titles: {
      en: "Sensor Anomaly Detection",
      tr: "Sensör Anomali Tespiti",
      de: "Sensor-Anomalie-Erkennung",
    },
    summaries: {
      en: "Personal study project on time-series ML: detection of anomalous patterns in sensor data, in preparation for the Edge AI work in my Master's programme.",
      tr: "Zaman-serisi ML üzerine kişisel çalışma projesi: sensör verilerinde anormal örüntülerin tespiti; yüksek lisanstaki Edge AI çalışmalarına hazırlık niteliğinde.",
      de: "Persönliches Studienprojekt zu Time-Series-ML: Erkennung anomaler Muster in Sensordaten als Vorbereitung auf die Edge-AI-Arbeit im Master-Programm.",
    },
    descriptions: {
      en: "Self-directed study in time-series machine learning, run alongside coursework. Benchmarks classical statistical baselines (rolling z-score, IQR) against learned approaches for anomaly detection in sensor streams. Designed as a reusable framework adaptable to different sensor types and domains.",
      tr: "Ders programıyla paralel yürütülen, kendi yön verdiğim bir zaman-serisi makine öğrenmesi çalışması. Sensör akışlarında anomali tespiti için klasik istatistiksel temel modelleri (kayan z-skor, IQR), öğrenilmiş yaklaşımlarla karşılaştırır. Farklı sensör türlerine ve alanlara uyarlanabilen yeniden kullanılabilir bir çerçeve olarak tasarlandı.",
      de: "Eigenständige Untersuchung im Bereich Time-Series-Machine-Learning, parallel zum Studium durchgeführt. Vergleicht klassische statistische Baselines (rollender z-Score, IQR) mit gelernten Ansätzen zur Anomalie-Erkennung in Sensorströmen. Konzipiert als wiederverwendbares Framework, das sich an unterschiedliche Sensortypen und Domänen anpassen lässt.",
    },
    tech: ["Python", "scikit-learn", "NumPy", "pandas", "Matplotlib", "Time Series"],
    tags: ["ML", "Sensors", "Edge AI"],
    role: {
      en: "Solo · personal study",
      tr: "Bireysel · kişisel çalışma",
      de: "Einzelarbeit · Eigenstudium",
    },
    links: { github: "https://github.com/salamon30/sensor-anomaly-detection" },
    cover: "/projects/sensor-anomaly-detection.png",
  },

  /* ──────────── UNIVERSITY ──────────── */
  {
    slug: "cool-cooling",
    year: "2025",
    category: "uni",
    featured: true,
    titles: {
      en: "Cool-Cooling — B.Sc. Graduation Thesis",
      tr: "Cool-Cooling — Lisans Bitirme Tezi",
      de: "Cool-Cooling — Bachelor-Abschlussarbeit",
    },
    summaries: {
      en: "Bachelor graduation thesis: design, simulation and analysis of a cooling system using a Python toolchain.",
      tr: "Lisans bitirme tezi: Python araç zinciri ile bir soğutma sisteminin tasarımı, simülasyonu ve analizi.",
      de: "Bachelor-Abschlussarbeit: Entwurf, Simulation und Analyse eines Kühlsystems mit einer Python-Toolchain.",
    },
    descriptions: {
      en: "Bachelor thesis at Kadir Has University (defended 2025). Parameterised the cooling system, simulated steady-state and transient behaviour, and visualised the resulting performance trade-offs. The thesis combined applied thermodynamics with computational analysis and shaped my move toward data-driven engineering.",
      tr: "Kadir Has Üniversitesi'nde lisans bitirme tezi (2025'te savundum). Soğutma sistemini parametrize ettim, kararlı durum ve geçici davranışı simüle ettim ve ortaya çıkan performans ödünleşimlerini görselleştirdim. Tez, uygulamalı termodinamik ile hesaplamalı analizi birleştirdi ve veri odaklı mühendisliğe geçişimi şekillendirdi.",
      de: "Bachelor-Abschlussarbeit an der Kadir-Has-Universität (verteidigt 2025). Kühlsystem parametrisiert, stationäres und transientes Verhalten simuliert und die resultierenden Performance-Trade-offs visualisiert. Die Arbeit verband angewandte Thermodynamik mit rechnergestützter Analyse und prägte meinen Übergang in die datenorientierte Ingenieurspraxis.",
    },
    tech: ["Python", "NumPy", "Matplotlib", "Simulation"],
    tags: ["Thermodynamics", "Engineering", "Simulation"],
    role: {
      en: "Solo · graduation thesis",
      tr: "Bireysel · bitirme tezi",
      de: "Einzelarbeit · Abschlussarbeit",
    },
    links: { github: "https://github.com/salamon30/cool-cooling" },
    cover: "/projects/cool-cooling.svg",
  },
  {
    slug: "cinema-app",
    year: "2024",
    category: "uni",
    titles: {
      en: "CinemaApp — Database Systems",
      tr: "CinemaApp — Veritabanı Sistemleri",
      de: "CinemaApp — Datenbanksysteme",
    },
    summaries: {
      en: "Database Systems coursework: a cinema-booking application covering relational schema design, transactions and query optimisation.",
      tr: "Veritabanı Sistemleri dersi projesi: ilişkisel şema tasarımı, işlemler ve sorgu optimizasyonunu kapsayan bir sinema rezervasyon uygulaması.",
      de: "Kursarbeit Datenbanksysteme: eine Kino-Buchungs-Anwendung mit relationalem Schemaentwurf, Transaktionen und Query-Optimierung.",
    },
    tech: ["Java", "SQL"],
    tags: ["Databases", "Full-stack"],
    role: {
      en: "Coursework · Kadir Has",
      tr: "Ders projesi · Kadir Has",
      de: "Kursarbeit · Kadir Has",
    },
    links: { github: "https://github.com/salamon30/CinemaApp" },
  },
  {
    slug: "bookshelf-genious",
    year: "2024",
    category: "uni",
    titles: {
      en: "BookShelf Genius — Web Development",
      tr: "BookShelf Genius — Web Geliştirme",
      de: "BookShelf Genius — Webentwicklung",
    },
    summaries: {
      en: "Web Development coursework in TypeScript: a book-tracking interface covering component composition and typed state management.",
      tr: "TypeScript ile Web Geliştirme dersi projesi: bileşen kompozisyonu ve tipli durum yönetimini kapsayan bir kitap takip arayüzü.",
      de: "Webentwicklungs-Kursarbeit in TypeScript: eine Buchverfolgungs-Oberfläche mit Komponentenkomposition und typisierter Zustandsverwaltung.",
    },
    tech: ["TypeScript", "React"],
    tags: ["Frontend"],
    role: {
      en: "Coursework · Kadir Has",
      tr: "Ders projesi · Kadir Has",
      de: "Kursarbeit · Kadir Has",
    },
    links: { github: "https://github.com/salamon30/bookShelfGenious" },
  },
  {
    slug: "library-java",
    year: "2024",
    category: "uni",
    titles: {
      en: "Library Management — Object-Oriented Programming",
      tr: "Kütüphane Yönetimi — Nesne Tabanlı Programlama",
      de: "Bibliotheksverwaltung — Objektorientierte Programmierung",
    },
    summaries: {
      en: "OOP coursework: a Java library-management system covering inheritance, encapsulation and file-based persistence.",
      tr: "Nesne Tabanlı Programlama dersi projesi: kalıtım, kapsülleme ve dosya tabanlı kalıcılığı kapsayan bir Java kütüphane yönetim sistemi.",
      de: "OOP-Kursarbeit: ein Java-Bibliotheksverwaltungssystem mit Vererbung, Kapselung und dateibasierter Persistenz.",
    },
    tech: ["Java", "OOP"],
    tags: ["Backend"],
    role: {
      en: "Coursework · Kadir Has",
      tr: "Ders projesi · Kadir Has",
      de: "Kursarbeit · Kadir Has",
    },
    links: { github: "https://github.com/salamon30/library-java" },
  },
  {
    slug: "programming-fundamentals",
    year: "2023",
    category: "uni",
    titles: {
      en: "Programming Fundamentals — Exercises",
      tr: "Programlamaya Giriş — Egzersizler",
      de: "Programmiergrundlagen — Übungen",
    },
    summaries: {
      en: "Multi-language exercise collection (Python, C++, Java) covering algorithms, data structures and clean-coding fundamentals.",
      tr: "Çok dilli (Python, C++, Java) egzersiz koleksiyonu; algoritmalar, veri yapıları ve temiz kod temellerini kapsar.",
      de: "Mehrsprachige Übungssammlung (Python, C++, Java) zu Algorithmen, Datenstrukturen und Grundlagen sauberer Programmierung.",
    },
    tech: ["Python", "C++", "Java"],
    tags: ["Fundamentals"],
    role: {
      en: "Self-study",
      tr: "Kendi çalışmam",
      de: "Eigenstudium",
    },
    links: { github: "https://github.com/salamon30/Programlamaya-Giris" },
  },

  /* ──────────── PERSONAL — META ──────────── */
  {
    slug: "personal-portfolio",
    year: "2026",
    category: "personal",
    titles: {
      en: "This portfolio",
      tr: "Bu portfolyo",
      de: "Dieses Portfolio",
    },
    summaries: {
      en: "Trilingual (EN/TR/DE) portfolio with light and dark themes, an interactive world map, command palette and filterable timeline.",
      tr: "Üç dilli (EN/TR/DE) portfolyo; aydınlık ve karanlık tema, etkileşimli dünya haritası, komut paleti ve filtrelenebilir zaman çizelgesi.",
      de: "Dreisprachiges Portfolio (EN/TR/DE) mit hellem und dunklem Theme, interaktiver Weltkarte, Befehlspalette und filterbarem Zeitstrahl.",
    },
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "react-simple-maps",
      "Resend",
    ],
    tags: ["Web", "Design", "i18n"],
    role: {
      en: "Built from scratch",
      tr: "Sıfırdan geliştirdim",
      de: "Von Grund auf entwickelt",
    },
    links: { github: "https://github.com/salamon30/portfolio" },
  },
];
