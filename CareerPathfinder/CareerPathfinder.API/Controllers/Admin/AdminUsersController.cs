using AutoMapper;
using CareerPathfinder.Core.DTOs.Admin;
using CareerPathfinder.Core.Entities;
using CareerPathfinder.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CareerPathfinder.API.Controllers.Admin
{
    public class AdminUsersController : AdminBaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly IMapper _mapper;

        public AdminUsersController(
            ApplicationDbContext context,
            UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager,
            IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResult<AdminUserDto>>> GetUsers([FromQuery] UserQueryRequest query)
        {
            var usersQuery = _userManager.Users.AsQueryable();

            if (!string.IsNullOrEmpty(query.SearchTerm))
            {
                usersQuery = usersQuery.Where(u =>
                    u.Email.Contains(query.SearchTerm) ||
                    u.FirstName.Contains(query.SearchTerm) ||
                    u.LastName.Contains(query.SearchTerm));
            }

            if (query.IsActive.HasValue)
            {
                usersQuery = usersQuery.Where(u => u.IsActive == query.IsActive.Value);
            }

            if (!string.IsNullOrEmpty(query.UniversityFilter))
            {
                usersQuery = usersQuery.Where(u => u.University.Contains(query.UniversityFilter));
            }

            if (!string.IsNullOrEmpty(query.DepartmentFilter))
            {
                usersQuery = usersQuery.Where(u => u.Department.Contains(query.DepartmentFilter));
            }

            if (query.AcademicYearFilter.HasValue)
            {
                usersQuery = usersQuery.Where(u => u.AcademicYear == query.AcademicYearFilter.Value);
            }

            if (query.GenderFilter.HasValue)
            {
                usersQuery = usersQuery.Where(u => u.Gender == query.GenderFilter.Value);
            }

            usersQuery = query.SortBy.ToLower() switch
            {
                "email" => query.SortDescending ? usersQuery.OrderByDescending(u => u.Email) : usersQuery.OrderBy(u => u.Email),
                "firstname" => query.SortDescending ? usersQuery.OrderByDescending(u => u.FirstName) : usersQuery.OrderBy(u => u.FirstName),
                "lastname" => query.SortDescending ? usersQuery.OrderByDescending(u => u.LastName) : usersQuery.OrderBy(u => u.LastName),
                "university" => query.SortDescending ? usersQuery.OrderByDescending(u => u.University) : usersQuery.OrderBy(u => u.University),
                "department" => query.SortDescending ? usersQuery.OrderByDescending(u => u.Department) : usersQuery.OrderBy(u => u.Department),
                "academicyear" => query.SortDescending ? usersQuery.OrderByDescending(u => u.AcademicYear) : usersQuery.OrderBy(u => u.AcademicYear),
                "lastloginat" => query.SortDescending ? usersQuery.OrderByDescending(u => u.LastLoginAt) : usersQuery.OrderBy(u => u.LastLoginAt),
                _ => query.SortDescending ? usersQuery.OrderByDescending(u => u.CreatedAt) : usersQuery.OrderBy(u => u.CreatedAt)
            };

            // Sayfalama
            var totalCount = await usersQuery.CountAsync();
            var users = await usersQuery
                .Skip((query.Page - 1) * query.PageSize)
                .Take(query.PageSize)
                .ToListAsync();

            // Kullanıcı DTO'larını oluştur
            var userDtos = new List<AdminUserDto>();
            foreach (var user in users)
            {
                var userDto = _mapper.Map<AdminUserDto>(user);

                var roles = await _userManager.GetRolesAsync(user);
                userDto.Roles = roles.ToList();

                userDto.QuestionnaireCount = await _context.Questionnaires
                    .CountAsync(q => q.UserId == user.Id);
                userDto.CompletedTestCount = await _context.Questionnaires
                    .CountAsync(q => q.UserId == user.Id && q.Status == Core.Enums.QuestionnaireStatus.Completed);

                userDtos.Add(userDto);
            }

            var result = new PagedResult<AdminUserDto>
            {
                Items = userDtos,
                TotalCount = totalCount,
                Page = query.Page,
                PageSize = query.PageSize
            };

            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<AdminUserDto>> GetUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı." });
            }

            var userDto = _mapper.Map<AdminUserDto>(user);
            userDto.Roles = await _userManager.GetRolesAsync(user);
            userDto.QuestionnaireCount = await _context.Questionnaires
                .CountAsync(q => q.UserId == user.Id);
            userDto.CompletedTestCount = await _context.Questionnaires
                .CountAsync(q => q.UserId == user.Id && q.Status == Core.Enums.QuestionnaireStatus.Completed);

            return Ok(userDto);
        }

        [HttpGet("stats")]
        public async Task<ActionResult<UserStatsDto>> GetUserStats()
        {
            var today = DateTime.UtcNow.Date;
            var weekAgo = today.AddDays(-7);

            var stats = new UserStatsDto
            {
                TotalUsers = await _userManager.Users.CountAsync(),
                ActiveUsersToday = await _userManager.Users
                    .Where(u => u.LastLoginAt.HasValue && u.LastLoginAt.Value.Date == today)
                    .CountAsync(),
                NewUsersThisWeek = await _userManager.Users
                    .Where(u => u.CreatedAt >= weekAgo)
                    .CountAsync(),
                TotalTestsCompleted = await _context.Questionnaires
                    .CountAsync(q => q.Status == Core.Enums.QuestionnaireStatus.Completed)
            };

            // Bölümlere göre test sayıları
            var departmentTests = await _context.Questionnaires
                .Include(q => q.Department)
                .Where(q => q.Status == Core.Enums.QuestionnaireStatus.Completed)
                .GroupBy(q => q.Department.Name)
                .Select(g => new { Department = g.Key, Count = g.Count() })
                .ToListAsync();

            foreach (var dt in departmentTests)
            {
                stats.DepartmentTestCounts[dt.Department] = dt.Count;
            }

            return Ok(stats);
        }

        [HttpPut("{id}/roles")]
        public async Task<IActionResult> UpdateUserRoles(string id, [FromBody] UpdateUserRolesRequest request)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı." });
            }

            // Geçerli roller var mı kontrol et
            foreach (var roleName in request.Roles)
            {
                if (!await _roleManager.RoleExistsAsync(roleName))
                {
                    return BadRequest(new { message = $"'{roleName}' rolü mevcut değil." });
                }
            }

            // Mevcut rolleri al ve güncelle
            var currentRoles = await _userManager.GetRolesAsync(user);
            var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
            if (!removeResult.Succeeded)
            {
                return BadRequest(new { errors = removeResult.Errors.Select(e => e.Description) });
            }

            var addResult = await _userManager.AddToRolesAsync(user, request.Roles);
            if (!addResult.Succeeded)
            {
                return BadRequest(new { errors = addResult.Errors.Select(e => e.Description) });
            }

            return Ok(new { message = "Kullanıcı rolleri başarıyla güncellendi." });
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateUserStatus(string id, [FromBody] bool isActive)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı." });
            }

            user.IsActive = isActive;
            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
            }

            var statusText = isActive ? "aktif" : "pasif";
            return Ok(new { message = $"Kullanıcı başarıyla {statusText} yapıldı." });
        }

        [HttpGet("{id}/questionnaires")]
        public async Task<ActionResult> GetUserQuestionnaires(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı." });
            }

            var questionnaires = await _context.Questionnaires
                .Include(q => q.Department)
                .Include(q => q.TestResults)
                    .ThenInclude(tr => tr.Career)
                .Where(q => q.UserId == id)
                .OrderByDescending(q => q.StartedAt)
                .ToListAsync();

            var result = questionnaires.Select(q => new
            {
                q.Id,
                DepartmentName = q.Department.Name,
                q.StartedAt,
                q.CompletedAt,
                q.Status,
                TopCareer = q.TestResults.OrderByDescending(tr => tr.CompatibilityPercentage).FirstOrDefault() is TestResult topResult
                    ? new { topResult.Career.Name, topResult.CompatibilityPercentage }
                    : null
            });

            return Ok(result);
        }
    }
}