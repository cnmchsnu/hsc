export interface CreateProductCategory {

    productId: string;

    categoryId: string;

    isPrimary: boolean;

    displayOrder: number;

}



export interface CommandCreateProductCategory {

    categoryId: string;

    isPrimary: boolean;

    displayOrder: number;

}