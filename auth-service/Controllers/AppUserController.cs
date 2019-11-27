using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace auth_service
{
	[Produces("application/json")]
	[Route("AppUser")]
	public class AppUserController : Controller
	{
		private readonly AppUserRepository _repo;
		public AppUserController(AppUserRepository repo)
		{
			_repo = repo;
		}

		// GET /appuser
		[HttpGet]
		public async Task<ActionResult<IEnumerable<AppUser>>> Get()
		{
			return new ObjectResult(await _repo.GetAll());
		}

		// GET /appuser/id
		[HttpGet("{id}")]
		public async Task<ActionResult<AppUser>> Get(long id)
		{
			var appUser = await _repo.Get(id);
			if (appUser == null)
				return new NotFoundResult();

			return new ObjectResult(appUser);
		}

		// register
		// POST /appuser
		[HttpPost]
		public async Task<ActionResult<String>> Post([FromBody] AppUser appUser)
		{
			appUser.InternalId = new ObjectId(Guid.NewGuid().ToString("N"));
			appUser.Id = await _repo.GetNextId();
			await _repo.Create(appUser);
			return new OkObjectResult(_repo.CreateNameHash(appUser));

		}

		// PUT /appuser/id
		[HttpPut("{id}")]
		public async Task<ActionResult<AppUser>> Put(long id, [FromBody] AppUser appUser)
		{
			var appUserFromDb = await _repo.Get(id);
			if (appUserFromDb == null)
				return new NotFoundResult();
			appUser.Id = appUserFromDb.Id;
			appUser.InternalId = appUserFromDb.InternalId;
			await _repo.Update(appUser);
			return new OkObjectResult(appUser);
		}

		// DELETE /appuser/id
		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(long id)
		{
			var post = await _repo.Get(id);
			if (post == null)
				return new NotFoundResult();
			await _repo.Delete(id);
			return new OkResult();
		}

		[Route("[action]")]
		[HttpPost]
		public async Task<IActionResult> Login([FromBody] AppUser appUser)
		{
			var appUserFromDb = await _repo.GetByName(appUser.Name);
			if (appUserFromDb == null)
				return new UnauthorizedObjectResult("Incorect username provided");
			if (appUserFromDb.Password == appUser.Password)
				return new OkObjectResult(_repo.CreateNameHash(appUserFromDb));

			return new UnauthorizedObjectResult("Incorrect password provided");
		}
	}
}