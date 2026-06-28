export class AuthenticationRequiredError extends Error {
    constructor() {
        super("User is not authenticated. Authentication is required to access this resource.");
        this.name = "AuthenticationRequiredError";
    }
}
