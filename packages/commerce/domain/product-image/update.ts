export interface UpdateProductImage {
    id: string;

    url?: string;

    isPrimary?: boolean;

    alt?: string | null;

    displayOrder?: number;
}