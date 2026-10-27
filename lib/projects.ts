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
    cover: "/projects/ariel/cover.jpg",
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
    slug: "medical-ai-paper-qa",
    year: "2026",
    category: "personal",
    featured: true,
    titles: {
      en: "Medical AI Paper QA — Evaluated RAG Pipeline",
      tr: "Medical AI Paper QA — Değerlendirilmiş RAG Sistemi",
      de: "Medical AI Paper QA — Evaluierte RAG-Pipeline",
    },
    summaries: {
      en: "Retrieval-augmented question answering over medical-AI research papers with two-stage retrieval: every answer cites the exact passage and page, and a measured reranker upgrade took the system from 5 refusals to 0 on the evaluation set.",
      tr: "Tıbbi yapay zeka makaleleri üzerinde iki aşamalı retrieval ile RAG tabanlı soru-cevap: her cevap kaynak pasajı ve sayfayı gösteriyor, ölçülerek eklenen bir reranker değerlendirme setindeki ret sayısını 5'ten 0'a indirdi.",
      de: "Retrieval-Augmented Question Answering über Forschungsarbeiten zu medizinischer KI mit zweistufigem Retrieval: Jede Antwort zitiert die genaue Textstelle und Seite, und ein gemessenes Reranker-Upgrade senkte die Verweigerungen im Evaluationsset von 5 auf 0.",
    },
    descriptions: {
      en: "An end-to-end RAG system built in stages, each measured before moving on.\n\nPipeline: PDFs are parsed page by page and split into ~500-token chunks, embedded locally with bge-small and stored in ChromaDB with source and page metadata. A question first retrieves the top 50 chunks by vector similarity; a cross-encoder reranker then reads the question together with each candidate and keeps the 5 that actually answer it. An LLM (NVIDIA NIM) answers only from those passages, cites every claim as [n], and says \"I don't know\" when the evidence is missing.\n\nEvaluation: a 20-question test set built from the papers measures retrieval (hit@k, MRR, right page in top 5) and answer quality with an LLM judge. Vector search alone found the right paper but the right page only 45% of the time, so the model correctly refused 5 questions. Adding the reranker — the only change between runs — raised that to 90%, removed every refusal and lifted judged correctness from 3.95 to 5.0 / 5. A fast retrieval-only mode compared two rerankers; the smaller one matched the larger at ~6x lower latency and became the default.\n\nThe evaluation also exposed bugs that were then fixed: an embedding model that silently truncated half of every chunk, chunk text that the tokenizer had lowercased and mangled, and an LLM judge that rated refusals as correct. A Streamlit UI shows each answer with its cited sources and each source's rank before and after reranking.",
      tr: "Aşama aşama kurulmuş, her aşaması bir sonrakine geçmeden ölçülmüş uçtan uca bir RAG sistemi.\n\nAkış: PDF'ler sayfa sayfa okunup ~500 tokenlık parçalara bölünüyor, bge-small ile yerelde vektöre çevriliyor ve kaynak ve sayfa bilgisiyle ChromaDB'ye kaydediliyor. Bir soru önce vektör benzerliğiyle en iyi 50 parçayı getiriyor. Ardından bir cross-encoder reranker soruyu her adayla birlikte okuyup soruyu gerçekten cevaplayan 5 parçayı seçiyor. Bir LLM (NVIDIA NIM) sadece bu pasajlardan cevap veriyor, her iddiayı [n] ile kaynaklıyor ve kanıt yoksa \"bilmiyorum\" diyor.\n\nDeğerlendirme: makalelerden hazırlanan 20 soruluk bir test seti retrieval'ı (hit@k, MRR, doğru sayfanın ilk 5'te olması) ve cevap kalitesini bir LLM hakemle ölçüyor. Tek başına vektör araması doğru makaleyi buluyordu ama doğru sayfayı sadece %45 oranında getiriyordu, bu yüzden model 5 soruda haklı olarak cevap vermedi. İki çalıştırma arasındaki tek değişiklik olan reranker bu oranı %90'a çıkardı, tüm retleri ortadan kaldırdı ve hakemin doğruluk puanını 3,95'ten 5,0 / 5'e yükseltti. Hızlı bir retrieval modu iki reranker'ı karşılaştırdı. Küçük model, büyüğüyle aynı isabeti yaklaşık 6 kat daha hızlı verdiği için varsayılan oldu.\n\nDeğerlendirme ayrıca sonradan düzeltilen hataları ortaya çıkardı: her parçanın yarısını sessizce kesen bir embedding modeli, tokenizer'ın küçük harfe çevirip bozduğu parça metinleri ve ret cevaplarını doğru sayan bir LLM hakem. Streamlit arayüzü her cevabı kaynaklarıyla ve her kaynağın reranker öncesi ve sonrası sırasıyla gösteriyor.",
      de: "Ein End-to-End-RAG-System, stufenweise gebaut und jede Stufe gemessen, bevor es weiterging.\n\nPipeline: PDFs werden seitenweise eingelesen, in Chunks von ca. 500 Tokens zerlegt, lokal mit bge-small eingebettet und mit Quellen- und Seiten-Metadaten in ChromaDB gespeichert. Eine Frage ruft zuerst die 50 ähnlichsten Chunks per Vektorsuche ab. Ein Cross-Encoder-Reranker liest dann die Frage zusammen mit jedem Kandidaten und behält die 5, die sie tatsächlich beantworten. Ein LLM (NVIDIA NIM) antwortet nur aus diesen Passagen, belegt jede Aussage mit [n] und sagt \"Ich weiß es nicht\", wenn die Belege fehlen.\n\nEvaluation: Ein aus den Papers erstelltes Testset mit 20 Fragen misst das Retrieval (hit@k, MRR, richtige Seite in den Top 5) und die Antwortqualität mit einem LLM-Judge. Die Vektorsuche allein fand das richtige Paper, die richtige Seite aber nur in 45 % der Fälle, weshalb das Modell 5 Fragen zu Recht verweigerte. Der Reranker, die einzige Änderung zwischen den Läufen, hob das auf 90 %, beseitigte alle Verweigerungen und steigerte die bewertete Korrektheit von 3,95 auf 5,0 / 5. Ein schneller Retrieval-Modus verglich zwei Reranker; das kleinere Modell erreichte dieselbe Trefferquote bei etwa 6-mal geringerer Latenz und wurde Standard.\n\nDie Evaluation deckte zudem Fehler auf, die anschließend behoben wurden: ein Embedding-Modell, das die Hälfte jedes Chunks stillschweigend abschnitt, Chunk-Text, den der Tokenizer kleingeschrieben und verstümmelt hatte, und ein LLM-Judge, der Verweigerungen als korrekt bewertete. Eine Streamlit-Oberfläche zeigt jede Antwort mit ihren zitierten Quellen und dem Rang jeder Quelle vor und nach dem Reranking.",
    },
    tech: ["Python", "ChromaDB", "sentence-transformers", "Cross-encoder reranking", "NVIDIA NIM", "Streamlit"],
    tags: ["RAG", "LLM Evaluation", "Healthcare AI"],
    role: {
      en: "Solo · design, implementation and evaluation",
      tr: "Bireysel · tasarım, geliştirme ve değerlendirme",
      de: "Einzelarbeit · Design, Umsetzung und Evaluation",
    },
    links: { github: "https://github.com/salamon30/rag-project" },
    cover: "/projects/medical-ai-paper-qa.png",
  },
  {
    slug: "physical-ai-learning-loop",
    year: "2026",
    category: "personal",
    featured: true,
    titles: {
      en: "Physical AI Learning Loop — Siemens Healthineers Hackathon",
      tr: "Fiziksel YZ Öğrenme Döngüsü — Siemens Healthineers Hackathon",
      de: "Physical-AI-Lernschleife — Siemens Healthineers Hackathon",
    },
    summaries: {
      en: "Team project at the Siemens Healthineers Robotics & AI Hackathon 2026 in Erlangen: a learning loop that turns robot demonstrations into an evaluated robot policy.",
      tr: "Erlangen'deki Siemens Healthineers Robotics & AI Hackathon 2026'da takım projesi: robot gösterimlerini değerlendirilmiş bir robot politikasına dönüştüren bir öğrenme döngüsü.",
      de: "Teamprojekt beim Siemens Healthineers Robotics & AI Hackathon 2026 in Erlangen: eine Lernschleife, die Roboter-Demonstrationen in eine evaluierte Roboter-Policy überführt.",
    },
    descriptions: {
      en: "The challenge asked how robots in a clinical setting can learn new skills from demonstrations instead of task-specific programming. Our team built the learning loop around a simulated robot: preparing the demonstration data, training a policy, evaluating it and feeding the results back into the next round. I worked on dataset quality analysis, evaluation and the self-improving part of the loop. Details stay internal, as the challenge data is confidential.",
      tr: "Görev, klinik ortamdaki robotların göreve özel programlama yerine gösterimlerden nasıl yeni beceriler öğrenebileceğiydi. Takımımız simüle bir robot etrafında öğrenme döngüsünü kurdu: gösterim verisini hazırlamak, bir politika eğitmek, onu değerlendirmek ve sonuçları bir sonraki tura geri beslemek. Ben veri seti kalite analizi, değerlendirme ve döngünün kendini geliştiren kısmı üzerinde çalıştım. Görev verisi gizli olduğu için ayrıntılar paylaşılmıyor.",
      de: "Die Aufgabe: Wie können Roboter im klinischen Umfeld neue Fähigkeiten aus Demonstrationen lernen statt durch aufgabenspezifische Programmierung? Unser Team hat die Lernschleife rund um einen simulierten Roboter gebaut: Demonstrationsdaten aufbereiten, eine Policy trainieren, sie evaluieren und die Ergebnisse in die nächste Runde zurückführen. Ich habe an der Datenqualitätsanalyse, der Evaluation und dem selbstverbessernden Teil der Schleife gearbeitet. Details bleiben intern, da die Challenge-Daten vertraulich sind.",
    },
    tech: ["Python", "Robot Learning", "Simulation", "MLflow"],
    tags: ["Robotics", "Physical AI", "MLOps"],
    role: {
      en: "Team · data quality, evaluation, learning loop",
      tr: "Takım · veri kalitesi, değerlendirme, öğrenme döngüsü",
      de: "Team · Datenqualität, Evaluation, Lernschleife",
    },
    cover: "/projects/physical-ai-learning-loop.svg",
  },
  {
    slug: "fin-agent-intelligence",
    year: "2026",
    category: "personal",
    titles: {
      en: "Fin-Agent Intelligence — Personal Finance Dashboard",
      tr: "Fin-Agent Intelligence — Kişisel Finans Panosu",
      de: "Fin-Agent Intelligence — Persönliches Finanz-Dashboard",
    },
    summaries: {
      en: "Full-stack finance dashboard with an LLM tool-calling agent: multi-currency credit-card tracking, PDF statement parsing, FX-cost analysis, and a 6-month cash-flow projection with what-if scenarios. In active daily use.",
      tr: "LLM tool-calling ajanlı uçtan uca finans panosu: çoklu para birimli kredi kartı takibi, PDF ekstre okuma, kur maliyeti analizi ve senaryo destekli 6 aylık nakit akışı projeksiyonu. Her gün aktif kullanılıyor.",
      de: "Full-Stack-Finanz-Dashboard mit einem Tool-Calling-LLM-Agenten: Multi-Currency-Kreditkartenverfolgung, PDF-Kontoauszug-Parsing, FX-Kostenanalyse und eine 6-Monats-Cashflow-Projektion mit Was-wäre-wenn-Szenarien. Im täglichen aktiven Einsatz.",
    },
    descriptions: {
      en: "A personal finance tool built to track real multi-currency credit cards across different countries, run as an iterative, long-term build rather than a one-off assignment.\n\nBackend: FastAPI + SQLAlchemy, with a PDF/OCR statement parser that reads real bank e-statements (text and scanned) and reconciles them against previously recorded transactions, correcting amounts on re-upload instead of duplicating rows. A dedicated FX-cost engine computes the real markup a card charges on foreign purchases, with historical exchange rates pulled from stored rate data rather than assumed.\n\nAI agent: a genuine tool-calling LLM agent (NVIDIA NIM, OpenAI-compatible) with ~15 financial tools — net worth, FX card recommendations, trip cost analysis, installment schedules, cash-flow projections. Any action that would modify a financial record goes through a human-in-the-loop confirmation step by architecture: the LLM can only ever propose a write, a separate endpoint with no corresponding tool performs it. All tool calls are logged with latency/token metadata for observability, deliberately excluding the financial values themselves.\n\nCash-flow engine: a 6-month net-worth projection seeded from real current balances, plus a what-if scenario simulator (FX-rate shocks, delayed income, lump-sum debt payoff) that is guaranteed never to write to the real financial records — simulation and reality are kept in fully separate code paths.\n\nBuilt and iterated over many sessions — audits, bug fixes and new features, each backed by a real regression test and verified against real data rather than assumed correct.",
      tr: "Farklı ülkelerdeki gerçek, çoklu para birimli kredi kartlarını takip etmek için yapılmış kişisel bir finans aracı — tek seferlik bir ödev değil, uzun soluklu, yinelemeli bir geliştirme olarak sürdürülüyor.\n\nBackend: FastAPI + SQLAlchemy; gerçek banka e-ekstrelerini (metin ve taranmış) okuyan bir PDF/OCR ayrıştırıcı, bunları daha önce kaydedilmiş işlemlerle karşılaştırıp yeniden yüklemede satırları çoğaltmak yerine tutarları düzeltiyor. Ayrı bir kur maliyeti motoru, bir kartın yurt dışı harcamalarda gerçekte ne kadar kur farkı/komisyon kestiğini, varsayılan değil kayıtlı geçmiş kur verisiyle hesaplıyor.\n\nAI ajan: ~15 finansal araca sahip, gerçek tool-calling yapan bir LLM ajanı (NVIDIA NIM, OpenAI uyumlu) — net varlık, kur bazlı kart önerisi, seyahat maliyet analizi, taksit takvimi, nakit akışı projeksiyonu. Finansal bir kaydı değiştirecek her eylem, mimari düzeyde insan onayından geçiyor: LLM sadece bir yazma işlemini önerebilir, bunu gerçekleştiren ayrı bir endpoint'in karşılığında hiçbir araç tanımı yok. Tüm araç çağrıları gecikme/token metadatasıyla loglanıyor, finansal değerlerin kendisi kasıtlı olarak hariç tutuluyor.\n\nNakit akışı motoru: gerçek güncel bakiyelerden başlayan 6 aylık net varlık projeksiyonu, artı gerçek kayıtlara asla yazmadığı garanti edilen bir what-if senaryo simülatörü (kur şoku, gecikmeli gelir, toplu borç ödemesi) — simülasyon ve gerçek veri tamamen ayrı kod yollarında tutuluyor.\n\nBirçok oturum boyunca yinelemeli olarak geliştirildi — denetimler, hata düzeltmeleri ve yeni özellikler, her biri gerçek bir regresyon testiyle desteklenip gerçek veriyle doğrulandı.",
      de: "Ein persönliches Finanztool zur Verfolgung echter Multi-Currency-Kreditkarten in verschiedenen Ländern — als iterativer Langzeit-Build geführt, nicht als einmalige Aufgabe.\n\nBackend: FastAPI + SQLAlchemy mit einem PDF/OCR-Kontoauszug-Parser, der echte Bank-E-Kontoauszüge (Text und gescannt) liest und mit zuvor erfassten Transaktionen abgleicht — bei erneutem Upload werden Beträge korrigiert statt Zeilen dupliziert. Eine dedizierte FX-Kosten-Engine berechnet den tatsächlichen Aufschlag, den eine Karte bei Fremdwährungskäufen berechnet, basierend auf gespeicherten historischen Wechselkursen statt Annahmen.\n\nKI-Agent: ein echter Tool-Calling-LLM-Agent (NVIDIA NIM, OpenAI-kompatibel) mit ca. 15 Finanz-Tools — Nettovermögen, FX-Kartenempfehlungen, Reisekostenanalyse, Ratenzahlungspläne, Cashflow-Projektionen. Jede Aktion, die einen Finanzdatensatz ändern würde, durchläuft architektonisch einen Human-in-the-Loop-Bestätigungsschritt: Das LLM kann einen Schreibvorgang nur vorschlagen, ein separater Endpunkt ohne zugehöriges Tool führt ihn aus. Alle Tool-Aufrufe werden mit Latenz-/Token-Metadaten protokolliert, die eigentlichen Finanzwerte bewusst ausgeschlossen.\n\nCashflow-Engine: eine 6-Monats-Nettovermögensprojektion, ausgehend von echten aktuellen Salden, plus ein Was-wäre-wenn-Szenario-Simulator (FX-Kursschocks, verzögertes Einkommen, Einmalzahlung auf Schulden), der garantiert nie in die echten Finanzdatensätze schreibt — Simulation und Realität bleiben in vollständig getrennten Codepfaden.\n\nÜber viele Sitzungen hinweg iterativ entwickelt — Audits, Bugfixes und neue Features, jeweils durch einen echten Regressionstest abgesichert und gegen echte Daten verifiziert statt als korrekt angenommen.",
    },
    tech: ["Python", "FastAPI", "SQLAlchemy", "React", "TypeScript", "Recharts", "NVIDIA NIM", "SQLite"],
    tags: ["FinTech", "LLM Agent", "Full-Stack"],
    role: {
      en: "Solo · personal project, in active daily use",
      tr: "Bireysel · kişisel proje, her gün aktif kullanımda",
      de: "Einzelarbeit · persönliches Projekt, im täglichen aktiven Einsatz",
    },
    cover: "/projects/fin-agent-intelligence.png",
  },
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
      en: "Personal study project on unsupervised ML: flagging faulty readings in multivariate sensor data with an Isolation Forest, in preparation for the Edge AI work in my Master's programme.",
      tr: "Denetimsiz ML üzerine kişisel çalışma projesi: çok değişkenli sensör verisinde hatalı okumaların Isolation Forest ile tespiti; yüksek lisanstaki Edge AI çalışmalarına hazırlık niteliğinde.",
      de: "Persönliches Studienprojekt zu unüberwachtem ML: Erkennung fehlerhafter Messwerte in multivariaten Sensordaten mit einem Isolation Forest, als Vorbereitung auf die Edge-AI-Arbeit im Master-Programm.",
    },
    descriptions: {
      en: "Self-directed study in unsupervised anomaly detection, run alongside coursework. A configurable pipeline simulates temperature, vibration and pressure readings for normal operation and injected faults, standardises them and flags outliers with an Isolation Forest — no labels needed for training. It renders a 4-panel diagnostic dashboard and scores the result against the known ground truth (precision, recall and F1 of 95% on the default 220-reading run).",
      tr: "Ders programıyla paralel yürüttüğüm, denetimsiz anomali tespiti üzerine kişisel bir çalışma. Yapılandırılabilir bir pipeline, normal çalışma ve eklenmiş arızalar için sıcaklık, titreşim ve basınç okumaları üretir, bunları standartlaştırır ve aykırı değerleri Isolation Forest ile işaretler — eğitim için etiket gerekmez. 4 panelli bir tanı panosu çizer ve sonucu bilinen gerçek etiketlere göre değerlendirir (varsayılan 220 okumalık çalıştırmada precision, recall ve F1 %95).",
      de: "Eigenständige Untersuchung zur unüberwachten Anomalie-Erkennung, parallel zum Studium durchgeführt. Eine konfigurierbare Pipeline simuliert Temperatur-, Vibrations- und Druckwerte für Normalbetrieb und eingestreute Fehler, standardisiert sie und markiert Ausreißer mit einem Isolation Forest — ohne gelabelte Trainingsdaten. Sie erzeugt ein 4-Panel-Diagnose-Dashboard und bewertet das Ergebnis gegen die bekannte Ground Truth (Precision, Recall und F1 von 95 % im Standardlauf mit 220 Messwerten).",
    },
    tech: ["Python", "scikit-learn", "Isolation Forest", "NumPy", "pandas", "Matplotlib"],
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
      en: "Cooling-System Digital Twin — B.Sc. Thesis",
      tr: "Soğutma Sistemi Dijital İkizi — Lisans Bitirme Tezi",
      de: "Digitaler Zwilling eines Kühlsystems — Bachelorarbeit",
    },
    summaries: {
      en: "Bachelor graduation thesis: a Python-based digital twin of a cooling system — parameterised design, steady-state and transient simulation, and performance analysis.",
      tr: "Lisans bitirme tezi: Python tabanlı bir soğutma sistemi dijital ikizi — parametrik tasarım, kararlı durum ve geçici rejim simülasyonu, performans analizi.",
      de: "Bachelor-Abschlussarbeit: ein Python-basierter digitaler Zwilling eines Kühlsystems — parametrisierter Entwurf, stationäre und transiente Simulation, Performance-Analyse.",
    },
    descriptions: {
      en: "Bachelor thesis at Kadir Has University (defended 2025). Built a digital twin of the cooling system in Python: parameterised the physical design, simulated steady-state and transient behaviour, and visualised the resulting performance trade-offs. The thesis combined applied thermodynamics with computational analysis and shaped my move toward data-driven engineering.",
      tr: "Kadir Has Üniversitesi'nde lisans bitirme tezi (2025'te savundum). Soğutma sisteminin Python ile dijital ikizini kurdum: fiziksel tasarımı parametrize ettim, kararlı durum ve geçici davranışı simüle ettim ve ortaya çıkan performans ödünleşimlerini görselleştirdim. Tez, uygulamalı termodinamik ile hesaplamalı analizi birleştirdi ve veri odaklı mühendisliğe geçişimi şekillendirdi.",
      de: "Bachelor-Abschlussarbeit an der Kadir-Has-Universität (verteidigt 2025). Digitalen Zwilling des Kühlsystems in Python aufgebaut: physischen Entwurf parametrisiert, stationäres und transientes Verhalten simuliert und die resultierenden Performance-Trade-offs visualisiert. Die Arbeit verband angewandte Thermodynamik mit rechnergestützter Analyse und prägte meinen Übergang in die datenorientierte Ingenieurspraxis.",
    },
    tech: ["Python", "NumPy", "Matplotlib", "Simulation"],
    tags: ["Digital Twin", "Thermodynamics", "Simulation"],
    role: {
      en: "Solo · graduation thesis",
      tr: "Bireysel · bitirme tezi",
      de: "Einzelarbeit · Abschlussarbeit",
    },
    links: { github: "https://github.com/salamon30/cool-cooling" },
    cover: "/projects/cool-cooling.svg",
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
