using System.Collections.Generic;
using System.Threading.Tasks;

namespace auth_service
{
    public interface IAppUserRepository
    {
        // [GET]
        Task<IEnumerable<AppUser>> GetAllAppUsers();

        // [GET]/id
        Task<AppUser> GetAppUser(long id);

        // [POST]
        Task Create(AppUser appUser);

        // [PUT]/id
        Task<bool> Update(AppUser appUser);

        // [DELETE]/id
        Task<bool> Delete(long id);
		
        Task<long> GetNextId();

    }
}