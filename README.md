# 🚀 AlanRehberi Backend API

Üniversite öğrencilerine kişiselleştirilmiş kariyer yönlendirmesi sağlayan modern bir .NET 9 Web API projesi.

## ✨ Özellikler

- ✅ **Akıllı Puanlama Sistemi** - 10 üzerinden meslek-soru eşleştirmesi
- ✅ **Katmanlı Mimari** - Clean Architecture prensipleri
- ✅ **Entity Framework Core** - Code-first database yaklaşımı
- ✅ **PostgreSQL** - Güçlü ve ölçeklenebilir veritabanı
- ✅ **AutoMapper** - Otomatik entity-DTO dönüşümü
- ✅ **Global Exception Handling** - Merkezi hata yönetimi
- ✅ **Serilog** - Structured logging
- ✅ **Swagger/OpenAPI** - API dokümantasyonu
- ✅ **CORS** - Cross-origin resource sharing

## 🎯 Proje Amacı

AlanRehberi, üniversite öğrencilerinin mezuniyet sonrası kariyer yönelimlerini belirlemelerine yardımcı olmak için geliştirilmiş bir platformdur. Kullanıcıların ilgi alanları, becerileri ve motivasyonlarına göre en uygun meslekleri % cinsinden uyum skorlarıyla sunar.

## 🧠 Puanlama Mantığı

### Temel Formül
```javascript
ToplamPuan = ∑(KullanıcıCevabı × MeslekAğırlığı)
MaxİdealPuan = ∑(5 × MeslekAğırlığı)
UyumYüzdesi = (ToplamPuan / MaxİdealPuan) × 100


## 🏗️ Mimari Yapı

```text
CareerPathfinder/
├── CareerPathfinder.API/              # Web API Katmanı
│   ├── Controllers/                   # API Controller'ları
│   ├── Middleware/                    # Custom Middleware'ler
│   └── Extensions/                    # Extension Methods
│
├── CareerPathfinder.Core/             # Business Logic Katmanı
│   ├── Entities/                      # Domain Modelleri
│   ├── DTOs/                          # Data Transfer Objects
│   ├── Exceptions/                    # Özel Exception'lar
│   ├── Mappings/                      # AutoMapper Profilleri
│   └── Enums/                         # Enum Tanımları
│
└── CareerPathfinder.Infrastructure/   # Data Access Katmanı
    └── Data/                          # DbContext ve Repositoryler
        └── Migrations/                # Database Migration'ları
```

##  📊 Veritabanı Modelleri
```text
Model	Açıklama
Department	Bölümler (YBS, Endüstri Müh.)
Career	Meslekler (Backend Developer, Data Engineer)
Question	Likert ölçeğinde sorular
CareerScore	Soru-Meslek puan ilişkileri
Questionnaire	Anket oturumları
Answer	Kullanıcı cevapları
TestResult	Hesaplanan sonuçlar
```

