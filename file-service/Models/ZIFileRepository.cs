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

        public void SaveToFile(ZIFile file)
        {
            System.IO.Directory.CreateDirectory("Files/" + file.Hash.Replace(" ", ""));
            file.Path = "Files/" + file.Hash.Replace(" ", "") + "/" + file.Name.Replace(" ", "");
            System.IO.File.WriteAllBytes(file.Path, file.Data);
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