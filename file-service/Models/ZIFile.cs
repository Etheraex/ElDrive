using System;
using System.Text.Json.Serialization;
using mongo_config;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace file_service
{
	public class ZIFile : IIdentifiable
	{
		[JsonIgnore]
		[BsonId]
		public ObjectId InternalId { get; set; }

		[JsonIgnore]
		public String Path { get; set; }
		public long? Id { get; set; }
		[BsonIgnore]
		public byte[] Data { get; set; }
		public String Name { get; set; }
		public String UserHash { get; set; }
	}
}