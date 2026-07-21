import { ProductSort, ProductStatus } from '../../../domain/product';
import { ProductSummary } from '../../read/product/type';


export interface ProductSearchRequest {

    filter?: ProductSearchFilter;

    sort?: ProductSort;

    page?: number;

    pageSize?: number;

}

export interface ProductSearchFilter {

    keyword?: string;

    categorySlugs?: readonly string[];

    minPrice?: number;

    maxPrice?: number;

    inStock?: boolean;

    status?: ProductStatus[];

}

export interface ProductSearchResponse {

    items: readonly ProductSummary[];

    pagination: {

        page: number;

        pageSize: number;

        total: number;

        hasMore: boolean;

    };

}
