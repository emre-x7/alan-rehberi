using AutoMapper;
using CareerPathfinder.Core.DTOs.Admin;
using CareerPathfinder.Core.DTOs.Careers;
using CareerPathfinder.Core.Entities;
using CareerPathfinder.Core.Services;
using CareerPathfinder.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CareerPathfinder.API.Controllers.Admin
{
    public class AdminCareerDetailsController : AdminBaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IPdfService _pdfService;


        public AdminCareerDetailsController(ApplicationDbContext context, IMapper mapper, IPdfService pdfService)
        {
            _context = context;
            _mapper = mapper;
            _pdfService = pdfService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminCareerDetailDto>>> GetCareerDetails()
        {
            var careerDetails = await _context.CareerDetails
                .Include(cd => cd.Career)
                .OrderBy(cd => cd.Career.Name)
                .ToListAsync();

            var careerDetailDtos = _mapper.Map<List<AdminCareerDetailDto>>(careerDetails);
            return Ok(careerDetailDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdminCareerDetailDto>> GetCareerDetail(int id)
        {
            var careerDetail = await _context.CareerDetails
                .Include(cd => cd.Career)
                .FirstOrDefaultAsync(cd => cd.Id == id);

            if (careerDetail == null)
            {
                return NotFound(new { message = "Kariyer detayı bulunamadı." });
            }

            var careerDetailDto = _mapper.Map<AdminCareerDetailDto>(careerDetail);
            return Ok(careerDetailDto);
        }

        [HttpGet("career/{careerId}")]
        public async Task<ActionResult<AdminCareerDetailDto>> GetCareerDetailByCareerId(int careerId)
        {
            var careerDetail = await _context.CareerDetails
                .Include(cd => cd.Career)
                .FirstOrDefaultAsync(cd => cd.CareerId == careerId);

            if (careerDetail == null)
            {
                return NotFound(new { message = "Bu kariyer için detay bulunamadı." });
            }

            var careerDetailDto = _mapper.Map<AdminCareerDetailDto>(careerDetail);
            return Ok(careerDetailDto);
        }

        [HttpPost]
        public async Task<ActionResult<AdminCareerDetailDto>> CreateCareerDetail([FromBody] CreateCareerDetailRequest request)
        {
            Console.WriteLine($"CreateCareerDetail - CareerId: {request.CareerId}");

            // Career var mı kontrol et
            var career = await _context.Careers.FindAsync(request.CareerId);
            if (career == null)
            {
                Console.WriteLine($"Career not found: {request.CareerId}");
                return NotFound(new { message = "Kariyer bulunamadı." });
            }

            // Bu career için zaten detail var mı?
            var existingDetail = await _context.CareerDetails
                .FirstOrDefaultAsync(cd => cd.CareerId == request.CareerId);

            if (existingDetail != null)
            {
                return BadRequest(new { message = "Bu kariyer için zaten detay mevcut." });
            }

            var careerDetail = new CareerDetail
            {
                CareerId = request.CareerId,
                Summary = request.Summary,
                WorkAreas = request.WorkAreas,
                AverageSalary = request.AverageSalary,
                BeginnerResources = SerializeResources(request.BeginnerResources),
                IntermediateResources = SerializeResources(request.IntermediateResources),
                AdvancedResources = SerializeResources(request.AdvancedResources),
                ProjectIdeas = SerializeProjects(request.ProjectIdeas),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsActive = true
            };

            _context.CareerDetails.Add(careerDetail);
            await _context.SaveChangesAsync();

            // Tekrar getirerek ilişkili verileri dahil et
            var createdDetail = await _context.CareerDetails
                .Include(cd => cd.Career)
                .FirstOrDefaultAsync(cd => cd.Id == careerDetail.Id);

            var careerDetailDto = _mapper.Map<AdminCareerDetailDto>(createdDetail);
            return CreatedAtAction(nameof(GetCareerDetail), new { id = careerDetail.Id }, careerDetailDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCareerDetail(int id, [FromBody] UpdateCareerDetailRequest request)
        {
            var careerDetail = await _context.CareerDetails.FindAsync(id);
            if (careerDetail == null)
            {
                return NotFound(new { message = "Kariyer detayı bulunamadı." });
            }

            careerDetail.Summary = request.Summary;
            careerDetail.WorkAreas = request.WorkAreas;
            careerDetail.AverageSalary = request.AverageSalary;
            careerDetail.BeginnerResources = SerializeResources(request.BeginnerResources);
            careerDetail.IntermediateResources = SerializeResources(request.IntermediateResources);
            careerDetail.AdvancedResources = SerializeResources(request.AdvancedResources);
            careerDetail.ProjectIdeas = SerializeProjects(request.ProjectIdeas);
            careerDetail.IsActive = request.IsActive;
            careerDetail.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Kariyer detayı başarıyla güncellendi." });
        }

        [HttpGet("{id}/pdf")]
        public async Task<IActionResult> DownloadPdf(int id)
        {
            var careerDetail = await _context.CareerDetails
                .Include(cd => cd.Career)
                .FirstOrDefaultAsync(cd => cd.Id == id);

            if (careerDetail == null)
            {
                return NotFound(new { message = "Kariyer detayı bulunamadı." });
            }

            var careerDetailDto = _mapper.Map<CareerDetailDto>(careerDetail);

            var pdfBytes = await _pdfService.GenerateCareerPdfAsync(careerDetailDto);

            var fileName = _pdfService.GetFileName(careerDetail.Career.Name);
            return File(pdfBytes, _pdfService.GetContentType(), fileName);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCareerDetail(int id)
        {
            var careerDetail = await _context.CareerDetails.FindAsync(id);
            if (careerDetail == null)
            {
                return NotFound(new { message = "Kariyer detayı bulunamadı." });
            }

            _context.CareerDetails.Remove(careerDetail);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Kariyer detayı başarıyla silindi." });
        }

        // Yardımcı metodlar
        private string SerializeResources(List<ResourceItemDto> resources)
        {
            return JsonSerializer.Serialize(resources, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
        }

        private string SerializeProjects(List<ProjectIdeaDto> projects)
        {
            return JsonSerializer.Serialize(projects, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
        }
    }
}