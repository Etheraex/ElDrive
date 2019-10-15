using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace auth_service
{
    public class AppUser
    {
        [BsonId]
        public ObjectId InternalId { get; set; }
        public long Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
    }
}