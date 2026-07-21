import { Query } from '@repo/shared';
import { ProductSort, ProductStatus } from '../../../domain/product';
import { ProductSummary } from '../../read/product/type';

export interface ProductSearchQuery extends Query {

    filter?: ProductSearchFilter;

    sort?: ProductSort;

}

export interface ProductSearchFilter {

    keyword?: string;

    categorySlugs?: readonly string[];

    minPrice?: number;

    maxPrice?: number;

    inStock?: boolean;

    status?: ProductStatus[];

}


export interface ProductSearchResult {

    items: readonly ProductSummary[];

    total: number;

    page: number;

    pageSize: number;

    totalPages: number;

}
