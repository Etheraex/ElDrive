using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using mongo_config;
using MongoDB.Driver;

namespace auth_service
{
	public class ServicePlanRepository : Repository<ServicePlan>
	{
		public ServicePlanRepository(Context<ServicePlan> context) : base(context) { }

	}
}