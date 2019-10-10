using Microsoft.AspNetCore.Mvc;

namespace service
{
    public class FileController : Controller
    {
		[HttpGet]
        public IActionResult Index()
        {
            return Json("Hello world, testing github-azure connection!");
        }
    }
}