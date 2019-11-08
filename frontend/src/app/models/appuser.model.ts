export class AppUser {
    id?: number;
    name: string;
    password: string;
    nameHash?: string;

    login(user: AppUser): void {
        this.id = user.id;
        this.nameHash = user.nameHash;
        localStorage.setItem("loggedInUser", this.nameHash);
    }

    logout(): void {
        this.id = null;
        this.name = null;
        this.password = null;
        this.nameHash = null;
        localStorage.removeItem("loggedInUser");
    }

    public get isLoggedIn(): boolean {
        return this.id ? true : false;
    }
}

export const loggedInUser = new AppUser();