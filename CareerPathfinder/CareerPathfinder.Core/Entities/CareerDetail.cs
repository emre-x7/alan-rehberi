using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CareerPathfinder.Core.Entities
{
    public class CareerDetail
    {
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Career))]
        public int CareerId { get; set; }
        public virtual Career Career { get; set; } = null!;

        [Required]
        [MaxLength(2000)]
        public string Summary { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string WorkAreas { get; set; } = string.Empty;

        [MaxLength(500)]
        public string AverageSalary { get; set; } = string.Empty;

        public string BeginnerResources { get; set; } = string.Empty;  
        public string IntermediateResources { get; set; } = string.Empty;
        public string AdvancedResources { get; set; } = string.Empty;

        public string ProjectIdeas { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;
    }
}