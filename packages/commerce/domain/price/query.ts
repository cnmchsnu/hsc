import { Query } from '@repo/shared';

export type PriceSort = 
    | 'newest'
    | 'oldest'
    | 'price-asc'
    | 'price-desc'
    | 'effective_At-asc'
    | 'effective_At-desc';

export interface PriceQuery extends Query {

    skuIds?: string[];

    currency?: string;

    effectiveAt?: Date;

    sort?: PriceSort;

}