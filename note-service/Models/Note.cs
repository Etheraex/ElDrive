using System;

namespace note_service.Models
{
	public class Note
	{
		public string Title { get; set; }
		public string Content { get; set; }
		public DateTime CreationDate { get; set; }
		public DateTime LastEdited { get; set; }
	}
}