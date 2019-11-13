import { ZIFile } from './zifile.model';

export class AppUser {
    name: string;
    password: string;
    token?: string;
    files?: Array<ZIFile>;
}

export const appUser = new AppUser();