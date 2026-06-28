export class UserNotAuthenticatedError extends Error {
    constructor() {
        super("User is not authenticated");
        this.name = "UserNotAuthenticatedError";
    }
}

export class UserProfileNotFoundError extends Error {
    constructor(userId: string) {
        super(`Profile not found for user '${userId}'`);
        this.name = "UserProfileNotFoundError";
    }
}