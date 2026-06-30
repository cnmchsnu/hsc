export class PermissionDeniedError
    extends Error {

    constructor(
        permissions: string,
    ) {

        super(
            `Permission denied: ${permission}`,
        );

        this.name =
            "PermissionDeniedError";

    }

}