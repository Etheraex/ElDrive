using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;

namespace auth_service
{
	public class AppUserRepository : IAppUserRepository
	{
		private readonly IAppUserContext _context;
		public AppUserRepository(IAppUserContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<AppUser>> GetAllAppUsers()
		{
			return await _context.AppUsers
								.Find(x => true)
								.ToListAsync();
		}

		public Task<AppUser> GetAppUser(long id)
		{
			FilterDefinition<AppUser> filter = Builders<AppUser>.Filter.Eq(m => m.Id, id);
			return _context.AppUsers
							.Find(filter)
							.FirstOrDefaultAsync();
		}

		public async Task Create(AppUser appUser)
		{
			await _context.AppUsers.InsertOneAsync(appUser);
		}

		public async Task<bool> Update(AppUser appUser)
		{
			ReplaceOneResult updateResult =
				await _context.AppUsers
								.ReplaceOneAsync(filter: g => g.Id == appUser.Id, replacement: appUser);
			return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
		}

		public async Task<bool> Delete(long id)
		{
			FilterDefinition<AppUser> filter = Builders<AppUser>.Filter.Eq(m => m.Id, id);
			DeleteResult deleteResult = await _context.AppUsers
													  .DeleteOneAsync(filter);
			return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
		}

		public async Task<long> GetNextId()
		{
			return await _context.AppUsers.CountDocumentsAsync(new BsonDocument()) + 1;
		}
	}
}