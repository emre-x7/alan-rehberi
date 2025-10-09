using AutoMapper;
using CareerPathfinder.API.Extensions;
using CareerPathfinder.Core.DTOs.Questionnaire;
using CareerPathfinder.Core.Entities;
using CareerPathfinder.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.Extensions.Logging;

namespace CareerPathfinder.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class QuestionnaireController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<QuestionnaireController> _logger;

        public QuestionnaireController(
            ApplicationDbContext context,
            IMapper mapper,
            ILogger<QuestionnaireController> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost("start")]
        public async Task<ActionResult<int>> StartQuestionnaire([FromBody] StartQuestionnaireRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var department = await _context.Departments
                .FirstOrDefaultAsync(d => d.Id == request.DepartmentId);

            if (department == null)
            {
                return NotFound(new { message = "Belirtilen bölüm bulunamadı." });
            }

            var activeQuestionnaire = await _context.Questionnaires
                .FirstOrDefaultAsync(q => q.UserId == userId &&
                                        q.DepartmentId == request.DepartmentId &&
                                        q.Status == Core.Enums.QuestionnaireStatus.InProgress);

            if (activeQuestionnaire != null)
            {
                return Ok(activeQuestionnaire.Id);
            }

            var questionnaire = new Questionnaire
            {
                UserId = userId,
                DepartmentId = request.DepartmentId,
                Status = Core.Enums.QuestionnaireStatus.InProgress,
                StartedAt = DateTime.UtcNow
            };

            _context.Questionnaires.Add(questionnaire);
            await _context.SaveChangesAsync();

            _logger.LogQuestionnaireStarted(questionnaire.Id, userId, department.Name);
            return Ok(questionnaire.Id);
        }

        [HttpPost("submit-answers")]
        public async Task<ActionResult> SubmitAnswers([FromBody] SubmitAnswersRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var questionnaire = await _context.Questionnaires
                .FirstOrDefaultAsync(q => q.Id == request.QuestionnaireId && q.UserId == userId);

            if (questionnaire == null)
            {
                return NotFound(new { message = "Anket bulunamadı veya erişim izniniz yok." });
            }

            var answers = request.Answers.Select(a => new Answer
            {
                QuestionnaireId = request.QuestionnaireId,
                QuestionId = a.QuestionId,
                SelectedValue = a.SelectedValue,
                AnsweredAt = DateTime.UtcNow
            }).ToList();

            _context.Answers.AddRange(answers);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Answers submitted successfully - Questionnaire: {QuestionnaireId}, AnswerCount: {AnswerCount}",
                request.QuestionnaireId, answers.Count);

            return Ok(new { message = "Cevaplar başarıyla kaydedildi." });
        }

        [HttpPost("complete/{questionnaireId}")]
        public async Task<ActionResult> CompleteQuestionnaire(int questionnaireId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var questionnaire = await _context.Questionnaires
                .Include(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == questionnaireId && q.UserId == userId);

            if (questionnaire == null)
            {
                return NotFound(new { message = "Anket bulunamadı veya erişim izniniz yok." });
            }

            var results = await CalculateAndSaveResults(questionnaire); 

            questionnaire.Status = Core.Enums.QuestionnaireStatus.Completed;
            questionnaire.CompletedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            _logger.LogQuestionnaireCompleted(questionnaireId, userId);
            _logger.LogResultsCalculated(questionnaireId, results.Count); 

            return Ok(new { message = "Anket tamamlandı. Sonuçlar hesaplandı." });
        }

        private async Task<List<TestResult>> CalculateAndSaveResults(Questionnaire questionnaire)
        {
            var careers = await _context.Careers
                .Where(c => c.DepartmentId == questionnaire.DepartmentId)
                .Include(c => c.CareerScores)
                .ToListAsync();

            var results = new List<TestResult>();

            foreach (var career in careers)
            {
                int totalScore = 0;
                int maxPossibleScore = 0;

                foreach (var answer in questionnaire.Answers)
                {
                    var careerScore = career.CareerScores
                        .FirstOrDefault(cs => cs.QuestionId == answer.QuestionId);

                    if (careerScore != null)
                    {
                        totalScore += answer.SelectedValue * careerScore.Score;
                        maxPossibleScore += 5 * careerScore.Score; 
                    }
                }

                decimal compatibilityPercentage = maxPossibleScore > 0
                    ? Math.Round((decimal)totalScore / maxPossibleScore * 100, 2)
                    : 0;

                results.Add(new TestResult
                {
                    QuestionnaireId = questionnaire.Id,
                    CareerId = career.Id,
                    TotalScore = totalScore,
                    MaxPossibleScore = maxPossibleScore,
                    CompatibilityPercentage = compatibilityPercentage,
                    CalculatedAt = DateTime.UtcNow
                });
            }

            var sortedResults = results.OrderByDescending(r => r.CompatibilityPercentage).ToList();
            for (int i = 0; i < sortedResults.Count; i++)
            {
                sortedResults[i].Rank = i + 1;
            }

            _context.TestResults.AddRange(sortedResults);
            await _context.SaveChangesAsync();

            return sortedResults; 
        }
    }
}