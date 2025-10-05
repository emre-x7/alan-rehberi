using System.ComponentModel.DataAnnotations;

namespace CareerPathfinder.Core.DTOs.Admin
{
    public class AdminCareerDto
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string? Description { get; set; }

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public int ScoreCount { get; set; }
        public int ResultCount { get; set; }
        public bool HasDetail { get; set; }
    }

    public class CreateCareerRequest
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string? Description { get; set; }

        [Required]
        public int DepartmentId { get; set; }
    }

    public class UpdateCareerRequest
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string? Description { get; set; }

        public bool IsActive { get; set; }
    }

    public class CareerScoreDto
    {
        public int QuestionId { get; set; }
        public string QuestionContent { get; set; } = string.Empty;
        public int Score { get; set; }
    }

    public class UpdateCareerScoresRequest
    {
        public int CareerId { get; set; }
        public List<CareerScoreDto> Scores { get; set; } = new();
    }
}