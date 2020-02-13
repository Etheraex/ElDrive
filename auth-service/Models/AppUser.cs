using System;
using System.Text.Json.Serialization;
using mongo_config;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace auth_service
{
    public class AppUser : IIdentifiable
    {
        [JsonIgnore]
        [BsonId]
        public ObjectId? InternalId { get; set; }
        public String Id { get; set; }
        public String Name { get; set; }
        public String Password { get; set; }

        [BsonIgnore]
        public String Hash { get; set; }
        public ServicePlan Plan { get; set; }
        public DateTime planChosen { get; set; }
        public DateTime planExpires { get; set; }
        public double UsedSpace { get; set; }
    }
}