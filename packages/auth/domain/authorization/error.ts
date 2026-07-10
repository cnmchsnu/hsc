export class PermissionDeniedError
    extends Error {

    constructor(
        permissions: string,
    ) {

        super(
            `Permission denied: ${permissions}`,
        );

        this.name =
            "PermissionDeniedError";

    }

}
