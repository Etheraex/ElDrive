export class ServicePlan {
	public constructor(public name: string, public space: number) { }
}

export const availablePlans = {
	Free: new ServicePlan("Free", 1.0),
	Basic: new ServicePlan("Basic", 10.0),
	Advanced: new ServicePlan("Advanced", 100.0)
}