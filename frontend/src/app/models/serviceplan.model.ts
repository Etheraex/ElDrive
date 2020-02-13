export class ServicePlan {
	public constructor(public name: string, public space: number, public price: number, public active: boolean) { }
}

export const Free = {
	name: "Free",
	price: 0,
	space : 10,
	active : true
}