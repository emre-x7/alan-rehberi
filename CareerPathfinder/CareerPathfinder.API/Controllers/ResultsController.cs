using CareerPathfinder.Core.DTOs.Results;
using CareerPathfinder.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using AutoMapper;

namespace CareerPathfinder.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ResultsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ResultsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("questionnaire/{questionnaireId}")]
        public async Task<ActionResult<QuestionnaireResultDto>> GetQuestionnaireResults(int questionnaireId)
        {

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var questionnaire = await _context.Questionnaires
                .Include(q => q.Department)
                .Include(q => q.TestResults)
                    .ThenInclude(tr => tr.Career)
                .FirstOrDefaultAsync(q => q.Id == questionnaireId && q.UserId == userId && q.Status == Core.Enums.QuestionnaireStatus.Completed);

            if (questionnaire == null)
            {
                return NotFound(new { message = "Sonuçlar bulunamadı veya anket henüz tamamlanmamış." });
            }

            var resultDto = _mapper.Map<QuestionnaireResultDto>(questionnaire);
            return Ok(resultDto);
        }

        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<QuestionnaireResultDto>>> GetUserResults()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var questionnaires = await _context.Questionnaires
                .Where(q => q.UserId == userId && q.Status == Core.Enums.QuestionnaireStatus.Completed)
                .Include(q => q.Department)
                .Include(q => q.TestResults)
                    .ThenInclude(tr => tr.Career)
                .OrderByDescending(q => q.CompletedAt)
                .ToListAsync();

            var resultDtos = _mapper.Map<List<QuestionnaireResultDto>>(questionnaires);
            return Ok(resultDtos);
        }

        [HttpGet("top-careers")]
        public async Task<ActionResult<IEnumerable<CareerResultDto>>> GetTopCareers()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var topCareers = await _context.TestResults
                .Where(tr => tr.Questionnaire.UserId == userId)
                .GroupBy(tr => tr.CareerId)
                .Select(g => new
                {
                    CareerId = g.Key,
                    AvgCompatibility = g.Average(tr => tr.CompatibilityPercentage),
                    Career = g.First().Career
                })
                .OrderByDescending(x => x.AvgCompatibility)
                .Take(5)
                .ToListAsync();

            var resultDtos = topCareers.Select((x, index) => new CareerResultDto
            {
                CareerId = x.CareerId,
                CareerName = x.Career.Name,
                CareerDescription = x.Career.Description ?? string.Empty,
                CompatibilityPercentage = Math.Round(x.AvgCompatibility, 2),
                Rank = index + 1
            }).ToList();

            return Ok(resultDtos);
        }
    }
}