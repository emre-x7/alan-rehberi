using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CareerPathfinder.Core.Entities
{
    public class TestResult
    {
        public int Id { get; set; }

        [ForeignKey(nameof(Questionnaire))]
        public int QuestionnaireId { get; set; }
        public virtual Questionnaire Questionnaire { get; set; } = null!;

        [ForeignKey(nameof(Career))]
        public int CareerId { get; set; }
        public virtual Career Career { get; set; } = null!;

        public int TotalScore { get; set; }

        public int MaxPossibleScore { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal CompatibilityPercentage { get; set; }

        public int Rank { get; set; }

        public DateTime CalculatedAt { get; set; } = DateTime.UtcNow;
    }
}