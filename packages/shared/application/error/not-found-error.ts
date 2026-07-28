import { ApplicationError } from "./application-error";

export class NotFoundError extends ApplicationError {

    readonly code = "NOT_FOUND";

    constructor(message: string) {
        super(message, 404);
    }

}