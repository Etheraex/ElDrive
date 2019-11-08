using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace file_service
{
    [Produces("application/json")]
    [Route("ZIFile")]
    public class ZIFileController : Controller
    {
        private readonly ZIFileRepository _repo;
        public ZIFileController(ZIFileRepository repo)
        {
            _repo = repo;
        }

        // GET /file
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ZIFile>>> Get()
        {
            return new ObjectResult(await _repo.GetAll());
        }

        // GET /file/id
        [HttpGet("{id}")]
        public async Task<ActionResult<ZIFile>> Get(long id)
        {
            var file = await _repo.Get(id);
            if (file == null)
                return new NotFoundResult();

            return new ObjectResult(file);
        }

        // POST /file
        [HttpPost]
        public async Task<ActionResult<ZIFile>> Post([FromBody] ZIFile file)
        {
            this._repo.SaveToFile(file);
            file.Id = await _repo.GetNextId();
            await _repo.Create(file);
            return new OkObjectResult(file);
        }

        // PUT /file/id
        [HttpPut("{id}")]
        public async Task<ActionResult<ZIFile>> Put(long id, [FromBody] ZIFile file)
        {
            var fileFromDb = await _repo.Get(id);
            if (fileFromDb == null)
                return new NotFoundResult();
            file.Id = fileFromDb.Id;
            file.InternalId = fileFromDb.InternalId;
            file.Path = fileFromDb.Path;
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