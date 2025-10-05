using AutoMapper;
using CareerPathfinder.Core.DTOs.Admin;
using CareerPathfinder.Core.Entities;
using CareerPathfinder.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CareerPathfinder.API.Controllers.Admin
{
    public class AdminCareersController : AdminBaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AdminCareersController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("department/{departmentId}")]
        public async Task<ActionResult<IEnumerable<AdminCareerDto>>> GetCareersByDepartment(int departmentId)
        {
            var department = await _context.Departments.FindAsync(departmentId);
            if (department == null)
            {
                return NotFound(new { message = "Bölüm bulunamadı." });
            }

            var careers = await _context.Careers
                .Include(c => c.Department)
                .Include(c => c.CareerScores)
                .Include(c => c.TestResults)
                .Include(c => c.CareerDetail)
                .Where(c => c.DepartmentId == departmentId)
                .OrderBy(c => c.Name)
                .ToListAsync();

            var careerDtos = _mapper.Map<List<AdminCareerDto>>(careers);

            
            foreach (var careerDto in careerDtos)
            {
                careerDto.HasDetail = careers.First(c => c.Id == careerDto.Id).CareerDetail != null;
            }

            return Ok(careerDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdminCareerDto>> GetCareer(int id)
        {
            var career = await _context.Careers
                .Include(c => c.Department)
                .Include(c => c.CareerScores)
                .ThenInclude(cs => cs.Question)
                .Include(c => c.TestResults)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (career == null)
            {
                return NotFound(new { message = "Meslek bulunamadı." });
            }

            var careerDto = _mapper.Map<AdminCareerDto>(career);
            return Ok(careerDto);
        }

        [HttpPost]
        public async Task<ActionResult<AdminCareerDto>> CreateCareer([FromBody] CreateCareerRequest request)
        {
            var department = await _context.Departments.FindAsync(request.DepartmentId);
            if (department == null)
            {
                return NotFound(new { message = "Bölüm bulunamadı." });
            }

            // Aynı isimde meslek var mı kontrol et
            var existingCareer = await _context.Careers
                .FirstOrDefaultAsync(c => c.Name.ToLower() == request.Name.ToLower() &&
                                         c.DepartmentId == request.DepartmentId);

            if (existingCareer != null)
            {
                return BadRequest(new { message = "Bu bölümde aynı isimde meslek zaten mevcut." });
            }

            var career = new Career
            {
                Name = request.Name,
                Description = request.Description,
                DepartmentId = request.DepartmentId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Careers.Add(career);
            await _context.SaveChangesAsync();

            // Mesleği tekrar getirerek ilişkili verileri dahil et
            var createdCareer = await _context.Careers
                .Include(c => c.Department)
                .Include(c => c.CareerScores)
                .Include(c => c.TestResults)
                .FirstOrDefaultAsync(c => c.Id == career.Id);

            var careerDto = _mapper.Map<AdminCareerDto>(createdCareer);
            return CreatedAtAction(nameof(GetCareer), new { id = career.Id }, careerDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCareer(int id, [FromBody] UpdateCareerRequest request)
        {
            var career = await _context.Careers.FindAsync(id);
            if (career == null)
            {
                return NotFound(new { message = "Meslek bulunamadı." });
            }

            // İsim değişikliği için kontrol
            if (career.Name != request.Name)
            {
                var existingCareer = await _context.Careers
                    .FirstOrDefaultAsync(c => c.Name.ToLower() == request.Name.ToLower() &&
                                             c.DepartmentId == career.DepartmentId &&
                                             c.Id != id);

                if (existingCareer != null)
                {
                    return BadRequest(new { message = "Bu bölümde aynı isimde başka meslek zaten mevcut." });
                }
            }

            career.Name = request.Name;
            career.Description = request.Description;
            career.IsActive = request.IsActive;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Meslek başarıyla güncellendi." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCareer(int id)
        {
            var career = await _context.Careers
                .Include(c => c.CareerScores)
                .Include(c => c.TestResults)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (career == null)
            {
                return NotFound(new { message = "Meslek bulunamadı." });
            }

            // İlişkili veri kontrolü
            if (career.TestResults.Any())
            {
                return BadRequest(new
                {
                    message = "Bu meslek için test sonuçları olduğu için silinemez. Mesleği pasif yapabilirsiniz."
                });
            }

            _context.Careers.Remove(career);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Meslek başarıyla silindi." });
        }

        [HttpGet("{id}/scores")]
        public async Task<ActionResult<IEnumerable<CareerScoreDto>>> GetCareerScores(int id)
        {
            var career = await _context.Careers
                .Include(c => c.Department)
                .ThenInclude(d => d.Questions)
                .Include(c => c.CareerScores)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (career == null)
            {
                return NotFound(new { message = "Meslek bulunamadı." });
            }

            // Departmana ait tüm sorular
            var allQuestions = career.Department.Questions.ToList();

            // Mevcut puanlamalar
            var existingScores = career.CareerScores.ToDictionary(cs => cs.QuestionId, cs => cs.Score);

            // Her soru için puanlama yap
            var scores = allQuestions.Select(q => new CareerScoreDto
            {
                QuestionId = q.Id,
                QuestionContent = q.Content,
                Score = existingScores.ContainsKey(q.Id) ? existingScores[q.Id] : 0
            }).ToList();

            return Ok(scores);
        }

        [HttpPost("scores")]
        public async Task<IActionResult> UpdateCareerScores([FromBody] UpdateCareerScoresRequest request)
        {
            var career = await _context.Careers
                .Include(c => c.Department)
                .ThenInclude(d => d.Questions)
                .FirstOrDefaultAsync(c => c.Id == request.CareerId);

            if (career == null)
            {
                return NotFound(new { message = "Meslek bulunamadı." });
            }

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // Mevcut puanları temizle
                var existingScores = _context.CareerScores.Where(cs => cs.CareerId == request.CareerId);
                _context.CareerScores.RemoveRange(existingScores);

                // Yeni puanları ekle
                var newScores = new List<CareerScore>();
                foreach (var scoreDto in request.Scores)
                {
                    // Sorunun bu bölüme ait olduğunu kontrol et
                    var question = career.Department.Questions.FirstOrDefault(q => q.Id == scoreDto.QuestionId);
                    if (question == null)
                    {
                        await transaction.RollbackAsync();
                        return BadRequest(new { message = $"Soru (ID: {scoreDto.QuestionId}) bu bölüme ait değil." });
                    }

                    newScores.Add(new CareerScore
                    {
                        QuestionId = scoreDto.QuestionId,
                        CareerId = request.CareerId,
                        Score = scoreDto.Score
                    });
                }

                await _context.CareerScores.AddRangeAsync(newScores);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new { message = "Meslek puanları başarıyla güncellendi." });
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}