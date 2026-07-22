export type ProductStatus = 
    | 'draft'
    | 'active'
    | 'archived';

export interface Product {

    id: string;

    slug: string;

    name: string;

    description: string | null;

    status: ProductStatus;
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
    | "name-asc"
    | "name-desc";


export interface ProductListOptions {

    page: number;

    pageSize: number;

    keyword?: string;

    productIds?: readonly string[];

    status?: ProductStatus[];

    sort?: ProductSort;

}


