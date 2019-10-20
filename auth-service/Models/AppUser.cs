using System;
using mongo_config;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace auth_service
{
	public class AppUser : IIdentifiable
	{
		[BsonId]
		public ObjectId InternalId { get; set; }
		public long Id { get; set; }
		public String Name { get; set; }
		public String Password { get; set; }
		public String NameHash { get; set; }
	}
}