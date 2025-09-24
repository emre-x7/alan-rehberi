using System.ComponentModel.DataAnnotations;

namespace CareerPathfinder.Core.DTOs.Departments
{
    public class DepartmentDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public int QuestionCount { get; set; }
        public int CareerCount { get; set; }
    }
}