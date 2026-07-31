export interface UpdateProductImage {
    id: string;

    productId: string;

    url?: string;

    isPrimary?: boolean;

    alt?: string;

    displayOrder?: number;
}