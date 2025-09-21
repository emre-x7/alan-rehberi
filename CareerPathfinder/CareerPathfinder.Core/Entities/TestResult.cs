using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CareerPathfinder.Core.Entities
{
    public class TestResult
    {
        public int Id { get; set; }

        // Bu sonuç hangi anket oturumuna ait?
        [ForeignKey(nameof(Questionnaire))]
        public int QuestionnaireId { get; set; }
        public virtual Questionnaire Questionnaire { get; set; } = null!;

        // Bu sonuç hangi kariyer için?
        [ForeignKey(nameof(Career))]
        public int CareerId { get; set; }
        public virtual Career Career { get; set; } = null!;

        // Hesaplanan ham puan (Örn: 450)
        public int TotalScore { get; set; }

        // Maksimum alınabilecek puan (Örn: 500)
        public int MaxPossibleScore { get; set; }

        // Yüzdelik uyum skoru (Örn: 90.0)
        [Column(TypeName = "decimal(5, 2)")]
        public decimal CompatibilityPercentage { get; set; }

        // Bu kariyerin kullanıcı için sıralaması (Örn: 1., 2., 3.)
        public int Rank { get; set; }

        public DateTime CalculatedAt { get; set; } = DateTime.UtcNow;
    }
}