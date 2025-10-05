using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CareerPathfinder.Core.Entities
{
    public class Career
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string? Description { get; set; }

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey(nameof(Department))]
        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; } = null!;
        public virtual CareerDetail? CareerDetail { get; set; }

        // Navigation Properties
        public virtual ICollection<CareerScore> CareerScores { get; set; } = new List<CareerScore>();
        public virtual ICollection<TestResult> TestResults { get; set; } = new List<TestResult>();
    }
}