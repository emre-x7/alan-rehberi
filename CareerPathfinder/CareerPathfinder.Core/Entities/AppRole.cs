using Microsoft.AspNetCore.Identity;

namespace CareerPathfinder.Core.Entities
{
    public class AppRole : IdentityRole
    {
        public string? Description { get; set; }
    }
}