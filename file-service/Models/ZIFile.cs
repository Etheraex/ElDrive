using System;
using System.Text;
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
		// MongoDB needs this property, with this exact name
		public ObjectId InternalId { get; set; }

		public String Id { get; set; }

		[JsonIgnore]
		public String Path { get; set; }

		[BsonIgnore]
		public String Data { get; set; }

		public String Name { get; set; }

		public String Hash { get; set; }
		public String FileHash { get; set; }
		public double Size { get; set; }
		public DateTime LastModified { get; set; }
		public EncryptionAlgorithms Encryption { get; set; }
		public String EncryptionKey { get; set; }

		public byte[] GetFileBytes()
		{
			return Encoding.ASCII.GetBytes(this.Data);
		}

		public void SaveFileBytes(byte[] data)
		{
			this.Data = Encoding.ASCII.GetString(data);
		}
	}
}