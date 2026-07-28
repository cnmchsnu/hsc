import { ApplicationError } from "./application-error";

export class ValidationError extends ApplicationError {

    readonly code = "VALIDATION_ERROR";

    constructor(message: string) {
        super(message, 400);
    }

}