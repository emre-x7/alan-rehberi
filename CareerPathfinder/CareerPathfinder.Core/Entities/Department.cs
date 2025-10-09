using System.ComponentModel.DataAnnotations;

namespace CareerPathfinder.Core.Entities
{
    public class Department
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 

        public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
        public virtual ICollection<Career> Careers { get; set; } = new List<Career>();
    }
}