using CareerPathfinder.Core.DTOs.Questions;
using CareerPathfinder.Core.Exceptions;
using CareerPathfinder.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using CareerPathfinder.Core.Mappings;

namespace CareerPathfinder.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Sadece authenticated kullanıcılar erişebilir
    public class QuestionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public QuestionsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Questions/department/5
        [HttpGet("department/{departmentId}")]
        public async Task<ActionResult<IEnumerable<QuestionDto>>> GetQuestionsByDepartment(int departmentId)
        {
            // Department var mı kontrol et
            var departmentExists = await _context.Departments
                .AnyAsync(d => d.Id == departmentId);

            if (!departmentExists)
            {
                throw new NotFoundException("Belirtilen bölüm bulunamadı.");
            }

            // Soruları getir (sadece aktif olanlar ve sıralı)
            var questions = await _context.Questions
                .Where(q => q.DepartmentId == departmentId && q.IsActive)
                .OrderBy(q => q.Order)
                .ToListAsync();

            var questionDtos = _mapper.Map<List<QuestionDto>>(questions);
            return Ok(questionDtos);
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuestionDto>> GetQuestion(int id)
        {
            var question = await _context.Questions
                .FirstOrDefaultAsync(q => q.Id == id && q.IsActive);

            if (question == null)
            {
                return NotFound();
            }

            var questionDto = _mapper.Map<QuestionDto>(question);
            return questionDto;

        }
    }
}