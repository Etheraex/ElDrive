using MongoDB.Driver;

namespace auth_service
{
	public class AppUserContext : IAppUserContext
	{
		private readonly IMongoDatabase _db;

		public AppUserContext(MongoDBConfig config)
		{
			var client = new MongoClient(config.ConnectionString);
			_db = client.GetDatabase(config.Database);
		}
		public IMongoCollection<AppUser> AppUsers => _db.GetCollection<AppUser>("AppUsers");
	}
}