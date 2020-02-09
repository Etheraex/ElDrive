using mongo_config;
using MongoDB.Driver;
using statistics_Service.Models;

namespace statistics_Service.Repositories.DataAccess
{
	public class StatisticsContext : Context<Statistics>
	{
		public StatisticsContext(MongoDBConfig config) : base(config) { }
		public override IMongoCollection<Statistics> Collection => _db.GetCollection<Statistics>("Statistics");
	}
}