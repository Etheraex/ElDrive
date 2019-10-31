export class AppUser {
    id?: number;
    name: string;
    password: string;
    namehash?: string;

    login(user: AppUser): void {
        this.id = user.id;
        this.namehash = user.namehash;
        console.log(user);
    }

    logout(): void {
        this.id = null;
        this.name = null;
        this.password = null;
        this.namehash = null;
    }
}

export const loggedInUser = new AppUser();