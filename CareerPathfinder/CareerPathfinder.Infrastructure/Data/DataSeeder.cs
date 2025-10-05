using CareerPathfinder.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CareerPathfinder.Infrastructure.Data
{
    public class DataSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context,
                                    UserManager<AppUser> userManager,
                                    RoleManager<AppRole> roleManager)
        {
            // Önce veritabanının oluştuğundan emin ol
            await context.Database.EnsureCreatedAsync();



            //ROLLERİ EKLİYORUM
            if (!await context.Roles.AnyAsync())
            {
                var roles = new List<AppRole>
                {
                    new AppRole
                    {
                        Name ="Admin",
                        Description ="Sistem Yöneticisi",
                        RoleType="System",
                        NormalizedName="ADMIN"
                    },
                    new AppRole
                    {
                        Name="User",
                        Description="Standart kullanıcı",
                        RoleType="System",
                        NormalizedName="USER"
                    }
                };

                await context.Roles.AddRangeAsync(roles);
                await context.SaveChangesAsync();
            }

            //ADMİN KULLANICISINI EKLİYORUM
            var adminUser = await userManager.FindByEmailAsync("admin@careerpathfinder.com");
            if (adminUser == null)
            {
                adminUser = new AppUser
                {
                    UserName = "admin@careerpathfinder.com",
                    Email = "admin@careerpathfinder.com",
                    FirstName = "System",
                    LastName = "Admin",
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(adminUser, "Admin123!");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }

            {

                // Zaten veri var mı? Varsa seed işlemini atla.
                if (await context.Departments.AnyAsync()) return;

                // 1) YBS BÖLÜMÜNÜ EKLE
                var ybsDepartment = new Department
                {
                    Name = "Yönetim Bilişim Sistemleri (YBS)",
                    Description = "İş ve teknolojiyi birleştiren, şirketlerin bilgi sistemleri ve teknoloji altyapılarını yönetmeye odaklanan disiplinlerarası bir bölüm.",
                    CreatedAt = DateTime.UtcNow
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


            //KARİYER DETAY SAYFASI İÇİN DATADEED, ADMİN PANELİNDEN YÖNETİLECEK BURASI SADECE BİR ÖRNEK

            var careers = await context.Careers.ToListAsync();

            if (careers.Any() && !await context.CareerDetails.AnyAsync())
            {
                var careerDetails = new List<CareerDetail>();

                foreach (var career in careers)
                {
                    // Sadece CareerDetails tablosunda olmayan career'lar için ekle
                    var existingDetail = await context.CareerDetails
                        .FirstOrDefaultAsync(cd => cd.CareerId == career.Id);

                    if (existingDetail == null)
                    {
                        careerDetails.Add(new CareerDetail
                        {
                            CareerId = career.Id,
                            Summary = GetCareerSummary(career.Name),
                            WorkAreas = GetWorkAreas(career.Name),
                            AverageSalary = GetAverageSalary(career.Name),
                            BeginnerResources = GetResourcesJson("Beginner", career.Name),
                            IntermediateResources = GetResourcesJson("Intermediate", career.Name),
                            AdvancedResources = GetResourcesJson("Advanced", career.Name),
                            ProjectIdeas = GetProjectIdeasJson(career.Name),
                            CreatedAt = DateTime.UtcNow,
                            UpdatedAt = DateTime.UtcNow,
                            IsActive = true
                        });
                    }
                }

                if (careerDetails.Any())
                {
                    await context.CareerDetails.AddRangeAsync(careerDetails);
                    await context.SaveChangesAsync();
                }
            }
        }

        // Yardımcı metodlar
        private static string GetCareerSummary(string careerName)
        {
            return careerName switch
            {
                "Backend Developer" => "Sunucu taraflı yazılım geliştirme uzmanı. Veritabanları, API'ler ve sunucu altyapısı üzerine çalışır.",
                "Data Engineer" => "Büyük veri sistemleri tasarlayan ve veri pipeline'ları oluşturan uzman.",
                "Frontend Developer" => "Kullanıcı arayüzü geliştirme ve kullanıcı deneyimi odaklı yazılım geliştiricisi.",
                _ => $"{careerName} kariyeri hakkında detaylı bilgi."
            };
        }

        private static string GetWorkAreas(string careerName)
        {
            return careerName switch
            {
                "Backend Developer" => "Web API Geliştirme, Mikroservis Mimarisi, Veritabanı Yönetimi, Cloud Computing",
                "Data Engineer" => "Veri Pipeline'ları, ETL Süreçleri, Büyük Veri Analitiği, Veri Ambarı Tasarımı",
                "Frontend Developer" => "Responsive Web Tasarım, Single Page Applications, UI/UX Implementation, Cross-browser Development",
                _ => "Çeşitli çalışma alanları"
            };
        }

        private static string GetAverageSalary(string careerName)
        {
            return careerName switch
            {
                "Backend Developer" => "Junior: 20.000-30.000 TL, Mid: 30.000-45.000 TL, Senior: 45.000-70.000 TL",
                "Data Engineer" => "Junior: 25.000-35.000 TL, Mid: 35.000-50.000 TL, Senior: 50.000-80.000 TL",
                "Frontend Developer" => "Junior: 18.000-28.000 TL, Mid: 28.000-42.000 TL, Senior: 42.000-65.000 TL",
                _ => "Tecrübe ve şirkete göre değişkenlik gösterir"
            };
        }

        private static string GetResourcesJson(string level, string careerName)
        {
            var resources = new List<object>();

            if (careerName == "Backend Developer")
            {
                resources = level switch
                {
                    "Beginner" => new List<object>
            {
                new {
                    title = "C# Fundamentals",
                    url = "https://example.com/csharp-fundamentals",
                    type = "Course",
                    description = "Temel C# programlama"
                },
                new {
                    title = "Entity Framework Core",
                    url = "https://example.com/ef-core",
                    type = "Tutorial",
                    description = "ORM kullanımı"
                }
            },
                    // ... diğer seviyeler
                    _ => new List<object>()
                };
            }

            return System.Text.Json.JsonSerializer.Serialize(resources, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
        }

        private static string GetProjectIdeasJson(string careerName)
        {
            var projects = new List<object>();

            if (careerName == "Backend Developer")
            {
                projects = new List<object>
        {
            new {
                Title = "E-ticaret API",
                Description = "Tam özellikli e-ticaret backend API'si",
                Difficulty = "Intermediate",
                Technologies = new[] { "ASP.NET Core", "Entity Framework", "SQL Server", "JWT" }
            },
            new {
                Title = "Real-time Chat Uygulaması",
                Description = "WebSocket tabanlı gerçek zamanlı mesajlaşma",
                Difficulty = "Advanced",
                Technologies = new[] { "SignalR", "Redis", "WebSocket", "SQL Server" }
            }
        };
            }

            return System.Text.Json.JsonSerializer.Serialize(projects);
        }
    }
}
