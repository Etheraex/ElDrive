using System;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace service
{
	public class FileController : Controller
	{
		[HttpGet]
		public IActionResult Index()
		{
			String humanReadableFormat = "Hello world!";
			byte[] messageAsByteArray = Encoding.ASCII.GetBytes(humanReadableFormat);
			ShiftByNLeft(messageAsByteArray, 4);
			return Json(messageAsByteArray);
		}

		private void ShiftByNLeft(byte[] input, int n)
		{
			if( n == 0)
				return;
			var tmp = input[0];
			for(int i = 0; i < input.Length - 1; i++)
				input[i] = input[i+1];
			input[input.Length - 1] = tmp;
			ShiftByNLeft(input, --n);
		}
	}
}