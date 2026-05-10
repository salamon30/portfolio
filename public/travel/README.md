# Travel photos

Bu klasör, `/travel` sayfasındaki ülke galerileri için fotoğrafları tutar.

## Foto eklemek için

1. İlgili ülke klasörünü aç (ör. `public/travel/austria/`)
2. İçine istediğin kadar `.jpg` / `.jpeg` / `.png` / `.webp` dosyası at
   - İsimler serbest, örnek: `vienna-1.jpg`, `salzburg-dusk.jpg`
   - Önerilen en: 1600–2000px (tarayıcı otomatik küçültür)
3. `lib/travel.ts` dosyasını aç, o ülkenin `photos` dizisine yollarını ekle:

```ts
photos: [
  "/travel/austria/vienna-1.jpg",
  "/travel/austria/salzburg-dusk.jpg",
]
```

Dikkat: yolun başı **`/travel/...`**, **`public/travel/...`** değil. `public/`
klasörünün içeriği sitenin köküne mount'lanır.

4. Kaydet. Dev server açıksa sayfa kendi kendine yenilenir.

## Notları düzenlemek

Her ülkenin 3 dilde `notes` alanı `lib/travel.ts` içinde. EN / TR / DE ayrı
string'ler — dilediğin kadar uzun yazabilirsin.
