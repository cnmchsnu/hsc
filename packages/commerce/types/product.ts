export type ProductStatus = 
    | "draft"
    | "active"
    | "archived";

export interface ProductImage {

    id: string;

    url: string;

    alt: string | null;

    sortOrder: number;
}

export interface Product {

    id: string;

    slug: string;

    name: string;

    description: string | null;

    status: ProductStatus;

    categoryId: string | null;

    price: number;

    compareAtPrice: number | null;

    images: ProductImage[];
}