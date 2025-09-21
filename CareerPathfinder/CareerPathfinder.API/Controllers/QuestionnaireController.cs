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
            // Kullanıcıyı al
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            // Department var mı kontrol et
            var department = await _context.Departments
                .FirstOrDefaultAsync(d => d.Id == request.DepartmentId);

            if (department == null)
            {
                return NotFound(new { message = "Belirtilen bölüm bulunamadı." });
            }

            // Aktif bir anketi var mı kontrol et
            var activeQuestionnaire = await _context.Questionnaires
                .FirstOrDefaultAsync(q => q.UserId == userId &&
                                        q.DepartmentId == request.DepartmentId &&
                                        q.Status == Core.Enums.QuestionnaireStatus.InProgress);

            if (activeQuestionnaire != null)
            {
                // Devam eden anket varsa onu döndür
                return Ok(activeQuestionnaire.Id);
            }

            // Yeni anket oluştur
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
            // Kullanıcıyı al
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            // Anketi ve kullanıcıyı kontrol et
            var questionnaire = await _context.Questionnaires
                .FirstOrDefaultAsync(q => q.Id == request.QuestionnaireId && q.UserId == userId);

            if (questionnaire == null)
            {
                return NotFound(new { message = "Anket bulunamadı veya erişim izniniz yok." });
            }

            // Cevapları kaydet
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
            // Kullanıcıyı al
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            // Anketi ve kullanıcıyı kontrol et
            var questionnaire = await _context.Questionnaires
                .Include(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == questionnaireId && q.UserId == userId);

            if (questionnaire == null)
            {
                return NotFound(new { message = "Anket bulunamadı veya erişim izniniz yok." });
            }

            // Test sonuçlarını hesapla ve kaydet
            var results = await CalculateAndSaveResults(questionnaire); // results değişkenini burada tanımlıyoruz

            // Anketi tamamlandı olarak işaretle
            questionnaire.Status = Core.Enums.QuestionnaireStatus.Completed;
            questionnaire.CompletedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            _logger.LogQuestionnaireCompleted(questionnaireId, userId);
            _logger.LogResultsCalculated(questionnaireId, results.Count); // Artık results değişkeni tanımlı

            return Ok(new { message = "Anket tamamlandı. Sonuçlar hesaplandı." });
        }

        private async Task<List<TestResult>> CalculateAndSaveResults(Questionnaire questionnaire)
        {
            // Tüm kariyerleri ve puanlarını getir
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
                    // Bu sorunun bu kariyer için puanını bul
                    var careerScore = career.CareerScores
                        .FirstOrDefault(cs => cs.QuestionId == answer.QuestionId);

                    if (careerScore != null)
                    {
                        // Kullanıcının verdiği cevap (1-5) ile kariyer puanını (0-10) çarp
                        totalScore += answer.SelectedValue * careerScore.Score;
                        maxPossibleScore += 5 * careerScore.Score; // Maksimum 5 puan verilebilir
                    }
                }

                // Yüzdelik uyumu hesapla
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

            // Sonuçları sırala ve rank ekle
            var sortedResults = results.OrderByDescending(r => r.CompatibilityPercentage).ToList();
            for (int i = 0; i < sortedResults.Count; i++)
            {
                sortedResults[i].Rank = i + 1;
            }

            _context.TestResults.AddRange(sortedResults);
            await _context.SaveChangesAsync();

            return sortedResults; // Sonuçları döndürüyoruz
        }
    }
}