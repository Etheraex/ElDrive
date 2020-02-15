using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using mongo_config;
using MongoDB.Driver;
using System.Linq;

namespace file_service
{
	public class ZIFileRepository : Repository<ZIFile>
	{
		public ZIFileRepository(Context<ZIFile> context) : base(context) { }

		public void SaveBytesToFileSystem(ZIFile file)
		{
			System.IO.Directory.CreateDirectory("Files/" + file.Hash.Replace(" ", ""));
			file.Path = "Files/" + file.Hash.Replace(" ", "") + "/" + file.Name.Replace(" ", "");
			Byte[] bytes = file.GetFileBytes();
			System.IO.File.WriteAllBytes(file.Path, bytes);
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

		public async Task<List<ZIFile>> GetSharedFiles(String hash)
		{
			// TODO: mongoDB query instead of linq
			var filesFromDB = (await this.GetAll()).ToList();
			filesFromDB = filesFromDB.Where(x => x.HaveAccess.Contains(hash)).ToList();	
			return filesFromDB;
		}
	}
}