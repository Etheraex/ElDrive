using System;

namespace auth_service
{
	public class ServicePlan
	{
		public String Name { get; set; }
		public double Space { get; set; }
		public ServicePlan() { }

		public ServicePlan(String t, double s)
		{
			this.Name = t;
			this.Space = s;
		}
	}
}