import { ApplicationError } from "./application-error";

export class UnauthorizedError extends ApplicationError {

    readonly code = "UNAUTHORIZED";

    constructor(message = "Unauthorized") {
        super(message, 401);
    }

}