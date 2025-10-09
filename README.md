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
```


## 🏗️ Mimari Yapı

```
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
```

 **Frontend kodları için branch değiştir!**
```bash
branch adı : alan_rehberi_v1ui
```

## Alan Rehberi Görselleri (MVP)
***Landing Page***

<img width="1918" height="923" alt="image" src="https://github.com/user-attachments/assets/2006621a-8614-4472-b04d-8b068d0826af" />

<img width="1917" height="920" alt="image" src="https://github.com/user-attachments/assets/15d97e69-babd-46fb-83dc-078b94a153d7" />

<img width="1918" height="920" alt="image" src="https://github.com/user-attachments/assets/20db96ba-45da-4683-9086-875c282e1375" />

***Register Page***

<img width="1918" height="870" alt="image" src="https://github.com/user-attachments/assets/6779bb98-39fc-4a7c-a089-a8a0f87f1b69" />

<img width="1918" height="922" alt="image" src="https://github.com/user-attachments/assets/d6b126fd-2377-4f8e-8cc8-784233307b14" />

***Login Page***

<img width="1916" height="923" alt="image" src="https://github.com/user-attachments/assets/c3fc2c92-5fee-4936-ac2e-f4390cf77028" />

***Dashboard Page***

<img width="1918" height="918" alt="image" src="https://github.com/user-attachments/assets/80a0d4ce-6263-469d-baec-453f67ae1454" />

<img width="1917" height="647" alt="image" src="https://github.com/user-attachments/assets/3ae9b9f9-832b-47d2-ad2a-8759e162d17c" />

***Departments Page***

<img width="1918" height="923" alt="image" src="https://github.com/user-attachments/assets/bacdd6b2-a728-47b2-b7c4-15384740f537" />

***Questionnaire Page***

<img width="1918" height="921" alt="image" src="https://github.com/user-attachments/assets/758ff977-355a-4af7-ab6f-794e93713569" />

***Results Page***

<img width="1918" height="925" alt="image" src="https://github.com/user-attachments/assets/7145ddd9-ccf9-46b8-ac93-907eaa55f985" />

<img width="1908" height="667" alt="image" src="https://github.com/user-attachments/assets/25b761fb-a3b8-4a01-a0cc-4fed3830b6aa" />

***Profile Page***

<img width="1918" height="872" alt="image" src="https://github.com/user-attachments/assets/16b313f9-f7dd-4255-838e-20f0201a781d" />

<img width="1918" height="813" alt="image" src="https://github.com/user-attachments/assets/38985ca2-90e3-4cd8-87cb-a59ec1d2ee08" />


