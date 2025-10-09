using AutoMapper;
using CareerPathfinder.Core.DTOs.Admin;
using CareerPathfinder.Core.Entities;
using CareerPathfinder.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CareerPathfinder.API.Controllers.Admin
{
    public class AdminQuestionsController : AdminBaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AdminQuestionsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("department/{departmentId}")]
        public async Task<ActionResult<IEnumerable<AdminQuestionDto>>> GetQuestionsByDepartment(int departmentId)
        {
            var department = await _context.Departments.FindAsync(departmentId);
            if (department == null)
            {
                return NotFound(new { message = "Bölüm bulunamadı." });
            }

            var questions = await _context.Questions
                .Include(q => q.Department)
                .Include(q => q.Answers)
                .Where(q => q.DepartmentId == departmentId)
                .OrderBy(q => q.Order)
                .ThenBy(q => q.Id)
                .ToListAsync();

            var questionDtos = _mapper.Map<List<AdminQuestionDto>>(questions);
            return Ok(questionDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdminQuestionDto>> GetQuestion(int id)
        {
            var question = await _context.Questions
                .Include(q => q.Department)
                .Include(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (question == null)
            {
                return NotFound(new { message = "Soru bulunamadı." });
            }

            var questionDto = _mapper.Map<AdminQuestionDto>(question);
            return Ok(questionDto);
        }

        [HttpPost]
        public async Task<ActionResult<AdminQuestionDto>> CreateQuestion([FromBody] CreateQuestionRequest request)
        {
            var department = await _context.Departments.FindAsync(request.DepartmentId);
            if (department == null)
            {
                return NotFound(new { message = "Bölüm bulunamadı." });
            }

            var existingQuestion = await _context.Questions
                .FirstOrDefaultAsync(q => q.Content.ToLower() == request.Content.ToLower() &&
                                         q.DepartmentId == request.DepartmentId);

            if (existingQuestion != null)
            {
                return BadRequest(new { message = "Bu bölümde aynı içerikte soru zaten mevcut." });
            }

            var question = new Question
            {
                Content = request.Content,
                Order = request.Order,
                IsActive = request.IsActive,
                DepartmentId = request.DepartmentId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            var createdQuestion = await _context.Questions
                .Include(q => q.Department)
                .Include(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == question.Id);

            var questionDto = _mapper.Map<AdminQuestionDto>(createdQuestion);
            return CreatedAtAction(nameof(GetQuestion), new { id = question.Id }, questionDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuestion(int id, [FromBody] UpdateQuestionRequest request)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound(new { message = "Soru bulunamadı." });
            }

            if (question.Content != request.Content)
            {
                var existingQuestion = await _context.Questions
                    .FirstOrDefaultAsync(q => q.Content.ToLower() == request.Content.ToLower() &&
                                             q.DepartmentId == question.DepartmentId &&
                                             q.Id != id);

                if (existingQuestion != null)
                {
                    return BadRequest(new { message = "Bu bölümde aynı içerikte başka soru zaten mevcut." });
                }
            }

            question.Content = request.Content;
            question.Order = request.Order;
            question.IsActive = request.IsActive;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Soru başarıyla güncellendi." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var question = await _context.Questions
                .Include(q => q.Answers)
                .Include(q => q.CareerScores)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (question == null)
            {
                return NotFound(new { message = "Soru bulunamadı." });
            }

            if (question.Answers.Any())
            {
                return BadRequest(new
                {
                    message = "Bu soruya verilmiş cevaplar olduğu için silinemez. Soruyu pasif yapabilirsiniz."
                });
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Soru başarıyla silindi." });
        }

        [HttpPost("reorder")]
        public async Task<IActionResult> ReorderQuestions([FromBody] ReorderQuestionsRequest request)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                foreach (var order in request.QuestionOrders)
                {
                    var question = await _context.Questions.FindAsync(order.QuestionId);
                    if (question != null)
                    {
                        question.Order = order.NewOrder;
                    }
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new { message = "Soru sıralaması başarıyla güncellendi." });
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}