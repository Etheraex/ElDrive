using mongo_config;

namespace file_service
{
	public class FileRepository : Repository<File>
	{
		public FileRepository(Context<File> context) : base(context) { }
	}
}