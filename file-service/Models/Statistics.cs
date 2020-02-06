using System.Text.Json.Serialization;
using mongo_config;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace file_service.Models
{
    public class Statistics : IIdentifiable
    {
		[JsonIgnore]
		[BsonId]
		// MongoDB needs this property, with this exact name
		public ObjectId InternalId { get; set; }
		public string Id { get; set; }
		public double TotalDataStored { get; set; }
		public int NumberOfFiles { get; set; }
		public int NumberOfUsers { get; set; }
	}
}