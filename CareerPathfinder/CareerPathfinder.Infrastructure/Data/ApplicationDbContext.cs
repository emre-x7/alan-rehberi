using CareerPathfinder.Core.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CareerPathfinder.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser, AppRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // Tüm entity'lerimizi DbSet olarak tanımlıyoruz.
        public DbSet<Department> Departments => Set<Department>();
        public DbSet<Career> Careers => Set<Career>();
        public DbSet<Question> Questions => Set<Question>();
        public DbSet<CareerScore> CareerScores => Set<CareerScore>();
        public DbSet<Questionnaire> Questionnaires => Set<Questionnaire>();
        public DbSet<Answer> Answers => Set<Answer>();
        public DbSet<TestResult> TestResults => Set<TestResult>();
        public DbSet<CareerDetail> CareerDetails => Set<CareerDetail>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            ConfigureModels(builder);
        }

        private void ConfigureModels(ModelBuilder builder)
        {
            builder.Entity<CareerScore>()
                .HasKey(cs => new { cs.QuestionId, cs.CareerId }); // Composite Key

            builder.Entity<CareerScore>()
                .HasOne(cs => cs.Question)
                .WithMany(q => q.CareerScores)
                .HasForeignKey(cs => cs.QuestionId)
                .OnDelete(DeleteBehavior.Cascade); // Soru silinirse puanları da silinsin

            builder.Entity<CareerScore>()
                .HasOne(cs => cs.Career)
                .WithMany(c => c.CareerScores)
                .HasForeignKey(cs => cs.CareerId)
                .OnDelete(DeleteBehavior.Cascade); // Meslek silinirse puanları da silinsin

            // 3) Diğer ilişkiler için temel konfigürasyonlar
            // Department -> Questions (One-to-Many)
            builder.Entity<Question>()
                .HasOne(q => q.Department)
                .WithMany(d => d.Questions)
                .HasForeignKey(q => q.DepartmentId)
                .OnDelete(DeleteBehavior.Cascade);

            // Department -> Careers (One-to-Many)
            builder.Entity<Career>()
                .HasOne(c => c.Department)
                .WithMany(d => d.Careers) // Department entity'sinde ICollection<Career> Careers eklememiz gerekir!
                .HasForeignKey(c => c.DepartmentId)
                .OnDelete(DeleteBehavior.Cascade);

            // Questionnaire -> User (One-to-Many)
            builder.Entity<Questionnaire>()
                .HasOne(q => q.User)
                .WithMany(u => u.Questionnaires)
                .HasForeignKey(q => q.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Questionnaire -> Answers (One-to-Many)
            builder.Entity<Answer>()
                .HasOne(a => a.Questionnaire)
                .WithMany(q => q.Answers)
                .HasForeignKey(a => a.QuestionnaireId)
                .OnDelete(DeleteBehavior.Cascade);

            // TestResult -> Questionnaire (One-to-Many)
            // Bir Questionnaire'in birden çok TestResult'u olabilir.
            builder.Entity<TestResult>()
                .HasOne(tr => tr.Questionnaire)
                .WithMany(q => q.TestResults) // Questionnaire entity'sinde ICollection<TestResult> TestResults olmalı!
                .HasForeignKey(tr => tr.QuestionnaireId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<CareerDetail>(entity =>
            {
                entity.HasKey(cd => cd.Id);

                // Career ile one-to-one ilişki
                entity.HasOne(cd => cd.Career)
                      .WithOne(c => c.CareerDetail)
                      .HasForeignKey<CareerDetail>(cd => cd.CareerId)
                      .OnDelete(DeleteBehavior.Cascade);

                // Index ve constraint'ler
                entity.HasIndex(cd => cd.CareerId).IsUnique();
                entity.HasIndex(cd => cd.IsActive);

                // Property konfigürasyonları
                entity.Property(cd => cd.Summary).IsRequired().HasMaxLength(2000);
                entity.Property(cd => cd.WorkAreas).HasMaxLength(1000);
                entity.Property(cd => cd.AverageSalary).HasMaxLength(500);

                // JSON column için konfigürasyon (PostgreSQL için)
                entity.Property(cd => cd.BeginnerResources)
                      .HasColumnType("jsonb");
                entity.Property(cd => cd.IntermediateResources)
                      .HasColumnType("jsonb");
                entity.Property(cd => cd.AdvancedResources)
                      .HasColumnType("jsonb");
                entity.Property(cd => cd.ProjectIdeas)
                      .HasColumnType("jsonb");
            });
        }
    }
}