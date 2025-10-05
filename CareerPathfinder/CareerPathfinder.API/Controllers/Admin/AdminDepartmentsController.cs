using AutoMapper;
using CareerPathfinder.Core.DTOs.Admin;
using CareerPathfinder.Core.Entities;
using CareerPathfinder.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CareerPathfinder.API.Controllers.Admin
{
    public class AdminDepartmentsController : AdminBaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AdminDepartmentsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminDepartmentDto>>> GetDepartments()
        {
            var departments = await _context.Departments
                .Include(d => d.Questions)
                .Include(d => d.Careers)
                .OrderBy(d => d.Name)
                .ToListAsync();

            var departmentDtos = _mapper.Map<List<AdminDepartmentDto>>(departments);
            return Ok(departmentDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdminDepartmentDto>> GetDepartment(int id)
        {
            var department = await _context.Departments
                .Include(d => d.Questions)
                .Include(d => d.Careers)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (department == null)
            {
                return NotFound(new { message = "Bölüm bulunamadı." });
            }

            var departmentDto = _mapper.Map<AdminDepartmentDto>(department);
            return Ok(departmentDto);
        }

        [HttpPost]
        public async Task<ActionResult<AdminDepartmentDto>> CreateDepartment([FromBody] CreateDepartmentRequest request)
        {
            // Aynı isimde bölüm var mı kontrol et
            var existingDepartment = await _context.Departments
                .FirstOrDefaultAsync(d => d.Name.ToLower() == request.Name.ToLower());

            if (existingDepartment != null)
            {
                return BadRequest(new { message = "Bu isimde bir bölüm zaten mevcut." });
            }

            var department = new Department
            {
                Name = request.Name,
                Description = request.Description
            };

            _context.Departments.Add(department);
            await _context.SaveChangesAsync();

            var departmentDto = _mapper.Map<AdminDepartmentDto>(department);
            return CreatedAtAction(nameof(GetDepartment), new { id = department.Id }, departmentDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment(int id, [FromBody] UpdateDepartmentRequest request)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound(new { message = "Bölüm bulunamadı." });
            }

            // İsim değişikliği için kontrol (başka bölümde aynı isim var mı?)
            if (department.Name != request.Name)
            {
                var existingDepartment = await _context.Departments
                    .FirstOrDefaultAsync(d => d.Name.ToLower() == request.Name.ToLower() && d.Id != id);

                if (existingDepartment != null)
                {
                    return BadRequest(new { message = "Bu isimde başka bir bölüm zaten mevcut." });
                }
            }

            department.Name = request.Name;
            department.Description = request.Description;
            department.IsActive = request.IsActive;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Bölüm başarıyla güncellendi." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var department = await _context.Departments
                .Include(d => d.Questions)
                .Include(d => d.Careers)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (department == null)
            {
                return NotFound(new { message = "Bölüm bulunamadı." });
            }

            // İlişkili veri kontrolü
            if (department.Questions.Any() || department.Careers.Any())
            {
                return BadRequest(new
                {
                    message = "Bu bölüme ait sorular veya meslekler olduğu için silinemez. Önce ilişkili verileri temizleyin."
                });
            }

            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Bölüm başarıyla silindi." });
        }
    }
}