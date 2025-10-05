using CareerPathfinder.Core.Enums;

namespace CareerPathfinder.Core.DTOs.Authentication
{
    public class AuthResponse
    {
        public string Token { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string University { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public int AcademicYear { get; set; }
        public Gender Gender { get; set; }
    }
}