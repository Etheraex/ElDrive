using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace mongo_config
{
	public abstract class Repository<T> where T : IIdentifiable
	{
		protected readonly Context<T> _context;

		protected Repository(Context<T> context)
		{
			this._context = context;
		}
		// [GET]
		public async Task<IEnumerable<T>> GetAll()
		{
			return await _context.Collection
								.Find(x => true)
								.ToListAsync();
		}

		public Task<T> Get(String id)
		{
			FilterDefinition<T> filter = Builders<T>.Filter.Eq(m => m.Id, id);
			return _context.Collection
							.Find(filter)
							.FirstOrDefaultAsync();
		}

		public async Task Create(T data)
		{
			await _context.Collection.InsertOneAsync(data);
		}

		public async Task<bool> Update(T data)
		{
			ReplaceOneResult updateResult = await _context.Collection
								.ReplaceOneAsync(filter: g => g.Id == data.Id, replacement: data);
			return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
		}

		public async Task<bool> Delete(String id)
		{
			FilterDefinition<T> filter = Builders<T>.Filter.Eq(m => m.Id, id);
			DeleteResult deleteResult = await _context.Collection
													  .DeleteOneAsync(filter);
			return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
		}
	}
}