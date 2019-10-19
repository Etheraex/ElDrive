namespace mongo_config
{
    public class MongoDBConfig
    {
        public string Database => "ZI-db";
        public string ConnectionString => $@"mongodb://root:example@localhost:27017";
    }
}