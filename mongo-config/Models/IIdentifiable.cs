using System;

namespace mongo_config
{
	public interface IIdentifiable
	{
		String Id { get; set; }
	}
}