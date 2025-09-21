using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CareerPathfinder.Core.Entities
{
    public class Answer
    {
        public int Id { get; set; }

        // Bu cevap hangi anket oturumuna ait?
        [ForeignKey(nameof(Questionnaire))]
        public int QuestionnaireId { get; set; }
        public virtual Questionnaire Questionnaire { get; set; } = null!;

        // Bu cevap hangi soru için verildi?
        [ForeignKey(nameof(Question))]
        public int QuestionId { get; set; }
        public virtual Question Question { get; set; } = null!;

        // Kullanıcının verdiği cevap (1-5 arası Likert ölçeği)
        [Required]
        [Range(1, 5)]
        public int SelectedValue { get; set; }

        public DateTime AnsweredAt { get; set; } = DateTime.UtcNow;
    }
}