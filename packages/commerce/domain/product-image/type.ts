export interface ProductImage {

    id: string;

    productId: string;

    url: string;

    isPrimary: boolean;

    alt: string | null;

    displayOrder: number;
}