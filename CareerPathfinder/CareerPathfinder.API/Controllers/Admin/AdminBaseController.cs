using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CareerPathfinder.API.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminBaseController : ControllerBase
    {
        // Tüm admin controller'ları buradan türeyecek
        // Ortak metodlar buraya eklenebilir
    }
}