using Microsoft.AspNetCore.Mvc;

namespace auth_service
{
    public class AuthController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return Json("Hello from auth!");
        }
    }
}