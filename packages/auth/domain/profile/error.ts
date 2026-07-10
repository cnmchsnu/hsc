export class UserProfileNotFoundError extends Error {
    constructor(userId: string) {
        super(`Profile not found for user '${userId}'`);
        this.name = "UserProfileNotFoundError";
    }
}
