using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace auth_service
{
	[Produces("application/json")]
	[Route("Plans")]
	public class PlansController : Controller
	{
		private readonly ServicePlanRepository _repo;
		public PlansController(ServicePlanRepository repo)
		{
			_repo = repo;
		}

		// GET /plans
		[HttpGet]
		public async Task<ActionResult<IEnumerable<ServicePlan>>> Get()
		{
			return new ObjectResult(await _repo.GetAll());
		}

        [HttpPost]
        	public async Task<ActionResult<String>> Post([FromBody] ServicePlan plan)
		{
			plan.InternalId = new ObjectId(Guid.NewGuid().ToString("N"));
			plan.Id = Guid.NewGuid().ToString("N");
			await _repo.Create(plan);
			return new OkObjectResult(plan);
		}
		
        [HttpDelete("{id}")]
		public async Task<IActionResult> Delete(String id)
		{
			var post = await _repo.Get(id);
			if (post == null)
				return new NotFoundResult();
			await _repo.Delete(id);
			return new OkResult();
		}
	}
}