using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CareerPathfinder.Core.Entities
{
    public class CareerScore
    {
        // Composite Primary Key: QuestionId ve CareerId birlikte benzersiz bir kaydı tanımlar.
        // Bu, bir soru-bir meslek kombinasyonundan sadece bir tane olmasını garantiler.
        public int QuestionId { get; set; }
        public int CareerId { get; set; }

        // Sizin belirlediğiniz 10 üzerinden puan.
        // Range attribute'u ile 0-10 arasında olmasını zorunlu kılıyoruz.
        [Required]
        [Range(0, 10)]
        public int Score { get; set; }

        // Navigation Properties
        // Bu puan hangi soruya ait?
        [ForeignKey(nameof(QuestionId))]
        public virtual Question Question { get; set; } = null!;

        // Bu puan hangi meslek için?
        [ForeignKey(nameof(CareerId))]
        public virtual Career Career { get; set; } = null!;
    }
}
