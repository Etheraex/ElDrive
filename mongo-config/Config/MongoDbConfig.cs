using System.IO;

namespace mongo_config
{
	public class MongoDBConfig
	{
		public string Database => "ZI-db";
		public string ConnectionString => LoadConnectionString();

		private string LoadConnectionString()
		{
			using (StreamReader sr = new StreamReader("../../zi/environment.txt"))
			{
				return sr.ReadLine();
			}
		}
	}
}