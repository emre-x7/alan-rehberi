using AutoMapper;
using CareerPathfinder.Core.DTOs.Authentication;
using CareerPathfinder.Core.Entities;
using CareerPathfinder.Core.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Logging;

namespace CareerPathfinder.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly ILogger<AuthController> _logger;

        public AuthController(
            UserManager<AppUser> userManager,
            IConfiguration configuration,
            IMapper mapper,
            ILogger<AuthController> logger)
        {
            _userManager = userManager;
            _configuration = configuration;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            _logger.LogInformation("Register attempt for email: {Email}", request.Email);

            try
            {
                // Kullanıcı zaten var mı?
                var existingUser = await _userManager.FindByEmailAsync(request.Email);
                if (existingUser != null)
                {
                    _logger.LogWarning("Registration failed - email already exists: {Email}", request.Email);
                    throw new BadRequestException("Bu e-posta adresi zaten kayıtlı.");
                }

                // Yeni kullanıcı oluştur
                var user = _mapper.Map<AppUser>(request);
                var result = await _userManager.CreateAsync(user, request.Password);

                if (!result.Succeeded)
                {
                    var errors = result.Errors.Select(e => e.Description);
                    _logger.LogWarning("Registration failed for {Email}. Errors: {Errors}",
                        request.Email, string.Join(", ", errors));

                    return BadRequest(new { errors });
                }

                _logger.LogInformation("User registered successfully: {Email} (UserID: {UserId})",
                    request.Email, user.Id);

                // JWT token oluştur ve döndür
                var token = await GenerateJwtToken(user);
                return Ok(token);
            }
            catch (BadRequestException ex)
            {
                // Bu exception'ı tekrar fırlat ki GlobalExceptionHandler yakalasın
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error during registration for email: {Email}", request.Email);
                throw;
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            _logger.LogInformation("Login attempt for email: {Email}", request.Email);

            try
            {
                // Kullanıcıyı e-posta ile bul
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                {
                    _logger.LogWarning("Login failed - user not found: {Email}", request.Email);
                    return Unauthorized(new { message = "E-posta veya şifre hatalı." });
                }

                // Şifreyi kontrol et
                var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);
                if (!isPasswordValid)
                {
                    _logger.LogWarning("Login failed - invalid password for: {Email}", request.Email);
                    return Unauthorized(new { message = "E-posta veya şifre hatalı." });
                }

                _logger.LogInformation("User logged in successfully: {Email} (UserID: {UserId})",
                    request.Email, user.Id);

                // JWT token oluştur ve döndür
                var token = await GenerateJwtToken(user);
                return Ok(token);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error during login for email: {Email}", request.Email);
                throw;
            }
        }

        private async Task<AuthResponse> GenerateJwtToken(AppUser user)
        {
            _logger.LogDebug("Generating JWT token for user: {UserId}", user.Id);

            try
            {
                var jwtSettings = _configuration.GetSection("Jwt");
                var secretKey = Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]!);
                var tokenExpiry = DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpiryInMinutes"]));

                // JWT token için claims oluştur
                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim("firstName", user.FirstName),
                    new Claim("lastName", user.LastName)
                };

                // Kullanıcının rollerini claims'e ekle (ileride kullanılabilir)
                var roles = await _userManager.GetRolesAsync(user);
                foreach (var role in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }

                // JWT token oluştur
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = tokenExpiry,
                    Issuer = jwtSettings["Issuer"],
                    Audience = jwtSettings["Audience"],
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(secretKey),
                        SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var jwtToken = tokenHandler.WriteToken(token);

                _logger.LogDebug("JWT token generated successfully for user: {UserId}", user.Id);

                // AuthResponse nesnesini döndür
                return new AuthResponse
                {
                    Token = jwtToken,
                    Expiration = tokenExpiry,
                    UserId = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating JWT token for user: {UserId}", user.Id);
                throw;
            }
        }
    }
}