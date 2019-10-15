using MongoDB.Driver;

namespace auth_service
{
    public interface IAppUserContext
    {
        IMongoCollection<AppUser> AppUsers { get; }
    }
}