using mongo_config;

namespace auth_service
{
	public class AppUserRepository : Repository<AppUser>
	{
		public AppUserRepository(Context<AppUser> context) : base(context) { }
	}
}