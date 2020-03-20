using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using mongo_config;
using note_service.Repositories;
using note_service.Repositories.DataAccess;

namespace note_service
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

			#region NoteCollecion
			var noteContext = new NoteContext(config);
			var noteRepository = new NoteRepository(noteContext);
			services.AddSingleton(noteRepository);
			#endregion

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
	}
}
