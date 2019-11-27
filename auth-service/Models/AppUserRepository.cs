using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using mongo_config;
using MongoDB.Driver;

namespace auth_service
{
	public class AppUserRepository : Repository<AppUser>
	{
		public AppUserRepository(Context<AppUser> context) : base(context) { }

		public Task<AppUser> GetByName(String name)
		{
			FilterDefinition<AppUser> filter = Builders<AppUser>.Filter.Eq(m => m.Name, name);
			return _context.Collection
							.Find(filter)
							.FirstOrDefaultAsync();
		}

		public String CreateNameHash(AppUser AppUser)
		{
			using (SHA256 hash = SHA256Managed.Create())
			{
				return String.Concat(hash
				  .ComputeHash(Encoding.UTF8.GetBytes(AppUser.Name))
				  .Select(item => item.ToString("x2")));
			}
		}
	}
}