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
		private ServicePlan[] AvailablePlans =
		{
			new ServicePlan("Free", 1.0),
			new ServicePlan("Basic", 10.0),
			new ServicePlan("Advanced", 100.0)
		};
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

		// GET /appuser/name
		[HttpGet("{name}")]
		public async Task<ActionResult<AppUser>> Get(String name)
		{
			var appUser = await _repo.GetByName(name);
			if (appUser == null)
				return new NotFoundResult();
			appUser.Hash = _repo.CreateNameHash(appUser);
			return new ObjectResult(appUser);
		}

		// register
		// POST /appuser
		[HttpPost]
		public async Task<ActionResult<String>> Post([FromBody] AppUser appUser)
		{
			appUser.InternalId = new ObjectId(Guid.NewGuid().ToString("N"));
			appUser.Id = Guid.NewGuid().ToString("N");
			await _repo.Create(appUser);
			return new OkObjectResult(_repo.CreateNameHash(appUser));
		}

		// PUT /appuser/id
		[HttpPut("{id}")]
		public async Task<ActionResult<AppUser>> Put(String id, [FromBody] AppUser appUser)
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
		public async Task<IActionResult> Delete(String id)
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
			{
				appUserFromDb.Hash = _repo.CreateNameHash(appUserFromDb);
				return new OkObjectResult(appUserFromDb);
			}
			return new UnauthorizedObjectResult("Incorrect password provided");
		}
	}
}