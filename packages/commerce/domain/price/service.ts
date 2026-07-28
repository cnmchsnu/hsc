import { Price } from './type';

import { PriceList } from './list';
import { PriceQuery } from './query';
import { CreatePrice } from './create';
import { UpdatePrice } from './update';


import { PriceRepository } from './repository';

import { type CRUDService, DefaultCRUDService } from "@repo/shared/service";

export interface PriceService extends CRUDService<
    Price,
    string,
    CreatePrice,
    UpdatePrice,
    PriceQuery,
    PriceList
> {


    getBySKUId(skuId: string): Promise<readonly Price[]>;

    getManyBySKUIds(skuIds: readonly string[]): Promise<readonly Price[]>;

    validateEffectivePeriod(
        price: CreatePrice,
    ): Promise<void>;

    validateCurrency(
        currency: string,
    ): Promise<void>;

}


class DefaultPriceService
    extends DefaultCRUDService<
        Price,
        string,
        CreatePrice,
        UpdatePrice,
        PriceQuery,
        PriceList,
        PriceRepository
    >
    implements PriceService {

    constructor(
        protected readonly repository: PriceRepository,
    ) {
        super(repository);
    }

    async getBySKUId(
        skuId: string,
    ): Promise<readonly Price[]> {
        return this.repository.getBySKUId(skuId);
    }

    async getManyBySKUIds(
        skuIds: readonly string[],
    ): Promise<readonly Price[]> {
        return this.repository.getManyBySKUIds(skuIds);
    }


    async validateEffectivePeriod(
        price: CreatePrice,
    ): Promise<void> {

        // TODO:
        // Prevent overlapping effective periods
        // for the same SKU + Currency.

    }

    async validateCurrency(
        currency: string,
    ): Promise<void> {

        // TODO:
        // Validate that the currency is a valid ISO 4217 currency code.
        // This could be done by checking against a list of valid currency codes.

    }

}

export function createPriceService(
    repository: PriceRepository,
): PriceService {

    return new DefaultPriceService(repository);

}