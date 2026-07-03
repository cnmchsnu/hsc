import { ProductSort } from '../../product';
import { ProductSummary } from '../read-models';

export interface ProductSearchCriteria {

    keyword?: string;

    categoryIds?: readonly string[];

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
