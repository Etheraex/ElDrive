using System.Threading.Tasks;
using mongo_config;
using MongoDB.Driver;

namespace auth_service
{
	public class AppUserRepository : Repository<AppUser>
	{
		public AppUserRepository(Context<AppUser> context) : base(context) { }

		public Task<AppUser> GetByName(string name)
		{
			FilterDefinition<AppUser> filter = Builders<AppUser>.Filter.Eq(m => m.Name, name);
			return _context.Collection
							.Find(filter)
							.FirstOrDefaultAsync();
		}
	}
}