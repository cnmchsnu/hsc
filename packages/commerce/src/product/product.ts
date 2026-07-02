export type ProductStatus = 
    | "draft"
    | "active"
    | "archived";


export interface ProductCategory {

    id: string;

    slug: string;

    name: string;

}

export interface Product {

    id: string;

    slug: string;

    name: string;

    description: string | null;

    status: ProductStatus;

    price: number;

    compareAtPrice: number | null;
}

export interface ProductList {

    items: Product[];

    total: number;

    page: number;

    pageSize: number;

}

export type ProductSort =
    | "newest"
    | "oldest"
    | "price-asc"
    | "price-desc"
    | "name-asc"
    | "name-desc";


export interface ProductListOptions {

    page: number;

    pageSize: number;

    keyword?: string;

    categoryIds?: string[];

    productIds?: string[];

    status?: ProductStatus[];

    sort?: ProductSort;

}


