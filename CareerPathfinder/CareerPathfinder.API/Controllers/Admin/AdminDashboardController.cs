using AutoMapper;
using CareerPathfinder.Core.DTOs.Admin;
using CareerPathfinder.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CareerPathfinder.API.Controllers.Admin
{
    public class AdminDashboardController : AdminBaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AdminDashboardController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<AdminDashboardDto>> GetDashboardData([FromQuery] DateRangeRequest dateRange)
        {
            var startDate = dateRange.StartDate ?? DateTime.UtcNow.AddDays(-30);
            var endDate = dateRange.EndDate ?? DateTime.UtcNow;

            var dashboardData = new AdminDashboardDto
            {
                GeneralStats = await GetGeneralStats(),
                UserStats = await GetUserStats(startDate, endDate),
                TestStats = await GetTestStats(startDate, endDate),
                DepartmentStats = await GetDepartmentStats(startDate, endDate),
                RecentActivities = await GetRecentActivities(10)
            };

            return Ok(dashboardData);
        }

        //[HttpGet("charts/test-completions")]
        //public async Task<ActionResult> GetTestCompletionChart([FromQuery] DateRangeRequest dateRange)
        //{
        //    var startDate = dateRange.StartDate ?? DateTime.UtcNow.AddDays(-30);
        //    var endDate = dateRange.EndDate ?? DateTime.UtcNow;

        //    var dailyCompletions = await _context.Questionnaires
        //        .Where(q => q.CompletedAt >= startDate && q.CompletedAt <= endDate)
        //        .GroupBy(q => q.CompletedAt.Value.Date)
        //        .Select(g => new
        //        {
        //            Date = g.Key,
        //            Count = g.Count()
        //        })
        //        .OrderBy(x => x.Date)
        //        .ToListAsync();

        //    return Ok(dailyCompletions);
        //}

        //[HttpGet("charts/department-distribution")]
        //public async Task<ActionResult> GetDepartmentDistributionChart()
        //{
        //    var distribution = await _context.Questionnaires
        //        .Include(q => q.Department)
        //        .Where(q => q.Status == Core.Enums.QuestionnaireStatus.Completed)
        //        .GroupBy(q => new { q.DepartmentId, q.Department.Name })
        //        .Select(g => new
        //        {
        //            DepartmentName = g.Key.Name,
        //            Count = g.Count(),
        //            Percentage = (decimal)g.Count() / _context.Questionnaires.Count(q => q.Status == Core.Enums.QuestionnaireStatus.Completed) * 100
        //        })
        //        .OrderByDescending(x => x.Count)
        //        .ToListAsync();

        //    return Ok(distribution);
        //}

        private async Task<GeneralStatsDto> GetGeneralStats()
        {
            return new GeneralStatsDto
            {
                TotalDepartments = await _context.Departments.CountAsync(),
                TotalCareers = await _context.Careers.CountAsync(),
                TotalQuestions = await _context.Questions.CountAsync(),
                ActiveQuestions = await _context.Questions.CountAsync(q => q.IsActive)
            };
        }

        private async Task<DashboardUserStatsDto> GetUserStats(DateTime startDate, DateTime endDate)
        {
            var today = DateTime.UtcNow.Date;
            var weekAgo = today.AddDays(-7);

            return new DashboardUserStatsDto
            {
                TotalUsers = await _context.Users.CountAsync(),
                NewUsersToday = await _context.Users.CountAsync(u => u.CreatedAt.Date == today),
                NewUsersThisWeek = await _context.Users.CountAsync(u => u.CreatedAt >= weekAgo),
                ActiveUsersToday = await _context.Users.CountAsync(u => u.LastLoginAt.HasValue && u.LastLoginAt.Value.Date == today),
                ActiveUsersThisWeek = await _context.Users.CountAsync(u => u.LastLoginAt.HasValue && u.LastLoginAt.Value >= weekAgo)
            };
        }

        //[HttpGet("charts/university-distribution")]
        //public async Task<ActionResult> GetUniversityDistributionChart()
        //{
        //    var distribution = await _context.Users
        //        .GroupBy(u => u.University)
        //        .Select(g => new
        //        {
        //            University = g.Key,
        //            Count = g.Count(),
        //            Percentage = (decimal)g.Count() / _context.Users.Count() * 100
        //        })
        //        .OrderByDescending(x => x.Count)
        //        .Take(10) // En fazla kullanıcıya sahip 10 üniversite
        //        .ToListAsync();

        //    return Ok(distribution);
        //}

        //[HttpGet("charts/department-distribution")]
        //public async Task<ActionResult> GetUserDepartmentDistributionChart()
        //{
        //    // Toplam kullanıcı sayısını ayrıca al
        //    var totalUsers = await _context.Users.CountAsync();

        //    var distribution = await _context.Users
        //        .GroupBy(u => u.Department)
        //        .Select(g => new
        //        {
        //            Department = g.Key,
        //            Count = g.Count(),
        //            Percentage = totalUsers > 0 ? Math.Round((decimal)g.Count() / totalUsers * 100, 2) : 0
        //        })
        //        .OrderByDescending(x => x.Count)
        //        .Take(10)
        //        .ToListAsync();

        //    return Ok(distribution);
        //}

        //[HttpGet("charts/academic-year-distribution")]
        //public async Task<ActionResult> GetAcademicYearDistributionChart()
        //{
        //    var distribution = await _context.Users
        //        .GroupBy(u => u.AcademicYear)
        //        .Select(g => new
        //        {
        //            AcademicYear = g.Key,
        //            Count = g.Count(),
        //            Percentage = (decimal)g.Count() / _context.Users.Count() * 100
        //        })
        //        .OrderBy(x => x.AcademicYear)
        //        .ToListAsync();

        //    return Ok(distribution);
        //}

        private async Task<TestStatsDto> GetTestStats(DateTime startDate, DateTime endDate)
        {
            var today = DateTime.UtcNow.Date;
            var weekAgo = today.AddDays(-7);

            var totalStarted = await _context.Questionnaires.CountAsync();
            var totalCompleted = await _context.Questionnaires.CountAsync(q => q.Status == Core.Enums.QuestionnaireStatus.Completed);
            var completedToday = await _context.Questionnaires.CountAsync(q =>
                q.Status == Core.Enums.QuestionnaireStatus.Completed &&
                q.CompletedAt.HasValue &&
                q.CompletedAt.Value.Date == today);
            var completedThisWeek = await _context.Questionnaires.CountAsync(q =>
                q.Status == Core.Enums.QuestionnaireStatus.Completed &&
                q.CompletedAt.HasValue &&
                q.CompletedAt.Value >= weekAgo);

            return new TestStatsDto
            {
                TotalTestsStarted = totalStarted,
                TotalTestsCompleted = totalCompleted,
                TestsCompletedToday = completedToday,
                TestsCompletedThisWeek = completedThisWeek,
                CompletionRate = totalStarted > 0 ? Math.Round((decimal)totalCompleted / totalStarted * 100, 2) : 0
            };
        }

        private async Task<List<DepartmentStatsDto>> GetDepartmentStats(DateTime startDate, DateTime endDate)
        {
            var stats = await _context.Departments
                .Include(d => d.Questions)
                .Select(d => new DepartmentStatsDto
                {
                    DepartmentId = d.Id,
                    DepartmentName = d.Name,
                    TestCount = d.Questions.SelectMany(q => q.Answers)
                                         .Select(a => a.QuestionnaireId)
                                         .Distinct()
                                         .Count(),
                    UserCount = d.Questions.SelectMany(q => q.Answers)
                                          .Select(a => a.Questionnaire.UserId)
                                          .Distinct()
                                          .Count(),
                    AvgCompletionRate = d.Questions.Any() ?
                        (decimal)d.Questions.SelectMany(q => q.Answers)
                                           .Select(a => a.Questionnaire)
                                           .Count(q => q.Status == Core.Enums.QuestionnaireStatus.Completed) /
                        d.Questions.SelectMany(q => q.Answers)
                                  .Select(a => a.QuestionnaireId)
                                  .Distinct()
                                  .Count() * 100 : 0
                })
                .Where(d => d.TestCount > 0)
                .OrderByDescending(d => d.TestCount)
                .ToListAsync();

            return stats;
        }

        private async Task<List<RecentActivityDto>> GetRecentActivities(int count)
        {
            var activities = new List<RecentActivityDto>();

            // Son kayıt olan kullanıcılar
            var recentUsers = await _context.Users
                .OrderByDescending(u => u.CreatedAt)
                .Take(count / 2)
                .Select(u => new RecentActivityDto
                {
                    Type = "UserRegistered",
                    Description = "Yeni kullanıcı kaydoldu",
                    OccurredAt = u.CreatedAt,
                    UserEmail = u.Email,
                    AdditionalInfo = $"{u.FirstName} {u.LastName}"
                })
                .ToListAsync();

            // Son tamamlanan testler
            var recentTests = await _context.Questionnaires
                .Include(q => q.User)
                .Include(q => q.Department)
                .Where(q => q.Status == Core.Enums.QuestionnaireStatus.Completed)
                .OrderByDescending(q => q.CompletedAt)
                .Take(count / 2)
                .Select(q => new RecentActivityDto
                {
                    Type = "TestCompleted",
                    Description = "Test tamamlandı",
                    OccurredAt = q.CompletedAt.Value,
                    UserEmail = q.User.Email,
                    AdditionalInfo = $"{q.Department.Name} testi"
                })
                .ToListAsync();

            activities.AddRange(recentUsers);
            activities.AddRange(recentTests);

            return activities.OrderByDescending(a => a.OccurredAt).Take(count).ToList();
        }
    }
}