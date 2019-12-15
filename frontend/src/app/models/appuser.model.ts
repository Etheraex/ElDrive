import { ZIFile } from './zifile.model';
import { ServicePlan } from './serviceplan.model';

export class AppUser {
	id: string;
	name: string;
	password: string;
	hash: string;
	files?: Array<ZIFile>;
	plan: ServicePlan;
	usedSpace: number;
}

export const appUser = new AppUser();