using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace file_service
{
	[Route("File")]
	public class FileController : Controller
	{
		[HttpGet]
		public IActionResult Get()
		{
			return Json(ShiftByNLeft(Encoding.ASCII.GetBytes("Hello world"), 4));
		}

		[HttpPost]
		public IActionResult Post(byte[] encryptedData)
		{
			return Json(Encoding.UTF8.GetString(ShiftByNLeft(encryptedData, 4)));
		}

		private byte[] ShiftByNLeft(byte[] input, int n)
		{
			if (n == 0)
				return input;
			var tmp = input[0];
			for (int i = 0; i < input.Length - 1; i++)
				input[i] = input[i + 1];
			input[input.Length - 1] = tmp;
			return ShiftByNLeft(input, --n);
		}
	}
}