import { Repository } from '@repo/shared';

import { UpdateSKU } from './update';
import { CreateSKU } from './create';

import { SKU } from './type';
import { SKUQuery } from './query';
import { SKUList } from './list';

export interface SKURepository
    extends Repository<
        SKU,
        string,
        CreateSKU,
        UpdateSKU,
        SKUQuery,
        SKUList
        > {


    getByCode(
        code: string
    ): Promise<SKU | null>;

    existsByCode(
        code: string
    ): Promise<boolean>;

    listExistingCode(
        codes: readonly string[]
    ): Promise<readonly string[]>;

    getByProduct(
        productId: string
    ): Promise<readonly SKU[]>;

    getByProducts(
        productIds: readonly string[]
    ): Promise<readonly SKU[]>;

    findActive(): Promise<readonly SKU[]>;


}
