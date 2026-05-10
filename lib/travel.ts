/**
 * Travel data — ülkeler, şehirler, notlar ve fotoğraflar.
 *
 * Foto eklemek için:
 *   1) public/travel/<slug>/ klasörüne .jpg / .png at
 *   2) Aşağıdaki `photos` dizisine yolu ekle:
 *        photos: ["/travel/austria/vienna-1.jpg"]
 *
 * Notlar üç dilde (EN/TR/DE) — istediğin kadar uzun yaz.
 *
 * `iso` alanı ISO 3166-1 numeric, react-simple-maps'in kullandığı
 * world-atlas topojson'daki id ile eşleşir.
 */

import type { Locale } from "./i18n";

export type Country = {
  slug: string;
  iso: string; // ISO 3166-1 numeric ("040" formatında)
  flag: string;
  year: string;
  home?: boolean;    // anayurt
  current?: boolean; // şu anda yaşadığın yer
  names: Record<Locale, string>;
  cities: string[];
  notes: Record<Locale, string>;
  photos: string[];
};

export const COUNTRIES: Country[] = [
  {
    slug: "germany",
    iso: "276",
    flag: "🇩🇪",
    year: "2025",
    current: true,
    names: { en: "Germany", tr: "Almanya", de: "Deutschland" },
    cities: ["Munich", "Deggendorf"],
    notes: {
      en: "Current home. Doing my M.Eng. at THD in Deggendorf, living in Munich. Germany taught me that precision isn't perfectionism — it's a systems mindset applied to daily life. Biergarten in summer, excellent trains, and a research culture that takes engineering seriously.",
      tr: "Şu anki yuvam. Deggendorf'ta THD'de M.Eng. yapıyorum, Münih'te yaşıyorum. Almanya bana hassasiyetin mükemmeliyetçilik olmadığını öğretti — günlük hayata uygulanmış bir sistem düşüncesi. Yazın biergarten, mükemmel trenler ve mühendisliği ciddiye alan bir araştırma kültürü.",
      de: "Derzeitiges Zuhause. Ich mache meinen M.Eng. an der THD in Deggendorf und lebe in München. Deutschland hat mir beigebracht, dass Präzision keine Perfektionismus ist — es ist eine Systemdenkweise, die auf den Alltag angewendet wird. Biergarten im Sommer, ausgezeichnete Züge und eine Forschungskultur, die Ingenieurswesen ernst nimmt.",
    },
    photos: [
      "/travel/germany/IMG_1251.jpeg",
      "/travel/germany/IMG_1412.jpeg",
      "/travel/germany/IMG_1455.jpeg",
      "/travel/germany/IMG_2070.jpeg",
      "/travel/germany/IMG_9316.jpeg",
    ],
  },
  {
    slug: "turkey",
    iso: "792",
    flag: "🇹🇷",
    year: "—",
    home: true,
    names: { en: "Turkey", tr: "Türkiye", de: "Türkei" },
    cities: ["Istanbul"],
    notes: {
      en: "Where it all started. Istanbul — the city that taught me to read chaos as signal.",
      tr: "Her şeyin başladığı yer. İstanbul — bana kaosu sinyal olarak okumayı öğreten şehir.",
      de: "Wo alles begann. Istanbul — die Stadt, die mir beibrachte, Chaos als Signal zu lesen.",
    },
    photos: [],
  },
  {
    slug: "austria",
    iso: "040",
    flag: "🇦🇹",
    year: "2024",
    names: { en: "Austria", tr: "Avusturya", de: "Österreich" },
    cities: ["Vienna", "Salzburg"],
    notes: {
      en: "Vienna hits differently when you arrive from Istanbul — the silence, the order, the coffee that comes with a glass of water. Salzburg is a UNESCO postcard that somehow still feels lived-in rather than staged.",
      tr: "İstanbul'dan gelince Viyana bambaşka çarpıyor — sessizlik, düzen ve yanında bir bardak su gelen kahve. Salzburg sahnelenmiş değil de gerçekten yaşanıyormuş gibi hissettiren bir UNESCO kartpostalı.",
      de: "Wien wirkt anders, wenn man aus Istanbul ankommt — die Stille, die Ordnung, der Kaffee, der mit einem Glas Wasser serviert wird. Salzburg ist eine UNESCO-Postkarte, die sich trotzdem bewohnt und nicht inszeniert anfühlt.",
    },
    photos: [
      "/travel/austria/IMG_9407.jpeg",
      "/travel/austria/IMG_9412.jpeg",
      "/travel/austria/IMG_9445.jpeg",
      "/travel/austria/IMG_9449.jpeg",
      "/travel/austria/IMG_9515.jpeg",
    ],
  },
  {
    slug: "italy",
    iso: "380",
    flag: "🇮🇹",
    year: "2023",
    names: { en: "Italy", tr: "İtalya", de: "Italien" },
    cities: ["Rome", "Milan", "Venice"],
    notes: {
      en: "Rome in layers — ancient stones, baroque fountains, espresso in the afternoon sun. Milan moves at a different speed; it reminded me of Istanbul in the best way. Venice teaches you that constraint can be a design feature: no cars, no noise, just water.",
      tr: "Roma katmanlar halinde — antik taşlar, barok çeşmeler, öğleden sonra güneşte espresso. Milano farklı bir hızda döner; bana İstanbul'u en güzel yönüyle hatırlattı. Venedik kısıtlamanın bir tasarım özelliği olabileceğini öğretiyor: araba yok, gürültü yok, sadece su.",
      de: "Rom in Schichten — antike Steine, barocke Brunnen, Espresso in der Nachmittagssonne. Mailand bewegt sich in einem anderen Tempo; es erinnerte mich an Istanbul von seiner besten Seite. Venedig zeigt, dass Einschränkung ein Designmerkmal sein kann: keine Autos, kein Lärm, nur Wasser.",
    },
    photos: [
      "/travel/italy/IMG_4384.jpeg",
      "/travel/italy/IMG_4404.jpeg",
      "/travel/italy/IMG_6303.jpeg",
      "/travel/italy/IMG_6334.jpeg",
      "/travel/italy/IMG_6387.jpeg",
      "/travel/italy/IMG_9284.jpeg",
      "/travel/italy/IMG_9378.jpeg",
    ],
  },
  {
    slug: "spain",
    iso: "724",
    flag: "🇪🇸",
    year: "2023",
    names: { en: "Spain", tr: "İspanya", de: "Spanien" },
    cities: ["Barcelona", "Madrid"],
    notes: {
      en: "Barcelona's architecture is an argument for going beyond function — Gaudí proved that constraints and creativity aren't opposites. Madrid is raw energy, late nights, and a city that never pretends to be anything other than what it is.",
      tr: "Barcelona'nın mimarisi, fonksiyonun ötesine geçmek için bir argüman — Gaudí, kısıtlamalar ile yaratıcılığın zıt olmadığını kanıtladı. Madrid çiğ enerji, geç geceler ve kendinden başka bir şeymiş gibi asla numara yapmayan bir şehir.",
      de: "Barcelonas Architektur ist ein Argument dafür, über Funktion hinauszugehen — Gaudí bewies, dass Grenzen und Kreativität keine Gegensätze sind. Madrid ist rohe Energie, späte Nächte und eine Stadt, die nie vorgibt, etwas anderes zu sein als das, was sie ist.",
    },
    photos: [
      "/travel/spain/IMG_0051.jpeg",
      "/travel/spain/IMG_3414.jpeg",
      "/travel/spain/IMG_3452.jpeg",
      "/travel/spain/IMG_3570.jpeg",
      "/travel/spain/IMG_5608.jpeg",
      "/travel/spain/IMG_6694.jpg",
      "/travel/spain/IMG_7442.jpeg",
      "/travel/spain/IMG_7611.jpeg",
      "/travel/spain/IMG_9583.jpeg",
      "/travel/spain/IMG_9769.jpeg",
      "/travel/spain/IMG_9818.jpeg",
    ],
  },
  {
    slug: "greece",
    iso: "300",
    flag: "🇬🇷",
    year: "2024",
    names: { en: "Greece", tr: "Yunanistan", de: "Griechenland" },
    cities: ["Athens", "Santorini"],
    notes: {
      en: "Athens is history you can touch — I walked the Acropolis thinking about the gap between ancient engineering and what we call 'modern'. Santorini is exactly as beautiful as advertised, which is rare. The blue domes against the Aegean felt almost like a data visualisation: maximum signal, no noise.",
      tr: "Atina dokunabildiğin tarih — Akropol'de antik mühendislik ile 'modern' dediğimiz şey arasındaki farkı düşünürken yürüdüm. Santorini tanıtıldığı kadar güzel ve bu nadir bir şey. Ege'ye karşı mavi kubbeler neredeyse bir veri görselleştirmesi gibi hissettirdi: maksimum sinyal, sıfır gürültü.",
      de: "Athen ist Geschichte zum Anfassen — auf der Akropolis dachte ich über den Abstand zwischen antiker Ingenieurskunst und dem, was wir 'modern' nennen, nach. Santorin ist genau so schön wie beworben, was selten ist. Die blauen Kuppeln vor der Ägäis fühlten sich fast wie eine Datenvisualisierung an: maximales Signal, kein Rauschen.",
    },
    photos: [
      "/travel/greece/IMG_1963.jpeg",
      "/travel/greece/IMG_2686.jpeg",
      "/travel/greece/IMG_2760.jpeg",
      "/travel/greece/IMG_8279.jpeg",
      "/travel/greece/IMG_8696.jpeg",
      "/travel/greece/IMG_9071.jpeg",
      "/travel/greece/IMG_9123.jpeg",
      "/travel/greece/IMG_9221.jpeg",
      "/travel/greece/IMG_9274.jpeg",
    ],
  },
  {
    slug: "sweden",
    iso: "752",
    flag: "🇸🇪",
    year: "2024",
    names: { en: "Sweden", tr: "İsveç", de: "Schweden" },
    cities: ["Stockholm"],
    notes: {
      en: "Stockholm made me rethink what a city can be — water, islands, public design that actually respects the people using it. The technology culture here is serious in a quiet way. And the silence between conversations taught me something about leaving space in systems.",
      tr: "Stockholm, bir şehrin ne olabileceği konusundaki düşüncelerimi değiştirdi — su, adalar, kullananları gerçekten önemseyen kamu tasarımı. Buradaki teknoloji kültürü sessiz bir ciddiyete sahip. Konuşmalar arasındaki sessizlik bana sistemlerde boşluk bırakmak hakkında bir şeyler öğretti.",
      de: "Stockholm hat mich neu darüber nachdenken lassen, was eine Stadt sein kann — Wasser, Inseln, öffentliches Design, das die Nutzer wirklich respektiert. Die Technologiekultur hier ist still ernsthaft. Und die Stille zwischen Gesprächen lehrte mich etwas über das Freilassen von Raum in Systemen.",
    },
    photos: [
      "/travel/sweden/IMG_7896.jpeg",
      "/travel/sweden/IMG_8002.jpeg",
      "/travel/sweden/IMG_8035.jpeg",
      "/travel/sweden/IMG_8068.jpeg",
      "/travel/sweden/IMG_8084.jpeg",
    ],
  },
  {
    slug: "netherlands",
    iso: "528",
    flag: "🇳🇱",
    year: "2023",
    names: { en: "Netherlands", tr: "Hollanda", de: "Niederlande" },
    cities: ["Amsterdam"],
    notes: {
      en: "Amsterdam is a city built around good decisions — cycling infrastructure, canal engineering, compact and liveable at scale. The Rijksmuseum alone justifies the trip, but the real lesson is in how the Dutch designed their way out of a geography that should have been impossible.",
      tr: "Amsterdam iyi kararlar etrafında kurulmuş bir şehir — bisiklet altyapısı, kanal mühendisliği, ölçekte kompakt ve yaşanabilir. Rijksmuseum tek başına yolculuğa değer, ama asıl ders Hollandalıların imkânsız olması gereken bir coğrafyadan nasıl çıkış tasarladığında.",
      de: "Amsterdam ist eine Stadt, die um gute Entscheidungen herum gebaut wurde — Fahrradinfrastruktur, Kanalengineering, kompakt und lebenswert in großem Maßstab. Das Rijksmuseum allein rechtfertigt die Reise, aber die eigentliche Lektion liegt darin, wie die Niederländer sich aus einer Geographie herausdesignt haben, die unmöglich hätte sein sollen.",
    },
    photos: [
      "/travel/netherlands/IMG_1293.jpeg",
      "/travel/netherlands/IMG_1307.jpeg",
      "/travel/netherlands/IMG_1331.jpeg",
      "/travel/netherlands/IMG_1388.jpeg",
      "/travel/netherlands/IMG_4358.jpeg",
      "/travel/netherlands/IMG_8571.jpeg",
    ],
  },
  {
    slug: "france",
    iso: "250",
    flag: "🇫🇷",
    year: "2023",
    names: { en: "France", tr: "Fransa", de: "Frankreich" },
    cities: ["Paris", "Nice"],
    notes: {
      en: "Paris lives up to the cliché, which is genuinely rare. The Louvre is overwhelming in the best possible way — I spent three hours and covered maybe 5%. Nice is Mediterranean light and a slower pace after a grey Munich winter; the Promenade des Anglais at dawn is worth getting up early for.",
      tr: "Paris klişeye gerçekten hak veriyor, ki bu nadir bir şey. Louvre mümkün olan en iyi şekilde bunaltıcı — üç saat harcadım ve belki %5'ini gördüm. Nice, gri bir Münih kışından sonra Akdeniz ışığı ve daha yavaş bir tempo; şafakta Promenade des Anglais erken kalkmaya değer.",
      de: "Paris wird dem Klischee gerecht, was wirklich selten ist. Der Louvre ist überwältigend auf die bestmögliche Art — ich verbrachte drei Stunden und sah vielleicht 5%. Nizza ist mediterranes Licht und ein langsameres Tempo nach einem grauen Münchner Winter; die Promenade des Anglais bei Tagesanbruch ist das frühe Aufstehen wert.",
    },
    photos: [
      "/travel/france/IMG_0153.jpeg",
      "/travel/france/IMG_0978.jpeg",
      "/travel/france/IMG_0992.jpeg",
      "/travel/france/IMG_6868.jpeg",
      "/travel/france/IMG_7019.jpeg",
      "/travel/france/IMG_7370.jpeg",
      "/travel/france/IMG_8164.jpeg",
      "/travel/france/IMG_8981.jpeg",
      "/travel/france/IMG_9988.jpeg",
    ],
  },
  {
    slug: "switzerland",
    iso: "756",
    flag: "🇨🇭",
    year: "2024",
    names: { en: "Switzerland", tr: "İsviçre", de: "Schweiz" },
    cities: ["Zurich", "Geneva"],
    notes: {
      en: "Switzerland is what happens when a country takes precision seriously in everything — engineering, banking, public transport that runs to the minute. Zurich is expensive but calm in a way that makes you productive. Geneva feels international in a way that reminds you the world is mostly negotiated in a handful of rooms.",
      tr: "İsviçre, bir ülke her şeyde hassasiyeti ciddiye aldığında ortaya çıkan şey — mühendislik, bankacılık, dakikası dakikasına çalışan toplu taşıma. Zürih pahalı ama sizi üretken kılan bir sakinliğe sahip. Cenevre, dünyanın büyük ölçüde bir avuç odada müzakere edildiğini hatırlatan uluslararası bir his veriyor.",
      de: "Die Schweiz zeigt, was passiert, wenn ein Land Präzision in allem ernst nimmt — Ingenieurswesen, Bankwesen, öffentlicher Verkehr, der auf die Minute pünktlich ist. Zürich ist teuer, aber ruhig auf eine Weise, die einen produktiv macht. Genf fühlt sich international an auf eine Weise, die einen daran erinnert, dass die Welt größtenteils in einer Handvoll Räumen verhandelt wird.",
    },
    photos: [
      "/travel/switzerland/IMG_3753.jpeg",
      "/travel/switzerland/IMG_3789.jpeg",
      "/travel/switzerland/IMG_3837.jpeg",
      "/travel/switzerland/IMG_3857.jpeg",
      "/travel/switzerland/IMG_3880.jpeg",
      "/travel/switzerland/IMG_3905.jpeg",
      "/travel/switzerland/IMG_6098.jpeg",
      "/travel/switzerland/IMG_6132.jpeg",
      "/travel/switzerland/IMG_6135.jpeg",
      "/travel/switzerland/IMG_6152.jpeg",
      "/travel/switzerland/IMG_6552.jpeg",
      "/travel/switzerland/IMG_6554.jpeg",
    ],
  },
  {
    slug: "czech-republic",
    iso: "203",
    flag: "🇨🇿",
    year: "2024",
    names: { en: "Czech Republic", tr: "Çekya", de: "Tschechien" },
    cities: ["Prague"],
    notes: {
      en: "Prague surprised me — I expected a tourist trap, found a city with genuine architectural depth. The old town at 7am before the crowds is a different city entirely. Walking these streets, Kafka starts to make more sense: the absurd logic of bureaucratic systems is somehow built into the cobblestones.",
      tr: "Prag beni şaşırttı — turistik bir tuzak bekliyordum, gerçek mimari derinliği olan bir şehir buldum. Kalabalıktan önce sabah 7'de eski şehir tamamen farklı bir yer. Bu sokakları yürürken Kafka daha anlamlı gelmeye başlıyor: bürokratik sistemlerin absürt mantığı bir şekilde arnavut kaldırımlarına işlenmiş gibi.",
      de: "Prag hat mich überrascht — ich erwartete eine Touristenfalle, fand eine Stadt mit echter architektonischer Tiefe. Die Altstadt um 7 Uhr morgens vor den Massen ist eine völlig andere Stadt. Beim Laufen durch diese Straßen beginnt Kafka mehr Sinn zu ergeben: die absurde Logik bürokratischer Systeme scheint irgendwie in das Kopfsteinpflaster eingebaut zu sein.",
    },
    photos: [],
  },
  {
    slug: "belgium",
    iso: "056",
    flag: "🇧🇪",
    year: "2024",
    names: { en: "Belgium", tr: "Belçika", de: "Belgien" },
    cities: ["Brussels", "Bruges"],
    notes: {
      en: "Brussels is the EU's operating system — multilingual, dense, slightly formal, with the feeling that half the conversations in the cafés are shaping policy somewhere. Bruges is the opposite: medieval streets, chocolate, canal reflections. Two very different Belgiums in the same country.",
      tr: "Brüksel AB'nin işletim sistemi — çok dilli, yoğun, biraz resmi ve kafelerdeki sohbetlerin yarısının bir yerlerde politika şekillendiriyor olduğu hissi. Brugge tam tersi: ortaçağ sokakları, çikolata, kanal yansımaları. Aynı ülkede iki çok farklı Belçika.",
      de: "Brüssel ist das Betriebssystem der EU — mehrsprachig, dicht, leicht formell, mit dem Gefühl, dass die Hälfte der Gespräche in den Cafés irgendwo Politik gestaltet. Brügge ist das Gegenteil: mittelalterliche Straßen, Schokolade, Kanalreflexionen. Zwei sehr unterschiedliche Belgien im selben Land.",
    },
    photos: [
      "/travel/belgium/IMG_4440.jpeg",
      "/travel/belgium/IMG_4554.jpeg",
      "/travel/belgium/IMG_4602.jpeg",
      "/travel/belgium/IMG_8677.jpeg",
      "/travel/belgium/IMG_9167.jpeg",
    ],
  },
];

export const VISITED_ISOS = new Set(COUNTRIES.map((c) => c.iso));
