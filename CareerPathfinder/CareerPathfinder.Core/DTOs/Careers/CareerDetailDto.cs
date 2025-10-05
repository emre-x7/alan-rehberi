using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CareerPathfinder.Core.DTOs.Careers
{
    public class CareerDetailDto
    {
        public int Id { get; set; }
        public int CareerId { get; set; }
        public string CareerName { get; set; } = string.Empty;

        public string Summary { get; set; } = string.Empty;
        public string WorkAreas { get; set; } = string.Empty;
        public string AverageSalary { get; set; } = string.Empty;

        // JSON deserialization için property'ler
        public List<ResourceItem> BeginnerResources { get; set; } = new();
        public List<ResourceItem> IntermediateResources { get; set; } = new();
        public List<ResourceItem> AdvancedResources { get; set; } = new();
        public List<ProjectIdea> ProjectIdeas { get; set; } = new();
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class ResourceItem
    {
        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;

        [JsonPropertyName("url")]
        public string Url { get; set; } = string.Empty;

        [JsonPropertyName("type")]
        public string Type { get; set; } = string.Empty;

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;
    }

    public class ProjectIdea
    {
        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("difficulty")]
        public string Difficulty { get; set; } = string.Empty;

        [JsonPropertyName("technologies")]
        public string[] Technologies { get; set; } = Array.Empty<string>();
    }

    public class CareerPdfRequest
    {
        public int CareerId { get; set; }
        public string Format { get; set; } = "A4";
    }
}