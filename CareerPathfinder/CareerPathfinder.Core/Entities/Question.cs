using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CareerPathfinder.Core.Entities
{
    public class Question
    {
        public int Id { get; set; }

        [Required]
        public string Content { get; set; } = string.Empty;

        public int Order { get; set; } 
        public bool IsActive { get; set; } = true; 
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey(nameof(Department))]
        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; } = null!;

        public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();

        public virtual ICollection<CareerScore> CareerScores { get; set; } = new List<CareerScore>();
    }
}
