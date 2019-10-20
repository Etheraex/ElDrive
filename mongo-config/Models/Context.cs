using MongoDB.Driver;

namespace mongo_config
{
	public abstract class Context<T>
	{
		protected readonly IMongoDatabase _db;
		protected Context(MongoDBConfig config)
		{
			var client = new MongoClient(config.ConnectionString);
			_db = client.GetDatabase(config.Database);
		}
		public abstract IMongoCollection<T> Collection { get; }
	}
}