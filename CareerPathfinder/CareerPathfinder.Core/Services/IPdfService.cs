using CareerPathfinder.Core.DTOs.Careers;

namespace CareerPathfinder.Core.Services
{
    public interface IPdfService
    {
        Task<byte[]> GenerateCareerPdfAsync(CareerDetailDto careerDetail);
        string GetContentType();
        string GetFileName(string careerName);
    }
}