using System;

namespace auth_service
{
	public class ServicePlan
	{
		public String Name { get; set; }
		// Space measured in GB
		public double Space { get; set; }
		public ServicePlan() { }

		public ServicePlan(String t, double s)
		{
			this.Name = t;
			this.Space = s;
		}
	}
}