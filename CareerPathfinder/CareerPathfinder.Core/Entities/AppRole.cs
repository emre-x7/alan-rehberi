using Microsoft.AspNetCore.Identity;

namespace CareerPathfinder.Core.Entities
{
    public class AppRole : IdentityRole
    {
        public string? Description { get; set; }
        public string RoleType { get; set; } = "Custom";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}