import { Price } from './type';

import { PriceList } from './list';
import { PriceQuery } from './query';
import { CreatePrice } from './create';
import { UpdatePrice } from './update';


import { PriceRepository } from './repository';
import {
    PriceNotFoundException,
    PriceCreateFailedException
} from './error';


export interface PriceService {

    get(id: string): Promise<Price | null>;

    getMany(ids: readonly string[]): Promise<readonly Price[]>;

    getBySKUId(skuId: string): Promise<readonly Price[]>;

    getManyBySKUIds(skuIds: readonly string[]): Promise<readonly Price[]>;

    find(query: PriceQuery): Promise<PriceList>;

    create(create: CreatePrice): Promise<Price>;

    update(update: UpdatePrice): Promise<Price>;

    delete(id: string): Promise<void>;

    validateEffectivePeriod(
        price: CreatePrice,
    ): Promise<void>;

    validateCurrency(
        currency: string,
    ): Promise<void>;

}


class DefaultPriceService
    implements PriceService {

    constructor(
        private readonly repository: PriceRepository,
    ) {}

    async get(
        id: string,
    ): Promise<Price | null> {

        return this.repository.get(id);

    }

    async getMany(
        ids: readonly string[],
    ): Promise<readonly Price[]> {

        return this.repository.getMany(ids);

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

    async find(
        query: PriceQuery,
    ): Promise<PriceList> {

        return this.repository.find(query);

    }

    async create(
        create: CreatePrice,
    ): Promise<Price> {

        await this.validateEffectivePeriod(create);

        await this.repository.create(create);

        const created =
            await this.repository.get(create.skuId);

        if (!created) {
            throw new PriceCreateFailedException(create.skuId);
        }

        return created;

    }

    async update(
        update: UpdatePrice,
    ): Promise<Price> {

        await this.repository.update(update);

        const updated =
            await this.repository.get(update.id);

        if (!updated) {
            throw new PriceNotFoundException(update.id);
        }

        return updated;

    }

    async delete(
        id: string,
    ): Promise<void> {

        await this.repository.delete(id);

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