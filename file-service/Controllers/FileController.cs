using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace file_service
{
	[Route("File")]
	public class FileController : Controller
	{
		[HttpGet]
		public IActionResult Get()
		{
			return Json(Encoding.ASCII.GetBytes("Hello world"));
		}

		[HttpPost]
		public IActionResult Post(byte[] encryptedData)
		{
			return Json(Encoding.UTF8.GetString(encryptedData));
		}
	}
}