using System.Collections.Generic;
using System.Text.Json.Serialization;
using mongo_config;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Options;

namespace statistics_Service.Models
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

		[BsonDictionaryOptions(Representation = DictionaryRepresentation.ArrayOfDocuments)]
		public Dictionary<string,int> Extensions { get; set; }
		[BsonDictionaryOptions(Representation = DictionaryRepresentation.ArrayOfDocuments)]
		public Dictionary<string,int> Plans { get; set; }
	}
}