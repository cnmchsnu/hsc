export class CategoryNotFoundError
    extends Error {
    constructor(
        identifier: string,
    ) {
        super(
            `Category not found: ${identifier}`,
        );
        this.name =
            "CategoryNotFoundError";
    }
}

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