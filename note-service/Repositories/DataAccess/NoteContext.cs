using mongo_config;
using MongoDB.Driver;
using note_service.Models;

namespace note_service.Repositories.DataAccess
{
	public class NoteContext : Context<NoteCollection>
	{
		public NoteContext(MongoDBConfig config) : base(config){}
		public override IMongoCollection<NoteCollection> Collection => _db.GetCollection<NoteCollection>(nameof(NoteCollection));
	}
}