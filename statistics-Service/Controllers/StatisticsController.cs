using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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

		// DELETE
		[HttpDelete]
		public async Task<IActionResult> Delete([FromBody] ZIFile file)
		{
			await _statisticsRepository.onFileRemoveAsync(file);
			return new OkResult();
		}

    }
}
