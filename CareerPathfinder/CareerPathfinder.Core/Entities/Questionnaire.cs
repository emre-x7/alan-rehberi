using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CareerPathfinder.Core.Enums;

namespace CareerPathfinder.Core.Entities
{
    public class Questionnaire
    {
        public int Id { get; set; }

        // Bu anket hangi kullanıcıya ait?
        [ForeignKey(nameof(User))]
        public string UserId { get; set; } = string.Empty; // string olarak kalacak (Identity'de Id string'tir)
        public virtual AppUser User { get; set; } = null!;

        // Bu anket hangi bölüm için? (Örn: YBS)
        [ForeignKey(nameof(Department))]
        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; } = null!;

        public DateTime StartedAt { get; set; } = DateTime.UtcNow;
        public DateTime? CompletedAt { get; set; } // Test bitirme zamanı (null ise henüz bitmemiş)

        // Anketin durumu (Devam ediyor, tamamlandı, vs.)
        public QuestionnaireStatus Status { get; set; } = QuestionnaireStatus.InProgress;

        // Navigation Properties
        // Bu ankete verilen tüm cevaplar
        public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();

        // Bu anketin sonucu (Test tamamlandığında oluşturulacak)
        public virtual ICollection<TestResult> TestResults { get; set; } = new List<TestResult>();
    }
}