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

        // 1) Mesleğe dair kısa ama öz bilgiler
        [Required]
        [MaxLength(2000)]
        public string Summary { get; set; } = string.Empty;

        // 2) Çalışma alanları
        [MaxLength(1000)]
        public string WorkAreas { get; set; } = string.Empty;

        // 3) Piyasa için ortalama maaş
        [MaxLength(500)]
        public string AverageSalary { get; set; } = string.Empty;

        // 4) Seviye bazlı kaynak önerileri
        public string BeginnerResources { get; set; } = string.Empty;  
        public string IntermediateResources { get; set; } = string.Empty;
        public string AdvancedResources { get; set; } = string.Empty;

        // 5) Proje önerileri
        public string ProjectIdeas { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;
    }
}