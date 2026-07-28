import { ApplicationError } from "./application-error";

export class ForbiddenError extends ApplicationError {

    readonly code = "FORBIDDEN";

    constructor(message = "Forbidden") {
        super(message, 403);
    }

}