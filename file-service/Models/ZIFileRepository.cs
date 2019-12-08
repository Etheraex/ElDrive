using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using mongo_config;
using MongoDB.Driver;

namespace file_service
{
	public class ZIFileRepository : Repository<ZIFile>
	{
		public ZIFileRepository(Context<ZIFile> context) : base(context) { }

		public void SaveBytesToFileSystem(ZIFile file)
		{
			System.IO.Directory.CreateDirectory("Files/" + file.Hash.Replace(" ", ""));
			file.Path = "Files/" + file.Hash.Replace(" ", "") + "/" + file.Name.Replace(" ", "");
			System.IO.File.WriteAllBytes(file.Path, file.GetFileBytes());
		}

		public Byte[] LoadDataFromFileSystem(String path)
		{
			return System.IO.File.ReadAllBytes(path);
		}
		
		public void DeleteFileFromFileSystem(ZIFile file)
		{
			System.IO.File.Delete(file.Path);
		}

		public Task<List<ZIFile>> GetByHashName(String hash)
		{
			FilterDefinition<ZIFile> filter = Builders<ZIFile>.Filter.Eq(m => m.Hash, hash);
			return _context.Collection
							.Find(filter)
							.ToListAsync();
		}
	}
}