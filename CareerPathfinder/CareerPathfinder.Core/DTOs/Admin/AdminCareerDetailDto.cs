using System.ComponentModel.DataAnnotations;

namespace CareerPathfinder.Core.DTOs.Admin
{
    public class AdminCareerDetailDto
    {
        public int Id { get; set; }
        public int CareerId { get; set; }
        public string CareerName { get; set; } = string.Empty;

        [Required]
        [MaxLength(2000)]
        public string Summary { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string WorkAreas { get; set; } = string.Empty;

        [MaxLength(500)]
        public string AverageSalary { get; set; } = string.Empty;

        // JSON olarak saklanacak, DTO'da list olarak
        public List<ResourceItemDto> BeginnerResources { get; set; } = new();
        public List<ResourceItemDto> IntermediateResources { get; set; } = new();
        public List<ResourceItemDto> AdvancedResources { get; set; } = new();
        public List<ProjectIdeaDto> ProjectIdeas { get; set; } = new();

        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class CreateCareerDetailRequest
    {
        [Required]
        public int CareerId { get; set; }

        [Required]
        [MaxLength(2000)]
        public string Summary { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string WorkAreas { get; set; } = string.Empty;

        [MaxLength(500)]
        public string AverageSalary { get; set; } = string.Empty;

        public List<ResourceItemDto> BeginnerResources { get; set; } = new();
        public List<ResourceItemDto> IntermediateResources { get; set; } = new();
        public List<ResourceItemDto> AdvancedResources { get; set; } = new();
        public List<ProjectIdeaDto> ProjectIdeas { get; set; } = new();
    }

    public class UpdateCareerDetailRequest
    {
        [Required]
        [MaxLength(2000)]
        public string Summary { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string WorkAreas { get; set; } = string.Empty;

        [MaxLength(500)]
        public string AverageSalary { get; set; } = string.Empty;

        public List<ResourceItemDto> BeginnerResources { get; set; } = new();
        public List<ResourceItemDto> IntermediateResources { get; set; } = new();
        public List<ResourceItemDto> AdvancedResources { get; set; } = new();
        public List<ProjectIdeaDto> ProjectIdeas { get; set; } = new();

        public bool IsActive { get; set; }
    }

    public class ResourceItemDto
    {
        public string Title { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    public class ProjectIdeaDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Difficulty { get; set; } = string.Empty;
        public List<string> Technologies { get; set; } = new();
    }
}