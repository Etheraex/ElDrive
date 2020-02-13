using System;
using System.Text.Json.Serialization;
using mongo_config;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace auth_service
{
	public class ServicePlan : IIdentifiable
	{
		[JsonIgnore]
		[BsonId]
		public ObjectId? InternalId { get; set; }
		public String Id { get; set; }
		public String Name { get; set; }
		// Space measured in GB
		public double Space { get; set; }
		public double Price { get;set; }
		public bool Active { get;set; }
		public ServicePlan() { }

		public ServicePlan(String t, double s, double p, bool a)
		{
			this.Name = t;
			this.Space = s;
			this.Price = p;
			this.Active = a;
		}
	}
}