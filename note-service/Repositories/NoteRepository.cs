using mongo_config;
using note_service.Models;

namespace note_service.Repositories
{
    public class NoteRepository : Repository<NoteCollection>
    {
        public NoteRepository(Context<NoteCollection> context) : base(context){}
    }
}