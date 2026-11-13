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
 *   7) featured: true → karta "Öne çıkan" vurgusu gelir. 4 proje featured tut.
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
  highlights?: { value: string; label: Record<Locale, string> }[]; // detay sayfasında sonuç kutuları
  media?: string;                            // detay sayfasında kapak yerine gösterilir (ör. demo GIF)
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
    cover: "/projects/kpmg-automation.svg",
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
    slug: "car-assistant-eval",
    year: "2026",
    category: "personal",
    featured: true,
    titles: {
      en: "In-Car Voice Assistant — Multi-Fidelity Evaluation",
      tr: "Araç İçi Sesli Asistan — Çok Seviyeli Değerlendirme",
      de: "Sprachassistent im Auto — Multi-Fidelity-Evaluation",
    },
    summaries: {
      en: "An LLM car assistant tested at three levels of realism: clean text, simulated speech-recognition errors, and real speech with cabin noise transcribed by Whisper. 270 recorded runs show that text tests catch 1 of 20 real bugs, and a budget simulation shows when cheap screening is worth it.",
      tr: "Bir LLM araç asistanı üç gerçekçilik seviyesinde test edildi: temiz metin, taklit edilmiş ses tanıma hataları ve araç içi gürültüyle gerçek konuşmanın Whisper ile yazıya çevrilmesi. Kaydedilen 270 çalıştırma, metin testlerinin 20 gerçek hatadan sadece 1'ini yakaladığını; bütçe simülasyonu da ucuz ön elemenin ne zaman işe yaradığını gösteriyor.",
      de: "Ein LLM-Autoassistent, getestet auf drei Realismusstufen: sauberer Text, simulierte Spracherkennungsfehler und echte Sprache mit Innenraumgeräusch, transkribiert von Whisper. 270 aufgezeichnete Läufe zeigen, dass Texttests nur 1 von 20 echten Fehlern finden, und eine Budget-Simulation zeigt, wann günstiges Vorfiltern sich lohnt.",
    },
    descriptions: {
      en: "A prototype of the question behind automotive voice-assistant testing: how much realism does a test need, and how should a limited test budget be spent?\n\nSystem: an LLM on NVIDIA NIM controls a mock car through three tools (temperature, navigation, volume) in a tool-calling loop. 30 test commands each define the car state expected afterwards: normal values, boundaries, refusals, off-topic questions and two requests in one sentence.\n\nThree levels: level 0 sends the clean text. Level 1 applies rule-based speech-recognition errors (\"to\" → \"two\", digits as words). Level 2 synthesises the command as speech, mixes in cabin noise with ffmpeg and lets faster-whisper transcribe it. Every test ran 3 times per level; all 270 outcomes are stored. Pass rates fall from 97 % to 81 % to 47 %.\n\nFindings: the levels find different bugs. Level 1 raised false alarms that real audio did not reproduce, and missed errors that only real audio caused: Regensburg heard as \"Raven's place\", Augsburg as \"Oxford\", and \"28 degrees\" heard as \"78\", which the model silently converted from Fahrenheit to 25.6 °C. A budget simulation over the recorded runs compares four strategies: text-only testing finds one bug whatever it spends; when audio tests cost 20× more, screening with simulated errors first finds 2.2× more bugs on a small budget than testing everything with audio.\n\nFix and engineering: three failures shared one root cause, the model choosing a value instead of calling the tool. One system-prompt rule took level 0 from 86/90 to 90/90 and turned the silent Fahrenheit conversion into a visible refusal. 21 offline tests, including the tool loop with a scripted fake LLM, run in GitHub Actions.",
      tr: "Araç içi sesli asistan testinin arkasındaki sorunun bir prototipi: bir test ne kadar gerçekçi olmalı ve sınırlı bir test bütçesi nasıl harcanmalı?\n\nSistem: NVIDIA NIM üzerindeki bir LLM, tool-calling döngüsüyle üç araç (sıcaklık, navigasyon, ses) üzerinden sahte bir arabayı kontrol ediyor. 30 test komutunun her biri, sonrasında beklenen araba durumunu tanımlıyor: normal değerler, sınırlar, reddedilmesi gerekenler, konu dışı sorular ve tek cümlede iki istek.\n\nÜç seviye: Level 0 temiz metni gönderiyor. Level 1 kurala dayalı ses tanıma hataları ekliyor (\"to\" → \"two\", rakamlar yazıyla). Level 2 komutu sese çeviriyor, ffmpeg ile araç içi gürültü ekliyor ve faster-whisper ile yazıya döktürüyor. Her test her seviyede 3 kez çalıştı, 270 sonucun hepsi kaydedildi. Başarı oranı %97'den %81'e ve %47'ye düşüyor.\n\nBulgular: seviyeler farklı hatalar buluyor. Level 1, gerçek seste tekrarlanmayan sahte alarmlar verdi ve sadece gerçek sesin yol açtığı hataları kaçırdı: Regensburg \"Raven's place\", Augsburg \"Oxford\" diye duyuldu; \"28 derece\" \"78\" olarak duyulunca model bunu sessizce Fahrenhayttan çevirip 25,6 °C yaptı. Kayıtlı sonuçlar üzerinde bir bütçe simülasyonu dört stratejiyi karşılaştırıyor: sadece metinle test etmek ne kadar harcanırsa harcansın tek bir hata buluyor; ses testleri 20 kat pahalıyken önce taklit hatalarla ön eleme yapmak, küçük bir bütçede her şeyi sesle test etmekten 2,2 kat fazla hata buluyor.\n\nDüzeltme ve mühendislik: üç hatanın kök nedeni aynıydı: model aracı çağırmak yerine değeri kendisi seçiyordu. Sistem talimatına eklenen tek bir kural Level 0'ı 86/90'dan 90/90'a çıkardı ve sessiz Fahrenhayt dönüşümünü görünür bir redde çevirdi. Senaryolu sahte bir LLM ile araç döngüsü dahil 21 çevrimdışı test GitHub Actions'ta koşuyor.",
      de: "Ein Prototyp der Frage hinter dem Testen von Sprachassistenten im Auto: Wie realistisch muss ein Test sein, und wie sollte ein begrenztes Testbudget eingesetzt werden?\n\nSystem: Ein LLM auf NVIDIA NIM steuert in einer Tool-Calling-Schleife ein simuliertes Auto über drei Tools (Temperatur, Navigation, Lautstärke). 30 Testbefehle legen jeweils den erwarteten Fahrzeugzustand fest: normale Werte, Grenzwerte, Ablehnungen, themenfremde Fragen und zwei Wünsche in einem Satz.\n\nDrei Stufen: Stufe 0 sendet den sauberen Text. Stufe 1 fügt regelbasierte Spracherkennungsfehler ein (\"to\" → \"two\", Zahlen als Wörter). Stufe 2 synthetisiert den Befehl als Sprache, mischt mit ffmpeg Innenraumgeräusch hinzu und lässt faster-whisper transkribieren. Jeder Test lief 3-mal pro Stufe; alle 270 Ergebnisse sind gespeichert. Die Erfolgsquote sinkt von 97 % über 81 % auf 47 %.\n\nErgebnisse: Die Stufen finden unterschiedliche Fehler. Stufe 1 meldete Fehlalarme, die echtes Audio nicht reproduzierte, und übersah Fehler, die nur echtes Audio verursachte: Regensburg wurde als \"Raven's place\" gehört, Augsburg als \"Oxford\", und \"28 degrees\" als \"78\", was das Modell stillschweigend von Fahrenheit in 25,6 °C umrechnete. Eine Budget-Simulation über die aufgezeichneten Läufe vergleicht vier Strategien: Reines Texttesten findet einen Fehler, egal wie viel es ausgibt; kosten Audiotests 20-mal mehr, findet Vorfiltern mit simulierten Fehlern bei kleinem Budget 2,2-mal mehr Fehler als alles mit Audio zu testen.\n\nFix und Engineering: Drei Fehler hatten eine gemeinsame Ursache: Das Modell wählte selbst einen Wert, statt das Tool aufzurufen. Eine Regel im System-Prompt hob Stufe 0 von 86/90 auf 90/90 und machte aus der stillen Fahrenheit-Umrechnung eine sichtbare Ablehnung. 21 Offline-Tests, darunter die Tool-Schleife mit einem geskripteten Fake-LLM, laufen in GitHub Actions.",
    },
    tech: ["Python", "LLM tool calling", "NVIDIA NIM", "faster-whisper", "ffmpeg", "pytest", "GitHub Actions"],
    tags: ["LLM Evaluation", "Speech", "Automotive"],
    role: {
      en: "Solo · design, implementation and evaluation",
      tr: "Bireysel · tasarım, geliştirme ve değerlendirme",
      de: "Einzelarbeit · Design, Umsetzung und Evaluation",
    },
    links: { github: "https://github.com/salamon30/car-assistant-eval" },
    cover: "/projects/car-assistant-eval.svg",
    media: "/projects/car-assistant-eval/strategies.svg",
    highlights: [
      { value: "1 of 20", label: { en: "Real bugs that clean-text tests alone can find", tr: "Sadece metin testlerinin bulabildiği gerçek hata", de: "Echte Fehler, die reine Texttests finden" } },
      { value: "2.2×", label: { en: "More bugs from screening when audio tests are expensive", tr: "Ses testleri pahalıyken ön elemeyle bulunan fazla hata", de: "Mehr Fehler durch Vorfiltern bei teuren Audiotests" } },
      { value: "86 → 90", label: { en: "Level 0 passes out of 90, after a one-rule prompt fix", tr: "Tek kurallık talimat düzeltmesiyle 90 üzerinden Level 0", de: "Stufe 0 von 90, nach einer Prompt-Regel" } },
      { value: "270", label: { en: "Recorded runs across 3 test levels", tr: "3 test seviyesinde kaydedilen çalıştırma", de: "Aufgezeichnete Läufe auf 3 Teststufen" } },
    ],
  },
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
      en: "Question answering over 10 medical-AI papers that cites the exact passage and page for every claim, or says \"I don't know\". A measured reranker doubled right-page retrieval from 0.45 to 0.90, and a held-out test set showed where the system still fails.",
      tr: "10 tıbbi yapay zeka makalesi üzerinde soru-cevap: her iddia için kaynak pasajı ve sayfayı gösteriyor, cevap yoksa \"bilmiyorum\" diyor. Ölçülerek eklenen bir reranker doğru sayfayı bulma oranını 0,45'ten 0,90'a çıkardı, görülmemiş sorulardan oluşan bir test seti de sistemin hâlâ nerede zorlandığını gösterdi.",
      de: "Question Answering über 10 Paper zu medizinischer KI, das für jede Aussage die genaue Textstelle und Seite zitiert oder \"Ich weiß es nicht\" sagt. Ein gemessener Reranker verdoppelte die Trefferquote der richtigen Seite von 0,45 auf 0,90, und ein Held-out-Testset zeigte, wo das System noch scheitert.",
    },
    descriptions: {
      en: "An end-to-end RAG system built in stages, each measured before moving on.\n\nPipeline: PDFs are parsed page by page and split into ~500-token chunks, embedded locally with bge-small and stored in ChromaDB with source and page metadata. A question that compares several papers is first split into one search per paper. Each search retrieves the top 50 chunks by vector similarity; a cross-encoder reranker then reads the question together with each candidate and keeps the 5 that actually answer it. An LLM (NVIDIA NIM) answers only from those passages, cites every claim as [n], corrects false premises, and says \"I don't know\" when the evidence is missing.\n\nEvaluation: three 20-question test sets measure retrieval (hit@k, right page in top 5, MRR@10) and answer quality with an LLM judge; refusals are scored by rule, not by the judge. Adding the reranker, the only change between two runs, raised right-page retrieval from 0.45 to 0.90 and correctness from 3.95 to 5.0 / 5. A harder set with unanswerable, false-premise and multi-paper questions led to the query decomposition step (multi-paper correctness 3.7 → 5.0). A held-out set, written after all tuning and run once, scored 4.5 overall but only 2.3 on multi-paper questions: the earlier perfect score was partly overfitted, and the report names the three causes. Finally, a model from a different vendor re-scored all 60 saved answers: it gave 4.6 / 4.4 / 4.4 where the generator's own model had given 5.0 / 4.8 / 4.5, and caught two wrong multi-paper answers that had been rated 5 / 5, so that 5.0 was too generous. A last round targeted multi-paper questions (more passages per paper, the text after each hit, a rule for figures): on 10 new questions it had never been tuned on, the independent score rose only from 3.4 to 3.6, and the remaining errors are pages the search does not find.\n\nEngineering: 98 offline unit tests with fake models run in GitHub Actions on every push. The app ships as a Docker image and as a public live demo on Streamlit Community Cloud that redeploys on every push, with per-day and per-visitor question limits so visitors cannot use up the API key. The evaluation exposed bugs that were then fixed: an embedding model that silently truncated half of every chunk, chunk text the tokenizer had lowercased, and an LLM judge that rated refusals as correct. A Streamlit UI shows each answer with its cited sources and each source's rank before and after reranking.",
      tr: "Aşama aşama kurulmuş, her aşaması bir sonrakine geçmeden ölçülmüş uçtan uca bir RAG sistemi.\n\nAkış: PDF'ler sayfa sayfa okunup ~500 tokenlık parçalara bölünüyor, bge-small ile yerelde vektöre çevriliyor ve kaynak ve sayfa bilgisiyle ChromaDB'ye kaydediliyor. Birden fazla makaleyi karşılaştıran bir soru önce makale başına bir aramaya bölünüyor. Her arama vektör benzerliğiyle en iyi 50 parçayı getiriyor. Ardından bir cross-encoder reranker soruyu her adayla birlikte okuyup soruyu gerçekten cevaplayan 5 parçayı seçiyor. Bir LLM (NVIDIA NIM) sadece bu pasajlardan cevap veriyor, her iddiayı [n] ile kaynaklıyor, yanlış öncülleri düzeltiyor ve kanıt yoksa \"bilmiyorum\" diyor.\n\nDeğerlendirme: 20'şer soruluk üç test seti retrieval'ı (hit@k, doğru sayfanın ilk 5'te olması, MRR@10) ve cevap kalitesini bir LLM hakemle ölçüyor. Ret cevapları hakem tarafından değil, kuralla puanlanıyor. İki çalıştırma arasındaki tek değişiklik olan reranker, doğru sayfayı bulma oranını 0,45'ten 0,90'a, doğruluk puanını 3,95'ten 5,0 / 5'e çıkardı. Cevapsız, yanlış öncüllü ve çok makaleli sorulardan oluşan zor set, soru bölme adımını getirdi (çok makaleli sorularda doğruluk 3,7 → 5,0). Tüm ayarlardan sonra yazılıp tek seferde çalıştırılan görülmemiş set genelde 4,5 aldı ama çok makaleli sorularda sadece 2,3: önceki tam puan kısmen ezberdi ve rapor üç sebebini açıkça yazıyor. Son olarak farklı bir üreticinin modeli kayıtlı 60 cevabın hepsini yeniden puanladı: sistemin kendi modelinin 5,0 / 4,8 / 4,5 verdiği yerde 4,6 / 4,4 / 4,4 verdi ve 5 / 5 almış iki yanlış çok makaleli cevabı yakaladı; yani o 5,0 fazla cömertti. Son tur çok makaleli sorulara odaklandı (makale başına daha çok pasaj, her pasajın devamındaki metin, sayılar için bir kural): hiç ayar yapılmamış 10 yeni soruda bağımsız puan yalnızca 3,4'ten 3,6'ya çıktı ve kalan hatalar aramanın bulamadığı sayfalardan kaynaklanıyor.\n\nMühendislik: sahte modellerle çalışan 98 çevrimdışı birim testi her push'ta GitHub Actions'ta koşuyor. Uygulama bir Docker imajı olarak ve Streamlit Community Cloud üzerinde her push'ta kendini güncelleyen herkese açık bir canlı demo olarak yayında; ziyaretçilerin API anahtarını tüketmemesi için günlük ve ziyaretçi başına soru sınırı var. Değerlendirme ayrıca sonradan düzeltilen hataları ortaya çıkardı: her parçanın yarısını sessizce kesen bir embedding modeli, tokenizer'ın küçük harfe çevirdiği parça metinleri ve ret cevaplarını doğru sayan bir LLM hakem. Streamlit arayüzü her cevabı kaynaklarıyla ve her kaynağın reranker öncesi ve sonrası sırasıyla gösteriyor.",
      de: "Ein End-to-End-RAG-System, stufenweise gebaut und jede Stufe gemessen, bevor es weiterging.\n\nPipeline: PDFs werden seitenweise eingelesen, in Chunks von ca. 500 Tokens zerlegt, lokal mit bge-small eingebettet und mit Quellen- und Seiten-Metadaten in ChromaDB gespeichert. Eine Frage, die mehrere Paper vergleicht, wird zuerst in eine Suche pro Paper aufgeteilt. Jede Suche ruft die 50 ähnlichsten Chunks per Vektorsuche ab. Ein Cross-Encoder-Reranker liest dann die Frage zusammen mit jedem Kandidaten und behält die 5, die sie tatsächlich beantworten. Ein LLM (NVIDIA NIM) antwortet nur aus diesen Passagen, belegt jede Aussage mit [n], korrigiert falsche Annahmen und sagt \"Ich weiß es nicht\", wenn die Belege fehlen.\n\nEvaluation: Drei Testsets mit je 20 Fragen messen das Retrieval (hit@k, richtige Seite in den Top 5, MRR@10) und die Antwortqualität mit einem LLM-Judge; Verweigerungen werden per Regel bewertet, nicht vom Judge. Der Reranker, die einzige Änderung zwischen zwei Läufen, hob die Trefferquote der richtigen Seite von 0,45 auf 0,90 und die Korrektheit von 3,95 auf 5,0 / 5. Ein schwierigeres Set mit unbeantwortbaren Fragen, falschen Annahmen und Fragen über mehrere Paper führte zur Query-Zerlegung (Korrektheit bei Fragen über mehrere Paper 3,7 → 5,0). Ein Held-out-Set, nach allem Tuning geschrieben und einmal ausgeführt, erreichte insgesamt 4,5, bei Fragen über mehrere Paper aber nur 2,3: Die frühere volle Punktzahl war teilweise überangepasst, und der Bericht nennt die drei Ursachen. Zum Schluss bewertete ein Modell eines anderen Anbieters alle 60 gespeicherten Antworten erneut: Es vergab 4,6 / 4,4 / 4,4, wo das Modell des Generators 5,0 / 4,8 / 4,5 vergeben hatte, und fand zwei falsche Antworten auf Fragen über mehrere Paper, die mit 5 / 5 bewertet worden waren; diese 5,0 war also zu großzügig. Eine letzte Runde zielte auf Fragen über mehrere Paper (mehr Passagen pro Paper, der Text nach jedem Treffer, eine Regel für Zahlen): Bei 10 neuen Fragen, auf die nie abgestimmt wurde, stieg der unabhängige Wert nur von 3,4 auf 3,6, und die verbleibenden Fehler liegen an Seiten, die die Suche nicht findet.\n\nEngineering: 98 Offline-Unit-Tests mit Fake-Modellen laufen bei jedem Push in GitHub Actions. Die App gibt es als Docker-Image und als öffentliche Live-Demo auf Streamlit Community Cloud, die bei jedem Push neu deployt wird, mit Fragelimits pro Tag und pro Besucher, damit der API-Schlüssel nicht aufgebraucht wird. Die Evaluation deckte zudem Fehler auf, die anschließend behoben wurden: ein Embedding-Modell, das die Hälfte jedes Chunks stillschweigend abschnitt, Chunk-Text, den der Tokenizer kleingeschrieben hatte, und ein LLM-Judge, der Verweigerungen als korrekt bewertete. Eine Streamlit-Oberfläche zeigt jede Antwort mit ihren zitierten Quellen und dem Rang jeder Quelle vor und nach dem Reranking.",
    },
    tech: ["Python", "ChromaDB", "sentence-transformers", "Cross-encoder reranking", "NVIDIA NIM", "Streamlit", "Docker", "pytest", "GitHub Actions"],
    tags: ["RAG", "LLM Evaluation", "Healthcare AI"],
    role: {
      en: "Solo · design, implementation and evaluation",
      tr: "Bireysel · tasarım, geliştirme ve değerlendirme",
      de: "Einzelarbeit · Design, Umsetzung und Evaluation",
    },
    links: { github: "https://github.com/salamon30/rag-project", demo: "https://medical-ai-papers.streamlit.app/" },
    cover: "/projects/medical-ai-paper-qa.png",
    media: "/projects/medical-ai-paper-qa/demo.gif",
    highlights: [
      { value: "0.45 → 0.90", label: { en: "Right page in top 5, after adding the reranker", tr: "Doğru sayfa ilk 5'te, reranker eklenince", de: "Richtige Seite in den Top 5, nach dem Reranker" } },
      { value: "4.4 / 5", label: { en: "Answer correctness on unseen questions, scored by an independent model", tr: "Görülmemiş sorularda cevap doğruluğu, bağımsız bir modelin puanıyla", de: "Antwortkorrektheit bei ungesehenen Fragen, bewertet von einem unabhängigen Modell" } },
      { value: "70", label: { en: "Hand-checked test questions in 4 sets", tr: "4 sette elle kontrol edilmiş test sorusu", de: "Handgeprüfte Testfragen in 4 Sets" } },
      { value: "98", label: { en: "Offline unit tests in CI", tr: "CI'da çevrimdışı birim testi", de: "Offline-Unit-Tests in CI" } },
    ],
  },
  {
    slug: "physical-ai-learning-loop",
    year: "2026",
    category: "personal",
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
      en: "A personal finance tool built to track real multi-currency credit cards across different countries, run as an iterative, long-term build rather than a one-off assignment.\n\nBackend: FastAPI + SQLAlchemy, with a PDF/OCR statement parser that reads real bank e-statements (text and scanned) and reconciles them against previously recorded transactions, correcting amounts on re-upload instead of duplicating rows. A dedicated FX-cost engine computes the real markup a card charges on foreign purchases, with historical exchange rates pulled from stored rate data rather than assumed.\n\nAI agent: a genuine tool-calling LLM agent (NVIDIA NIM, OpenAI-compatible) with 9 financial tools — net worth, FX card recommendations, trip cost analysis, installment schedules, cash-flow projections. Any action that would modify a financial record goes through a human-in-the-loop confirmation step by architecture: the LLM can only ever propose a write, a separate endpoint with no corresponding tool performs it. All tool calls are logged with latency/token metadata for observability, deliberately excluding the financial values themselves.\n\nCash-flow engine: a 6-month net-worth projection seeded from real current balances, plus a what-if scenario simulator (FX-rate shocks, delayed income, lump-sum debt payoff) that is guaranteed never to write to the real financial records — simulation and reality are kept in fully separate code paths.\n\nBuilt and iterated over many sessions — audits, bug fixes and new features, each backed by a real regression test and verified against real data rather than assumed correct.",
      tr: "Farklı ülkelerdeki gerçek, çoklu para birimli kredi kartlarını takip etmek için yapılmış kişisel bir finans aracı — tek seferlik bir ödev değil, uzun soluklu, yinelemeli bir geliştirme olarak sürdürülüyor.\n\nBackend: FastAPI + SQLAlchemy; gerçek banka e-ekstrelerini (metin ve taranmış) okuyan bir PDF/OCR ayrıştırıcı, bunları daha önce kaydedilmiş işlemlerle karşılaştırıp yeniden yüklemede satırları çoğaltmak yerine tutarları düzeltiyor. Ayrı bir kur maliyeti motoru, bir kartın yurt dışı harcamalarda gerçekte ne kadar kur farkı/komisyon kestiğini, varsayılan değil kayıtlı geçmiş kur verisiyle hesaplıyor.\n\nAI ajan: 9 finansal araca sahip, gerçek tool-calling yapan bir LLM ajanı (NVIDIA NIM, OpenAI uyumlu) — net varlık, kur bazlı kart önerisi, seyahat maliyet analizi, taksit takvimi, nakit akışı projeksiyonu. Finansal bir kaydı değiştirecek her eylem, mimari düzeyde insan onayından geçiyor: LLM sadece bir yazma işlemini önerebilir, bunu gerçekleştiren ayrı bir endpoint'in karşılığında hiçbir araç tanımı yok. Tüm araç çağrıları gecikme/token metadatasıyla loglanıyor, finansal değerlerin kendisi kasıtlı olarak hariç tutuluyor.\n\nNakit akışı motoru: gerçek güncel bakiyelerden başlayan 6 aylık net varlık projeksiyonu, artı gerçek kayıtlara asla yazmadığı garanti edilen bir what-if senaryo simülatörü (kur şoku, gecikmeli gelir, toplu borç ödemesi) — simülasyon ve gerçek veri tamamen ayrı kod yollarında tutuluyor.\n\nBirçok oturum boyunca yinelemeli olarak geliştirildi — denetimler, hata düzeltmeleri ve yeni özellikler, her biri gerçek bir regresyon testiyle desteklenip gerçek veriyle doğrulandı.",
      de: "Ein persönliches Finanztool zur Verfolgung echter Multi-Currency-Kreditkarten in verschiedenen Ländern — als iterativer Langzeit-Build geführt, nicht als einmalige Aufgabe.\n\nBackend: FastAPI + SQLAlchemy mit einem PDF/OCR-Kontoauszug-Parser, der echte Bank-E-Kontoauszüge (Text und gescannt) liest und mit zuvor erfassten Transaktionen abgleicht — bei erneutem Upload werden Beträge korrigiert statt Zeilen dupliziert. Eine dedizierte FX-Kosten-Engine berechnet den tatsächlichen Aufschlag, den eine Karte bei Fremdwährungskäufen berechnet, basierend auf gespeicherten historischen Wechselkursen statt Annahmen.\n\nKI-Agent: ein echter Tool-Calling-LLM-Agent (NVIDIA NIM, OpenAI-kompatibel) mit 9 Finanz-Tools — Nettovermögen, FX-Kartenempfehlungen, Reisekostenanalyse, Ratenzahlungspläne, Cashflow-Projektionen. Jede Aktion, die einen Finanzdatensatz ändern würde, durchläuft architektonisch einen Human-in-the-Loop-Bestätigungsschritt: Das LLM kann einen Schreibvorgang nur vorschlagen, ein separater Endpunkt ohne zugehöriges Tool führt ihn aus. Alle Tool-Aufrufe werden mit Latenz-/Token-Metadaten protokolliert, die eigentlichen Finanzwerte bewusst ausgeschlossen.\n\nCashflow-Engine: eine 6-Monats-Nettovermögensprojektion, ausgehend von echten aktuellen Salden, plus ein Was-wäre-wenn-Szenario-Simulator (FX-Kursschocks, verzögertes Einkommen, Einmalzahlung auf Schulden), der garantiert nie in die echten Finanzdatensätze schreibt — Simulation und Realität bleiben in vollständig getrennten Codepfaden.\n\nÜber viele Sitzungen hinweg iterativ entwickelt — Audits, Bugfixes und neue Features, jeweils durch einen echten Regressionstest abgesichert und gegen echte Daten verifiziert statt als korrekt angenommen.",
    },
    tech: ["Python", "FastAPI", "SQLAlchemy", "React", "TypeScript", "Recharts", "NVIDIA NIM", "SQLite"],
    tags: ["FinTech", "LLM Agent", "Full-Stack"],
    role: {
      en: "Solo · personal project, in active daily use",
      tr: "Bireysel · kişisel proje, her gün aktif kullanımda",
      de: "Einzelarbeit · persönliches Projekt, im täglichen aktiven Einsatz",
    },
    cover: "/projects/fin-agent-intelligence.png",
    media: "/projects/fin-agent-intelligence/demo.gif",
  },
  {
    slug: "sensor-anomaly-detection",
    year: "2026",
    category: "personal",
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
    cover: "/projects/personal-portfolio.png",
  },
];
