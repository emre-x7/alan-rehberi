using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CareerPathfinder.Core.DTOs.Questionnaire
{
    public class AnswerDto
    {
        public int QuestionId { get; set; }
        public int SelectedValue { get; set; } // 1-5 arası Likert değeri
    }
}