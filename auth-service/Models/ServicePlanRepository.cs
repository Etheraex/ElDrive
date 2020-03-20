using mongo_config;

namespace auth_service
{
	public class ServicePlanRepository : Repository<ServicePlan>
	{
		public ServicePlanRepository(Context<ServicePlan> context) : base(context) { }
	}
}