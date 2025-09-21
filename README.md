# CareerPathfinder Backend API

Üniversite öğrencilerine kişiselleştirilmiş kariyer yönlendirmesi sağlayan modern bir .NET 9 Web API projesi.

## ✨ Özellikler

- ✅ **JWT Authentication** - Güvenli kullanıcı yönetimi
- ✅ **Katmanlı Mimari** - Clean Architecture prensipleri
- ✅ **Entity Framework Core** - Code-first database yaklaşımı
- ✅ **PostgreSQL** - Güçlü ve ölçeklenebilir veritabanı
- ✅ **AutoMapper** - Otomatik entity-DTO dönüşümü
- ✅ **Global Exception Handling** - Merkezi hata yönetimi
- ✅ **Serilog** - Structured logging
- ✅ **Swagger/OpenAPI** - API dokümantasyonu
- ✅ **CORS** - Cross-origin resource sharing


## 🏗️ Mimari Yapı

```text
CareerPathfinder/
├── CareerPathfinder.API/              # Web API Katmanı
│
├── CareerPathfinder.Core/             # Business Logic Katmanı
│   ├── Entities/                      # Domain Modelleri
│   ├── DTOs/                          # Data Transfer Objects
│   ├── Exceptions/                    # Özel Exception'lar
│   └── Mappings/                      # AutoMapper Profilleri
│
└── CareerPathfinder.Infrastructure/   # Data Access Katmanı
    └── Data/                          # DbContext ve Repositoryler
```

## 📦 Kurulum

### Gereksinimler
- .NET 9 SDK
- PostgreSQL 14+
- Visual Studio 2022 veya VS Code

### Adımlar
1. **Repository'yi klonlayın**
   ```bash
   git clone https://github.com/emre-x7/alan-rehberi.git
   cd CareerPathfinder
   ```
2. **Database ayarlarını yapın**
   ```bash
   - PostgreSQL'de yeni database oluşturun,
   - appsettings.json dosyasını düzenleyin:
   
     "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Port=5432;Database=CareerPathfinderDB;User Id=postgres;Password=your_password;"
    }
   
3. **Database migration'ları çalıştırın**
    ```bash
    dotnet ef database update --project CareerPathfinder.Infrastructure --startup-        project CareerPathfinder.API

4. **Uygulamayı çalıştırın**
    ```bash
    dotnet run --project CareerPathfinder.API

    Swagger UI'a erişin:
    https://localhost:7000/swagger

### API Endpoint'leri

```bash
Authentication
POST /api/auth/register - Kullanıcı kaydı
POST /api/auth/login - Kullanıcı girişi

Questions
GET /api/questions/department/{id} - Bölüme ait sorular

Questionnaire
POST /api/questionnaire/start - Anket başlatma
POST /api/questionnaire/submit-answers - Cevapları kaydetme
POST /api/questionnaire/complete/{id} - Anketi tamamlama

Results
GET /api/results/user - Kullanıcı sonuçları
GET /api/results/questionnaire/{id} - Detaylı anket raporu
GET /api/results/top-careers - En iyi 5 kariyer  
