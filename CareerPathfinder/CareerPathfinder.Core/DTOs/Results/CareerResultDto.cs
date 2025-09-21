using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CareerPathfinder.Core.DTOs.Results
{
    public class CareerResultDto
    {
        public int CareerId { get; set; }
        public string CareerName { get; set; } = string.Empty;
        public string CareerDescription { get; set; } = string.Empty;
        public int TotalScore { get; set; }
        public int MaxPossibleScore { get; set; }
        public decimal CompatibilityPercentage { get; set; }
        public int Rank { get; set; }
    }
}