export class ProductNotFoundError 
    extends Error {

    constructor(
        identifier: string,
    ) {
        super(
            `Product not found: ${identifier}`,
        );
        this.name =
            "ProductNotFoundError";
    }
}
