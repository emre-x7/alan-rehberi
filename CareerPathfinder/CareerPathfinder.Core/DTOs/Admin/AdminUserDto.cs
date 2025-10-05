using CareerPathfinder.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace CareerPathfinder.Core.DTOs.Admin
{
    public class AdminUserDto
    {
        public string Id { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FullName => $"{FirstName} {LastName}";
        public string University { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public int AcademicYear { get; set; }
        public Gender Gender { get; set; }
        public string GenderDisplay => Gender.ToString();
        public DateTime CreatedAt { get; set; }
        public DateTime? LastLoginAt { get; set; }
        public bool EmailConfirmed { get; set; }
        public bool IsActive { get; set; } = true;
        public IList<string> Roles { get; set; } = new List<string>();
        public int QuestionnaireCount { get; set; }
        public int CompletedTestCount { get; set; }
    }

    public class UserStatsDto
    {
        public int TotalUsers { get; set; }
        public int ActiveUsersToday { get; set; }
        public int NewUsersThisWeek { get; set; }
        public int TotalTestsCompleted { get; set; }
        public Dictionary<string, int> DepartmentTestCounts { get; set; } = new();
    }

    public class UpdateUserRolesRequest
    {
        public List<string> Roles { get; set; } = new List<string>();
    }

    public class UserQueryRequest
    {
        public string? SearchTerm { get; set; }
        public string? RoleFilter { get; set; }
        public bool? IsActive { get; set; }

        public string? UniversityFilter { get; set; }
        public string? DepartmentFilter { get; set; }
        public int? AcademicYearFilter { get; set; }
        public Gender? GenderFilter { get; set; }

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public string SortBy { get; set; } = "CreatedAt";
        public bool SortDescending { get; set; } = true;
    }

    public class PagedResult<T>
    {
        public List<T> Items { get; set; } = new List<T>();
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    }
}