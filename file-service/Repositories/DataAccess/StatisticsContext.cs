using file_service.Models;
using mongo_config;
using MongoDB.Driver;

namespace file_service.Repositories.DataAccess
{
	public class StatisticsContext : Context<Statistics>
	{
		public StatisticsContext(MongoDBConfig config) : base(config) { }
		public override IMongoCollection<Statistics> Collection => _db.GetCollection<Statistics>("Statistics");
	}
}