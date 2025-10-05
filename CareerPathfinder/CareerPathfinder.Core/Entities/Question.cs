using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CareerPathfinder.Core.Entities
{
    public class Question
    {
        public int Id { get; set; }

        [Required]
        public string Content { get; set; } = string.Empty;

        public int Order { get; set; } // Soru sırası (1, 2, 3...)

        public bool IsActive { get; set; } = true; // Soru aktif mi?
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Bu soru hangi bölüme ait? (Örn: "API yazmak..." sorusu -> YBS)
        [ForeignKey(nameof(Department))]
        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; } = null!;

        // Navigation Properties
        // Bu soruya verilen kullanıcı cevaplarının listesi
        public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();

        // Bu sorunun farklı kariyerler için puanlarının listesi (PROJENİN ÇEKİRDEĞİ)
        public virtual ICollection<CareerScore> CareerScores { get; set; } = new List<CareerScore>();
    }
}
