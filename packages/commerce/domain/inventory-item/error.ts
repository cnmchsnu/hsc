export class InventoryItemNotFoundException 
    extends Error {

    constructor(
        identifier: string,
    ) {
        super(
            `Inventory item not found: ${identifier}`,
        );
        this.name =
            "InventoryItemNotFoundException";
    }
}

export class InvalidInventoryQuantityException
    extends Error {
    constructor() {
        super(
            `Inventory item quantity must be greater than zero`,
        );
        this.name =
            "InvalidInventoryQuantityException";
    }

}

export class InsufficientInventoryException 
    extends Error {

    constructor() {
        super(
            `Inventory item has insufficient quantity`,
        );
        this.name =
            "InsufficientInventoryException";
    }
}

export class InvalidReservedQuantityException
    extends Error {

    constructor() {
        super(
            `Inventory item reserved quantity is invalid`,
        );
        this.name =
            "InvalidReservedQuantityException";
    }
}

export class InvalidIncomingQuantityException
    extends Error {

    constructor() {
        super(
            `Inventory item incoming quantity is invalid`,
        );
        this.name =
            "InvalidIncomingQuantityException";
    } 
}