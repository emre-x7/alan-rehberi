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

        // Bu meslek hangi bölüme ait? (Örn: Backend Developer -> YBS)
        [ForeignKey(nameof(Department))]
        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; } = null!;

        // Navigation Properties
        // Bu mesleğe ait puanlar (CareerScore) listesi
        public virtual ICollection<CareerScore> CareerScores { get; set; } = new List<CareerScore>();
    }
}
