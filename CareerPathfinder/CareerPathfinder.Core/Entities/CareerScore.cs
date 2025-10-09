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
        public int QuestionId { get; set; }
        public int CareerId { get; set; }

         [Required]
        [Range(0, 10)]
        public int Score { get; set; }

        [ForeignKey(nameof(QuestionId))]
        public virtual Question Question { get; set; } = null!;

        [ForeignKey(nameof(CareerId))]
        public virtual Career Career { get; set; } = null!;
    }
}
