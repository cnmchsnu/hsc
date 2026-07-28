import { ApplicationError } from "./application-error";

export class ConflictError extends ApplicationError {

    readonly code = "CONFLICT";

    constructor(message: string) {
        super(message, 409);
    }

}