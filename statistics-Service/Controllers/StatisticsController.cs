using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using statistics_Service.Repositories;

namespace statistics_Service.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StatisticsController : ControllerBase
    {

        private readonly StatisticsRepository _statisticsRepository;

        public StatisticsController(StatisticsRepository repository)
        {
            _statisticsRepository = repository;
        }

		// POST
		[HttpPost]
		public async Task<ActionResult<ZIFile>> Post([FromBody] ZIFile file)
		{
			await _statisticsRepository.onFileUploadAsync(file);
			return new OkObjectResult(file);
		}
		
		// PUT /Statistics/addDataPlan/planName
		[HttpPut("addDataPlan/{planName}")]
		public async Task<ActionResult> AddDataPlan(string planName){
			await _statisticsRepository.addDataPlan(planName);
			return Ok();
		}

		// PUT /Statistics/removeDataPlan/planName
		[HttpPut("removeDataPlan/{planName}")]
		public async Task<ActionResult> RemoveDataPlan(string planName){
			await _statisticsRepository.removeDataPlan(planName);
			return Ok();
		}

		// PUT /incrementUserCount
		[HttpPut("incrementUserCount")]
		public async Task<ActionResult> incrementUserCount(){
			await _statisticsRepository.AddNumberOfUsers(1);
			return Ok();
		}

		// PUT /incrementUserCount
		[HttpPut("decrementUserCount")]
		public async Task<ActionResult> decrementUserCount(){
			await _statisticsRepository.AddNumberOfUsers(-1);
			return Ok();
		}

		// PUT
		[HttpPut("{filedName}")]
		public async Task<ActionResult> decrementUserCount(string filedName,[FromBody] int value){
			await _statisticsRepository.addValueAsync(filedName,value);
			return Ok();
		}
		// DELETE
		[HttpDelete]
		public async Task<IActionResult> Delete([FromBody] ZIFile file)
		{
			await _statisticsRepository.onFileRemoveAsync(file);
			return new OkResult();
		}

    }
}
