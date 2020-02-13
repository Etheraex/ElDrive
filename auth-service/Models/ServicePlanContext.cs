using mongo_config;
using MongoDB.Driver;

namespace auth_service
{
	public class ServicePlanContext : Context<ServicePlan>
	{
		public ServicePlanContext(MongoDBConfig config) : base(config) { }

		public override IMongoCollection<ServicePlan> Collection => _db.GetCollection<ServicePlan>("ServicePlans");
	}
}