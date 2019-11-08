using mongo_config;

namespace file_service
{
	public class ZIFileRepository : Repository<ZIFile>
	{
		public ZIFileRepository(Context<ZIFile> context) : base(context) { }

        public void SaveToFile(ZIFile file)
        {
            System.IO.Directory.CreateDirectory("Files/" + file.UserHash.Replace(" ", ""));
            file.Path = "Files/" + file.UserHash.Replace(" ", "") + "/" + file.Name.Replace(" ", "");
            System.IO.File.WriteAllBytes(file.Path, file.Data);
        }
	}
}