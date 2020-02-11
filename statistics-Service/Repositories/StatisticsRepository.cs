using System;
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
			var date = DateTime.Now.ToShortDateString();

			await addToSet(nameof(Statistics.Extensions),extension);
			await addToSet(nameof(Statistics.UploadDates),date);

			var filter = Builders<Statistics>.Filter.Eq(statistic => statistic.Id, id);
			var update = Builders<Statistics>.Update
				.Inc(nameof(Statistics.TotalDataStored),file.Size)
				.Inc(nameof(Statistics.NumberOfFiles),1)
				.Inc(nameof(Statistics.Extensions)+".$[extension].v",1)
				.Inc(nameof(Statistics.UploadDates)+".$[date].v",1);

			var arrayFilters = new List<ArrayFilterDefinition>{
				(ArrayFilterDefinition<BsonDocument>) new BsonDocument("extension.k", extension),
				(ArrayFilterDefinition<BsonDocument>) new BsonDocument("date.k",date)
			};
			var updateOptions = new UpdateOptions { ArrayFilters = arrayFilters, IsUpsert = true };
			await _context.Collection.UpdateOneAsync(filter,update,updateOptions);
		}

		public async Task onFileRemoveAsync(ZIFile file, string id = defaultDocumentId){
			var filter = Builders<Statistics>.Filter.Eq(statistic => statistic.Id, id);
			var update = Builders<Statistics>.Update
				.Inc(nameof(Statistics.TotalDataStored),-file.Size)
				.Inc(nameof(Statistics.NumberOfFiles), -1);
			await _context.Collection.UpdateOneAsync(filter,update);
		}

		public async Task addDataPlan(string planName , string id = defaultDocumentId){
			await addToSet(nameof(Statistics.DataPlans),planName);

			var filter = Builders<Statistics>.Filter.Eq(statistic => statistic.Id, id);
			var update = Builders<Statistics>.Update
				.Inc(nameof(Statistics.DataPlans)+".$[plan].v",1);

			var arrayFilters = new List<ArrayFilterDefinition>{
				(ArrayFilterDefinition<BsonDocument>) new BsonDocument("plan.k", planName),
			};
			var updateOptions = new UpdateOptions { ArrayFilters = arrayFilters, IsUpsert = true };
			await _context.Collection.UpdateOneAsync(filter,update,updateOptions);
		}

		public async Task removeDataPlan(string planName , string id = defaultDocumentId){
			var filter = Builders<Statistics>.Filter.Eq(statistic => statistic.Id, id);
			var update = Builders<Statistics>.Update
				.Inc(nameof(Statistics.DataPlans)+".$[plan].v",-1);

			var arrayFilters = new List<ArrayFilterDefinition>{
				(ArrayFilterDefinition<BsonDocument>) new BsonDocument("plan.k", planName),
			};
			var updateOptions = new UpdateOptions { ArrayFilters = arrayFilters, IsUpsert = true };
			await _context.Collection.UpdateOneAsync(filter,update,updateOptions);
		}
		public async Task AddNumberOfUsers(int value,string id = defaultDocumentId){
			await this.addValueAsync(nameof(Statistics.NumberOfUsers),value,id);
		}
		public async Task removeNumberOfUsers(int value,string id = defaultDocumentId){
			await this.addValueAsync(nameof(Statistics.NumberOfUsers),-value,id);
		}
		private async Task addToSet(string fieldName, string value){
			var setFilter = Builders<Statistics>.Filter.AnyNe(fieldName+".k",value);
			var setUpdate = Builders<Statistics>.Update
				.AddToSet(fieldName,new KeyValuePair<string,int>(value,0));
			await _context.Collection.UpdateOneAsync(setFilter,setUpdate);
		}
		public async Task addValueAsync<T>(string fieldName,T value, string id = defaultDocumentId){
			var filter = Builders<Statistics>.Filter.Eq(statistic => statistic.Id, id);
			var update = Builders<Statistics>.Update.Inc(fieldName,value);
			await _context.Collection.UpdateOneAsync(filter,update);
		}
	}
}