export abstract class ApplicationError extends Error {

    abstract readonly code: string;

    readonly status: number;

    protected constructor(
        message: string,
        status: number,
    ) {
        super(message);

        this.name = this.constructor.name;
        this.status = status;
    }
}