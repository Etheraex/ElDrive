using mongo_config;
using MongoDB.Driver;

namespace file_service
{
	public class FileContext : Context<File>
	{
		public FileContext(MongoDBConfig config) : base(config) { }
		public override IMongoCollection<File> Collection => _db.GetCollection<File>("Files");
	}
}