import { Query } from '@repo/shared';
import { SKUStatus } from './type';


export type SKUSort =
    | 'newest'
    | 'oldest'
    | 'code-asc'
    | 'code-desc';

export interface SKUQuery extends Query {

    productId?: readonly string[];

    codes?: readonly string[];

    status?: SKUStatus[];

    sort?: SKUSort;
}
