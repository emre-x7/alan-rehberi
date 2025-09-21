using CareerPathfinder.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace CareerPathfinder.Infrastructure.Data
{
    public class DataSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            // Önce veritabanının oluştuğundan emin ol
            await context.Database.EnsureCreatedAsync();

            // Zaten veri var mı? Varsa seed işlemini atla.
            if (await context.Departments.AnyAsync())
            {
                return;
            }

            // 1) YBS BÖLÜMÜNÜ EKLE
            var ybsDepartment = new Department
            {
                Name = "Yönetim Bilişim Sistemleri (YBS)",
                Description = "İş ve teknolojiyi birleştiren, şirketlerin bilgi sistemleri ve teknoloji altyapılarını yönetmeye odaklanan disiplinlerarası bir bölüm."
            };
            await context.Departments.AddAsync(ybsDepartment);
            await context.SaveChangesAsync(); // ID'si oluşsun diye kaydediyoruz

            // 2) MESLEKLERİ EKLE (Backend Developer ve Data Engineer)
            var backendCareer = new Career
            {
                Name = "Backend Developer",
                Description = "Sunucu taraflı yazılım geliştirme, veritabanı yönetimi ve API tasarımı üzerine uzmanlaşmış yazılım geliştiricidir.",
                DepartmentId = ybsDepartment.Id
            };

            var dataEngineerCareer = new Career
            {
                Name = "Data Engineer",
                Description = "Büyük ölçekli veri işleme sistemleri tasarlayan, veri pipeline'ları oluşturan ve veriyi analiz için hazır hale getiren uzmandır.",
                DepartmentId = ybsDepartment.Id
            };

            await context.Careers.AddRangeAsync(backendCareer, dataEngineerCareer);
            await context.SaveChangesAsync(); // ID'leri oluşsun

            // 3) SORULARI EKLE (10 Örnek Soru - YBS için)
            var questions = new List<Question>
            {
                new Question { Content = "RESTful API endpoint'leri tasarlamak ve geliştirmek, veri pipeline'ı oluşturmaktan daha ilgimi çeker.", Order = 1, DepartmentId = ybsDepartment.Id },
                new Question { Content = "Ham, düzensiz verileri temizlemek ve işlemek benim için karmaşık bulmaca çözmek gibi keyifli gelir.", Order = 2, DepartmentId = ybsDepartment.Id },
                new Question { Content = "Bir ürünün kullanıcı deneyimini (UX) iyileştirmek için fikirler üretmek, teknik altyapıyı optimize etmekten daha çok heyecan verir.", Order = 3, DepartmentId = ybsDepartment.Id },
                new Question { Content = "Sunucu donanım kaynaklarını (CPU, RAM) verimli kullanacak şekilde kod optimizasyonu yapmak önceliğimdir.", Order = 4, DepartmentId = ybsDepartment.Id },
                new Question { Content = "Büyük veri kümeleri üzerinde trendler ve desenler keşfetmek için sorgular yazmak ilgimi çeker.", Order = 5, DepartmentId = ybsDepartment.Id },
                new Question { Content = "Karmaşık iş kurallarını ve mantığını anlamak, onları temiz ve okunabilir kodla uygulamak en güçlü yönümüdür.", Order = 6, DepartmentId = ybsDepartment.Id },
                new Question { Content = "Veri ambarı tasarlamak ve farklı kaynaklardan gelen verileri entegre etmek benim için çekicidir.", Order = 7, DepartmentId = ybsDepartment.Id },
                new Question { Content = "Microservices mimarisi tasarlamak ve servisler arası iletişimi yönetmek monolitik uygulama geliştirmekten daha zevklidir.", Order = 8, DepartmentId = ybsDepartment.Id },
                new Question { Content = "Eşzamanlılık (concurrency) problemlerini çözmek ve thread-safe kod yazmak teknik olarak beni tatmin eder.", Order = 9, DepartmentId = ybsDepartment.Id },
                new Question { Content = "Machine Learning modelleri için veri hazırlamak ve feature engineering yapmak, modelin kendisini eğitmekten daha önemli gelir.", Order = 10, DepartmentId = ybsDepartment.Id }
            };

            await context.Questions.AddRangeAsync(questions);
            await context.SaveChangesAsync(); // Tüm soruların ID'leri oluşsun

            // 4) MESLEK PUANLARINI (CAREERSCORE) EKLE (Sizin 10 üzerinden belirlediğiniz puanlar)
            var careerScores = new List<CareerScore>();

            // Her soru için, her mesleğe bir puan verilecek.
            // Puanlama Mantığı: 10 (Mükemmel Uyum), 8-9 (Güçlü), 6-7 (Orta), 0-2 (Düşük)
            // Soru 1: API vs Pipeline
            careerScores.Add(new CareerScore { QuestionId = questions[0].Id, CareerId = backendCareer.Id, Score = 10 });
            careerScores.Add(new CareerScore { QuestionId = questions[0].Id, CareerId = dataEngineerCareer.Id, Score = 0 });

            // Soru 2: Ham veri işleme
            careerScores.Add(new CareerScore { QuestionId = questions[1].Id, CareerId = backendCareer.Id, Score = 3 });
            careerScores.Add(new CareerScore { QuestionId = questions[1].Id, CareerId = dataEngineerCareer.Id, Score = 10 });

            // Soru 3: UX vs Optimizasyon
            careerScores.Add(new CareerScore { QuestionId = questions[2].Id, CareerId = backendCareer.Id, Score = 2 }); // Product Manager'a daha uygun, backend için düşük
            careerScores.Add(new CareerScore { QuestionId = questions[2].Id, CareerId = dataEngineerCareer.Id, Score = 1 });

            // Soru 4: Kod optimizasyonu
            careerScores.Add(new CareerScore { QuestionId = questions[3].Id, CareerId = backendCareer.Id, Score = 9 });
            careerScores.Add(new CareerScore { QuestionId = questions[3].Id, CareerId = dataEngineerCareer.Id, Score = 6 });

            // Soru 5: Veri trendlerini keşfetme
            careerScores.Add(new CareerScore { QuestionId = questions[4].Id, CareerId = backendCareer.Id, Score = 4 }); // Data Analyst/Scientist'e daha uygun
            careerScores.Add(new CareerScore { QuestionId = questions[4].Id, CareerId = dataEngineerCareer.Id, Score = 7 }); // Data Engineer da keşfetmek zorunda kalabilir

            // Soru 6: İş mantığı uygulama
            careerScores.Add(new CareerScore { QuestionId = questions[5].Id, CareerId = backendCareer.Id, Score = 10 });
            careerScores.Add(new CareerScore { QuestionId = questions[5].Id, CareerId = dataEngineerCareer.Id, Score = 3 });

            // Soru 7: Veri ambarı tasarımı
            careerScores.Add(new CareerScore { QuestionId = questions[6].Id, CareerId = backendCareer.Id, Score = 2 });
            careerScores.Add(new CareerScore { QuestionId = questions[6].Id, CareerId = dataEngineerCareer.Id, Score = 9 });

            // Soru 8: Microservices mimarisi
            careerScores.Add(new CareerScore { QuestionId = questions[7].Id, CareerId = backendCareer.Id, Score = 9 });
            careerScores.Add(new CareerScore { QuestionId = questions[7].Id, CareerId = dataEngineerCareer.Id, Score = 5 }); // Data Pipeline'lar da dağıtık olabilir

            // Soru 9: Eşzamanlılık problemleri
            careerScores.Add(new CareerScore { QuestionId = questions[8].Id, CareerId = backendCareer.Id, Score = 8 });
            careerScores.Add(new CareerScore { QuestionId = questions[8].Id, CareerId = dataEngineerCareer.Id, Score = 6 }); // Data processing'te de önemli

            // Soru 10: Feature engineering
            careerScores.Add(new CareerScore { QuestionId = questions[9].Id, CareerId = backendCareer.Id, Score = 1 });
            careerScores.Add(new CareerScore { QuestionId = questions[9].Id, CareerId = dataEngineerCareer.Id, Score = 8 }); // Data Engineer'ın işi

            await context.CareerScores.AddRangeAsync(careerScores);
            await context.SaveChangesAsync();
        }
    }
}