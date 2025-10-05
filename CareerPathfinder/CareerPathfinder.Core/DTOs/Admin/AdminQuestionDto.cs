using System.ComponentModel.DataAnnotations;

namespace CareerPathfinder.Core.DTOs.Admin
{
    public class AdminQuestionDto
    {
        public int Id { get; set; }

        [Required]
        public string Content { get; set; } = string.Empty;

        public int Order { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public int AnswerCount { get; set; }
    }

    public class CreateQuestionRequest
    {
        [Required]
        public string Content { get; set; } = string.Empty;

        public int Order { get; set; }
        public bool IsActive { get; set; } = true;

        [Required]
        public int DepartmentId { get; set; }
    }

    public class UpdateQuestionRequest
    {
        [Required]
        public string Content { get; set; } = string.Empty;

        public int Order { get; set; }
        public bool IsActive { get; set; }
    }

    public class ReorderQuestionsRequest
    {
        public List<QuestionOrder> QuestionOrders { get; set; } = new();
    }

    public class QuestionOrder
    {
        public int QuestionId { get; set; }
        public int NewOrder { get; set; }
    }
}