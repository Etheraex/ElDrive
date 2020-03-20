using mongo_config;
using MongoDB.Driver;

namespace auth_service
{
	public class AppUserContext : Context<AppUser>
	{
		public AppUserContext(MongoDBConfig config) : base(config) { }
		public override IMongoCollection<AppUser> Collection => _db.GetCollection<AppUser>("AppUsers");
	}
}