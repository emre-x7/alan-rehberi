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
```
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
```
Model	            Açıklama
Department	        Bölümler (YBS, Endüstri Müh.)
Career	            Meslekler (Backend Developer, Data Engineer)
Question	        Likert ölçeğinde sorular
CareerScore	        Soru-Meslek puan ilişkileri
Questionnaire	    Anket oturumları
Answer	            Kullanıcı cevapları
TestResult	        Hesaplanan sonuçlar
```

## 📦 Kurulum
```
Gereksinimler
.NET 9 SDK
PostgreSQL 14+
Visual Studio 2022 veya VS Code

Adımlar
1. Repository'yi klonlayın
git clone https://github.com/emre-x7/alan-rehberi.git
cd CareerPathfinder

2. Database ayarlarını yapın
PostgreSQL'de yeni database oluşturun
appsettings.json dosyasını düzenleyin:

3. Database migration'ları çalıştırın
dotnet ef database update --project CareerPathfinder.Infrastructure --startup-project CareerPathfinder.API
```

## 🚀 API Endpoint'leri
```
Authentication
POST /api/auth/register - Kullanıcı kaydı
POST /api/auth/login - Kullanıcı girişi

Departments
GET /api/departments - Tüm bölümleri listele
GET /api/departments/{id} - Spesifik bölüm detayı
GET /api/departments/with-questions - Sadece sorusu olan bölümler

Questions
GET /api/questions/department/{id} - Bölüme ait sorular
GET /api/questions/{id} - Tekil soru detayı

Questionnaire
POST /api/questionnaire/start - Anket başlatma
POST /api/questionnaire/submit-answers - Cevapları kaydetme
POST /api/questionnaire/complete/{id} - Anketi tamamlama ve sonuçları hesaplama

Results
GET /api/results/user - Kullanıcı sonuçları
GET /api/results/questionnaire/{id} - Detaylı anket raporu
GET /api/results/top-careers - En iyi 5 kariyer
