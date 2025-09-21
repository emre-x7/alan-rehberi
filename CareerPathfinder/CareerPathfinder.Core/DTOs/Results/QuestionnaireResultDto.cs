using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CareerPathfinder.Core.DTOs.Results
{
    public class QuestionnaireResultDto
    {
        public int QuestionnaireId { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public DateTime StartedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        public List<CareerResultDto> CareerResults { get; set; } = new List<CareerResultDto>();
    }
}