using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CareerPathfinder.Core.Entities
{
    public class Department
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty; // Örn: "Yönetim Bilişim Sistemleri"

        [MaxLength(500)]
        public string? Description { get; set; }

        // Navigation Properties
        // Bir bölümün birden çok sorusu olur.
        public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
        public virtual ICollection<Career> Careers { get; set; } = new List<Career>();
    }
}
