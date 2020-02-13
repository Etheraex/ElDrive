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
	planChosen: Date;
	planExpires: Date;
}

export const appUser = new AppUser();