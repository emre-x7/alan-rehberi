using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CareerPathfinder.Core.DTOs.Questionnaire
{
    public class SubmitAnswersRequest
    {
        public int QuestionnaireId { get; set; }
        public List<AnswerDto> Answers { get; set; } = new List<AnswerDto>();
    }
}