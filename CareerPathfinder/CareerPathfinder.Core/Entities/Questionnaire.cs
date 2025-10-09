using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CareerPathfinder.Core.Enums;

namespace CareerPathfinder.Core.Entities
{
    public class Questionnaire
    {
        public int Id { get; set; }

        [ForeignKey(nameof(User))]
        public string UserId { get; set; } = string.Empty; 
        public virtual AppUser User { get; set; } = null!;

        [ForeignKey(nameof(Department))]
        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; } = null!;

        public DateTime StartedAt { get; set; } = DateTime.UtcNow;
        public DateTime? CompletedAt { get; set; } 

        public QuestionnaireStatus Status { get; set; } = QuestionnaireStatus.InProgress;

        public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();

        public virtual ICollection<TestResult> TestResults { get; set; } = new List<TestResult>();
    }
}