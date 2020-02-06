using file_service.Models;
using file_service.Repositories;
using file_service.Repositories.DataAccess;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using mongo_config;

namespace file_service
{
	public class Startup
	{
		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}
		readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
		public IConfiguration Configuration { get; }
		public void ConfigureServices(IServiceCollection services)
		{
			var config = new MongoDBConfig();
			Configuration.Bind(config);

			#region ZIFile
			var appUsersContext = new ZIFileContext(config);
			var repo = new ZIFileRepository(appUsersContext);
			services.AddSingleton<ZIFileRepository>(repo);
			#endregion
			#region Statistics
			var statisticsContext = new StatisticsContext(config);
			var statisticsRepository = new StatisticsRepository(statisticsContext);
			services.AddSingleton<StatisticsRepository>(statisticsRepository);

			var stat = new Statistics{
				Id = "2",
				TotalDataStored = 0
			};
			//statisticsRepository.Create(stat);
			#endregion

			services.AddControllers();

			services.AddCors(options =>
			{
				options.AddPolicy(MyAllowSpecificOrigins,
				builder =>
				{
					builder.WithOrigins("http://localhost:4200", "http://localhost:7000")
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
			else
			{
				app.UseHsts();
			}
			app.UseCors(MyAllowSpecificOrigins);
			app.UseRouting();
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute("default", "{controller=ZIFile}/{action=Get}/{id?}");
			});
		}
	}
}
