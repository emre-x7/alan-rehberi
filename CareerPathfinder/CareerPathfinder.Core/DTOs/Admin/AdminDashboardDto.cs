using System.ComponentModel.DataAnnotations;

namespace CareerPathfinder.Core.DTOs.Admin
{
    public class AdminDashboardDto
    {
        public GeneralStatsDto GeneralStats { get; set; } = new();
        public DashboardUserStatsDto UserStats { get; set; } = new();
        public TestStatsDto TestStats { get; set; } = new();
        public List<DepartmentStatsDto> DepartmentStats { get; set; } = new();
        public List<RecentActivityDto> RecentActivities { get; set; } = new();
    }

    public class GeneralStatsDto
    {
        public int TotalDepartments { get; set; }
        public int TotalCareers { get; set; }
        public int TotalQuestions { get; set; }
        public int ActiveQuestions { get; set; }
    }

    public class DashboardUserStatsDto
    {
        public int TotalUsers { get; set; }
        public int NewUsersToday { get; set; }
        public int NewUsersThisWeek { get; set; }
        public int ActiveUsersToday { get; set; }
        public int ActiveUsersThisWeek { get; set; }
    }

    public class TestStatsDto
    {
        public int TotalTestsStarted { get; set; }
        public int TotalTestsCompleted { get; set; }
        public int TestsCompletedToday { get; set; }
        public int TestsCompletedThisWeek { get; set; }
        public decimal CompletionRate { get; set; }
    }

    public class DepartmentStatsDto
    {
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public int TestCount { get; set; }
        public int UserCount { get; set; }
        public decimal AvgCompletionRate { get; set; }
    }

    public class RecentActivityDto
    {
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime OccurredAt { get; set; }
        public string UserEmail { get; set; } = string.Empty;
        public string? AdditionalInfo { get; set; }
    }

    public class DateRangeRequest
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}