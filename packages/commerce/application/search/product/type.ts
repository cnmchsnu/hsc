import { ProductSort } from '../../../domain/product';
import { ProductSummary } from '../../read/product/type';

export interface ProductSearchCriteria {

    keyword?: string;

    categorySlugs?: readonly string[];

    minPrice?: number;

    maxPrice?: number;

    inStock?: boolean;

    sort?: ProductSort;

    page: number;

    pageSize: number;

}

export interface ProductSearchResult {

    items: readonly ProductSummary[];

    total: number;

    page: number;

    pageSize: number;

    totalPages: number;

}
