using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
    }
}
