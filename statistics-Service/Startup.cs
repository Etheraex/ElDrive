using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using mongo_config;
using statistics_Service.Models;
using statistics_Service.Repositories;
using statistics_Service.Repositories.DataAccess;

namespace statistics_Service
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}
		readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			var config = new MongoDBConfig();
			Configuration.Bind(config);

			#region Statistics
			var statisticsContext = new StatisticsContext(config);
			var statisticsRepository = new StatisticsRepository(statisticsContext);
			services.AddSingleton<StatisticsRepository>(statisticsRepository);
			#endregion

			var statistics = statisticsRepository.GetAll().GetAwaiter().GetResult();
			if (statistics.Count() == 0)
			{
				this.seedDefaultStatisticsObject(statisticsRepository);
			}

			services.AddControllers();
			services.AddCors(options =>
			{
				options.AddPolicy(MyAllowSpecificOrigins,
				builder =>
				{
					builder.WithOrigins("http://localhost:4200")
													.AllowAnyHeader()
													.AllowAnyMethod();
				});
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			app.UseCors(MyAllowSpecificOrigins);
			app.UseRouting();
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}

		void seedDefaultStatisticsObject(StatisticsRepository statisticsRepository)
		{
			var stat = new Statistics()
			{
				Id = "1",
				DataPlans = new Dictionary<string, int>(),
				Extensions = new Dictionary<string, int>(),
				UploadDates = new Dictionary<string, int>(),
				NumberOfFiles = 0,
				NumberOfMessages = 0,
				NumberOfUsers = 0,
				TotalDataStored = 0,
			};
			statisticsRepository.Create(stat);
		}
	}
}
