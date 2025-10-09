using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CareerPathfinder.Core.Entities
{
    public class Answer
    {
        public int Id { get; set; }

        [ForeignKey(nameof(Questionnaire))]
        public int QuestionnaireId { get; set; }
        public virtual Questionnaire Questionnaire { get; set; } = null!;

        [ForeignKey(nameof(Question))]
        public int QuestionId { get; set; }
        public virtual Question Question { get; set; } = null!;

        [Required]
        [Range(1, 5)]
        public int SelectedValue { get; set; }

        public DateTime AnsweredAt { get; set; } = DateTime.UtcNow;
    }
}