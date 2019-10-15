using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace auth_service
{
    [Produces("application/json")]
    public class AppUserController : Controller
    {
        private readonly IAppUserRepository _repo;
        public AppUserController(IAppUserRepository repo)
        {
            _repo = repo;
        }

        // GET /appuser
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> Get()
        {
            return new ObjectResult(await _repo.GetAllAppUsers());
        }

        // GET /appuser/id
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> Get(long id)
        {
            var appUser = await _repo.GetAppUser(id);
            if (appUser == null)
                return new NotFoundResult();

            return new ObjectResult(appUser);
        }

        // POST /appuser
        [HttpPost]
        public async Task<ActionResult<AppUser>> Post([FromBody] AppUser appUser)
        {
            appUser.Id = await _repo.GetNextId();
            await _repo.Create(appUser);
            return new OkObjectResult(appUser);
        }

        // PUT /appuser/id
        [HttpPut("{id}")]
        public async Task<ActionResult<AppUser>> Put(long id, [FromBody] AppUser appUser)
        {
            var appUserFromDb = await _repo.GetAppUser(id);
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
            var post = await _repo.GetAppUser(id);
            if (post == null)
                return new NotFoundResult();
            await _repo.Delete(id);
            return new OkResult();
        }
    }
}