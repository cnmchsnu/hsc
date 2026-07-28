export interface CreateProductImage {

    productId: string;

    url: string;

    isPrimary: boolean;

    alt: string | null;

    displayOrder: number;
}