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