using System.Threading.Tasks;
using file_service.Models;
using mongo_config;
using MongoDB.Driver;
namespace file_service.Repositories
{
	public class StatisticsRepository : Repository<Statistics>
	{
		private const string defaultDocumentId = "1";
		public StatisticsRepository(Context<Statistics> context) : base(context){}
		
		public async Task IncreaseFileCountAsync(double fileSize, string id = defaultDocumentId){
			await this.addValueAsync(nameof(Statistics.TotalDataStored),fileSize , id);
			await this.addValueAsync(nameof(Statistics.NumberOfFiles),1 , id);
		}
		public async Task DecreaseFileCountAsync(double fileSize, string id = defaultDocumentId){
			await this.addValueAsync(nameof(Statistics.TotalDataStored), -fileSize , id);
			await this.addValueAsync(nameof(Statistics.NumberOfFiles), -1, id);
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