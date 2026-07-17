export class PriceNotFoundException 
    extends Error {

    constructor(
        identifier: string,
    ) {
        super(
            `Price not found: ${identifier}`,
        );
        this.name =
            "PriceNotFoundException";
    }
}

export class PriceCreateFailedException 
    extends Error {

    constructor(
        identifier: string,
    ) {
        super(
            `Price creation failed on SKU: ${identifier}`,
        );
        this.name =
            "PriceCreateFailedException";
    }
}