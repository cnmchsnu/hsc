export class CategoryTreeError
    extends Error {
    constructor(
        identifier: string,
    ) {
        super(
            `Failed to build category tree: ${identifier}`,
        );
        this.name =
            "CategoryTreeError";
    }
}