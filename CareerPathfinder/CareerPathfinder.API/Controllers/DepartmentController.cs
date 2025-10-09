using AutoMapper;
using CareerPathfinder.Core.DTOs.Departments;
using CareerPathfinder.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CareerPathfinder.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<DepartmentsController> _logger;

        public DepartmentsController(
            ApplicationDbContext context,
            IMapper mapper,
            ILogger<DepartmentsController> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentDto>>> GetDepartments()
        {
            _logger.LogInformation("Fetching all departments with counts");

            try
            {
                var departments = await _context.Departments
                    .Include(d => d.Questions)
                    .Include(d => d.Careers)
                    .Where(d => d.Questions.Any(q => q.IsActive)) 
                    .OrderBy(d => d.Name)
                    .ToListAsync();

                var departmentDtos = _mapper.Map<List<DepartmentDto>>(departments);

                _logger.LogInformation("Retrieved {Count} departments", departmentDtos.Count);
                return Ok(departmentDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching departments");
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentDto>> GetDepartment(int id)
        {
            _logger.LogInformation("Fetching department with ID: {DepartmentId}", id);

            try
            {
                var department = await _context.Departments
                    .Include(d => d.Questions)
                    .Include(d => d.Careers)
                    .FirstOrDefaultAsync(d => d.Id == id);

                if (department == null)
                {
                    _logger.LogWarning("Department not found with ID: {DepartmentId}", id);
                    return NotFound(new { message = "Bölüm bulunamadı." });
                }

                var departmentDto = _mapper.Map<DepartmentDto>(department);
                return Ok(departmentDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching department with ID: {DepartmentId}", id);
                throw;
            }
        }

        [HttpGet("with-questions")]
        public async Task<ActionResult<IEnumerable<DepartmentDto>>> GetDepartmentsWithQuestions()
        {
            _logger.LogInformation("Fetching departments with active questions");

            try
            {
                var departments = await _context.Departments
                    .Include(d => d.Questions.Where(q => q.IsActive))
                    .Include(d => d.Careers)
                    .Where(d => d.Questions.Any(q => q.IsActive))
                    .OrderBy(d => d.Name)
                    .ToListAsync();

                var departmentDtos = _mapper.Map<List<DepartmentDto>>(departments);

                _logger.LogInformation("Retrieved {Count} departments with active questions", departmentDtos.Count);
                return Ok(departmentDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching departments with questions");
                throw;
            }
        }
    }
}