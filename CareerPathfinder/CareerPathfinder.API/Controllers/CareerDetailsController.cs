using AutoMapper;
using CareerPathfinder.Core.DTOs.Careers;
using CareerPathfinder.Core.Services;
using CareerPathfinder.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CareerPathfinder.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CareerDetailsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IPdfService _pdfService;

        public CareerDetailsController(
            ApplicationDbContext context,
            IMapper mapper,
            IPdfService pdfService)
        {
            _context = context;
            _mapper = mapper;
            _pdfService = pdfService;
        }

        [HttpGet("{careerId}")]
        public async Task<ActionResult<CareerDetailDto>> GetCareerDetail(int careerId)
        {
            var careerDetail = await _context.CareerDetails
                .Include(cd => cd.Career)
                .FirstOrDefaultAsync(cd => cd.CareerId == careerId && cd.IsActive);

            if (careerDetail == null)
            {
                return NotFound(new { message = "Kariyer detayı bulunamadı." });
            }

            var careerDetailDto = _mapper.Map<CareerDetailDto>(careerDetail);
            return Ok(careerDetailDto);
        }

        [HttpGet("{careerId}/pdf")]
        public async Task<IActionResult> DownloadCareerPdf(int careerId)
        {
            var careerDetail = await _context.CareerDetails
                .Include(cd => cd.Career)
                .FirstOrDefaultAsync(cd => cd.CareerId == careerId && cd.IsActive);

            if (careerDetail == null)
            {
                return NotFound(new { message = "Kariyer detayı bulunamadı." });
            }

            var careerDetailDto = _mapper.Map<CareerDetailDto>(careerDetail);
            var pdfBytes = await _pdfService.GenerateCareerPdfAsync(careerDetailDto);

            var fileName = _pdfService.GetFileName(careerDetail.Career.Name);
            return File(pdfBytes, _pdfService.GetContentType(), fileName);
        }

        [HttpGet("career/{careerId}")]
        public async Task<ActionResult<bool>> CareerHasDetail(int careerId)
        {
            var hasDetail = await _context.CareerDetails
                .AnyAsync(cd => cd.CareerId == careerId && cd.IsActive);

            return Ok(hasDetail);
        }
    }
}