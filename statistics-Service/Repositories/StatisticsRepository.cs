using System.Collections.Generic;
using System.Threading.Tasks;

using mongo_config;
using MongoDB.Bson;
using MongoDB.Driver;
using statistics_Service.Models;

namespace statistics_Service.Repositories
{
	public class StatisticsRepository : Repository<Statistics>
	{
		private const string defaultDocumentId = "1";
		public StatisticsRepository(Context<Statistics> context) : base(context){}
		
		public async Task onFileUploadAsync(ZIFile file, string id = defaultDocumentId){
			var extension = (file.Extension == null || file.Extension.Equals(""))?"unknownType":file.Extension;
			
			var setUpdate = Builders<Statistics>.Update
				.AddToSet(nameof(Statistics.Extensions),new KeyValuePair<string,int>(extension,0));



			var filter = Builders<Statistics>.Filter.Eq(statistic => statistic.Id, id);
			var update = Builders<Statistics>.Update
				.Inc(nameof(Statistics.TotalDataStored),file.Size)
				.Inc(nameof(Statistics.NumberOfFiles),1)
				.Inc(nameof(Statistics.Extensions)+".$[extension].v",1);

			var arrayFilters = new List<ArrayFilterDefinition>();
			ArrayFilterDefinition<BsonDocument> arrayFilter = new BsonDocument("extension.k", extension);
			arrayFilters.Add(arrayFilter);
			var updateOptions = new UpdateOptions { ArrayFilters = arrayFilters, IsUpsert = true };

			await _context.Collection.UpdateOneAsync(filter,setUpdate);
			await _context.Collection.UpdateOneAsync(filter,update,updateOptions);
		}

		public async Task onFileRemoveAsync(ZIFile file, string id = defaultDocumentId){
			var filter = Builders<Statistics>.Filter.Eq(statistic => statistic.Id, id);
			var update = Builders<Statistics>.Update
				.Inc(nameof(Statistics.TotalDataStored),-file.Size)
				.Inc(nameof(Statistics.NumberOfFiles), -1);
			await _context.Collection.UpdateOneAsync(filter,update);
		}

		public async Task AddNumberOfUsers(int value,string id = defaultDocumentId){
			await this.addValueAsync(nameof(Statistics.NumberOfUsers),value,id);
		}

		private async Task addValueAsync<T>(string fieldName,T value, string id = defaultDocumentId){
			var filter = Builders<Statistics>.Filter.Eq(statistic => statistic.Id, id);
			var update = Builders<Statistics>.Update.Inc(fieldName,value);
			await _context.Collection.UpdateOneAsync(filter,update);
		}
	}
}