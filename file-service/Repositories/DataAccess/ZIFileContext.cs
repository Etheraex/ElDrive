using mongo_config;
using MongoDB.Driver;

namespace file_service
{
	public class ZIFileContext : Context<ZIFile>
	{
		public ZIFileContext(MongoDBConfig config) : base(config) { }
		public override IMongoCollection<ZIFile> Collection => _db.GetCollection<ZIFile>("ZIFiles");
	}
}