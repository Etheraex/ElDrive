using System.Collections.Generic;
using System.Text.Json.Serialization;
using mongo_config;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace note_service.Models
{
	public class NoteCollection : IIdentifiable
	{

		[JsonIgnore]
		[BsonId]
		// MongoDB needs this property, with this exact name
		public ObjectId InternalId { get; set; }
		public string Id { get; set; }
		public string UserId { get; set; }
		public IEnumerable<Note> Notes { get; set; }

	}
}