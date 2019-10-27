using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace file_service
{
	[Produces("application/json")]
	[Route("File")]
	public class FileController : Controller
	{
		private readonly FileRepository _repo;
		public FileController(FileRepository repo)
		{
			_repo = repo;
		}

		// GET /file
		[HttpGet]
		public async Task<ActionResult<IEnumerable<File>>> Get()
		{
			return new ObjectResult(await _repo.GetAll());
		}

		// GET /file/id
		[HttpGet("{id}")]
		public async Task<ActionResult<File>> Get(long id)
		{
			var file = await _repo.Get(id);
			if (file == null)
				return new NotFoundResult();

			return new ObjectResult(file);
		}

		// POST /file
		[HttpPost]
		public async Task<ActionResult<File>> Post([FromBody] File file)
		{
			file.Id = await _repo.GetNextId();
			await _repo.Create(file);
			return new OkObjectResult(file);
		}

		// PUT /file/id
		[HttpPut("{id}")]
		public async Task<ActionResult<File>> Put(long id, [FromBody] File file)
		{
			var fileFromDb = await _repo.Get(id);
			if (fileFromDb == null)
				return new NotFoundResult();
			file.Id = fileFromDb.Id;
			file.InternalId = fileFromDb.InternalId;
			await _repo.Update(file);
			return new OkObjectResult(file);
		}

		// DELETE /file/id
		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(long id)
		{
			var post = await _repo.Get(id);
			if (post == null)
				return new NotFoundResult();
			await _repo.Delete(id);
			return new OkResult();
		}
	}
}