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
	noteCollecionId : string;

	updateUser(user: AppUser) {
		this.id = user.id;
		this.name = user.name;
		this.password = user.password;
		this.hash = user.hash;
		this.plan = user.plan;
		this.usedSpace = user.usedSpace;
		this.planChosen = user.planChosen;
		this.planExpires = user.planExpires;
		this.noteCollecionId = user.noteCollecionId;
	}
}

export const appUser = new AppUser();