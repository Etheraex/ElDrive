using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using note_service.Models;
using note_service.Repositories;

namespace note_service.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class NoteController : ControllerBase
	{
		private readonly NoteRepository _noteRepository;

		public NoteController(NoteRepository noteRepository)
		{
			_noteRepository = noteRepository;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<NoteCollection>>> Get()
		{
			var noteCollections = await _noteRepository.GetAll();
			return new ObjectResult(noteCollections);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<NoteCollection>> Get(string id)
		{
			var noteCollection = await _noteRepository.Get(id);
			return new ObjectResult(noteCollection);
		}

		[HttpPost]
		public async Task<ActionResult<NoteCollection>> Post([FromBody]NoteCollection noteCollection)
		{
			if (noteCollection == null && noteCollection.UserId.Equals(""))
				return new BadRequestResult();

			noteCollection.Id = Guid.NewGuid().ToString("N");
			await _noteRepository.Create(noteCollection);
			return new ObjectResult(noteCollection);
		}

		// PUT /Note/id
		[HttpPut("{id}")]
		public async Task<ActionResult<NoteCollection>> Put(string id, [FromBody]NoteCollection noteCollection)
		{
			if (noteCollection == null)
				return new BadRequestResult();
			var notesFromDb = await _noteRepository.Get(id);
			noteCollection.InternalId = notesFromDb.InternalId;
			noteCollection.Id = notesFromDb.Id;
			noteCollection.UserId = notesFromDb.UserId;
			await _noteRepository.Update(noteCollection);
			return new ObjectResult(noteCollection);
		}
	}
}
