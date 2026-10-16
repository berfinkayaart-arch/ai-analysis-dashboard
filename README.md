# 🤖 AI Prompt Analysis Dashboard

Cloudflare Workers ve Cloudflare D1 SQL veritabanı altyapısıyla geliştirilmiş; yapay zeka istemlerinin (prompts) performansını, etkileşimlerini ve kalitesini ölçümleyen modern analiz kontrol paneli.

---

## ✨ Öne Çıkan Özellikler

- 📊 **Prompt Metrik & Performans Takibi:** Kullanılan yapay zeka girdilerinin yanıt kalitesi, gecikme ve başarı analizleri.
- ☁️ **Edge / Serverless Mimari:** Cloudflare Workers üzerinde sıfır soğuk başlangıç (zero cold start) ile global olarak çalışan API altyapısı.
- 🗄️ **Serverless SQL (Cloudflare D1):** Hızlı sorgulama ve yapılandırılmış veri kaydı için gömülü ilişkisel veritabanı entegrasyonu (`schema.sql`).
- 📈 **Görsel Dashboard Arayüzü:** İstem dağılımlarını, kategorileri ve zaman serisi verilerini gösteren responsive arayüz.

---

## 🛠️ Kullanılan Teknolojiler

- **Backend / Edge:** Cloudflare Workers, Wrangler CLI
- **Veritabanı:** Cloudflare D1 (Serverless SQLite)
- **Frontend:** HTML5, CSS3, Modern JavaScript (Fetch API)

---

## 🚀 Kurulum ve Dağıtım

```bash
# Bağımlılıkları yükleyin
npm install

# Yerel D1 veritabanını başlatın
wrangler d1 execute analysis_db --local --file=./schema.sql

# Yerel geliştirme ortamını çalıştırın
npm run dev

# Cloudflare üzerinde yayına alın
npm run deploy
```

---

## 👩‍💻 Geliştirici

**Berfin Kaya** - [GitHub](https://github.com/berfinkayaart-arch)
