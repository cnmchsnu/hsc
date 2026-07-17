import type { VariantOption, VariantOptionName, } from './type';
import type { VariantOptionQuery } from './query';
import type { VariantOptionList } from './list';
import type { CreateVariantOption } from './create';
import type { UpdateVariantOption } from './update';

import { VariantOptionRepository } from './repository';

export interface VariantOptionService {

    get(id: string): Promise<VariantOption | null>;

    getMany(ids: readonly string[]): Promise<readonly VariantOption[]>;

    getByProduct( productId: string, ): Promise<readonly VariantOption[]>;

    find(query: VariantOptionQuery): Promise<VariantOptionList>;

    create(create: CreateVariantOption): Promise<void>;

    createMany( options: readonly CreateVariantOption[] ): Promise<void>;

    update(update: UpdateVariantOption): Promise<void>;

    updateMany( options: readonly UpdateVariantOption[],): Promise<void>;

    delete(id: string): Promise<void>;

    deleteMany(ids: readonly string[]): Promise<void>;

    exists(
        productId: string,
        name: VariantOptionName,
    ): Promise<boolean>;

    validateName(
        productId: string,
        name: VariantOptionName,
    ): Promise<void>;

}

export function createVariantOptionService(
    repository: VariantOptionRepository,
): VariantOptionService {
    return {

        async get(
            id: string,
        ): Promise<VariantOption | null> {

            const variantOption = await repository.get(id); 

            if (!variantOption) {
                return null;
            }

            return variantOption;
        },

        async getMany(
            ids: readonly string[],
        ): Promise<readonly VariantOption[]> {

            if (ids.length === 0) {
                return [];
            }

            const variantOptions = await repository.getMany(ids);

            return variantOptions;
        },

        async getByProduct(
            productId: string,
        ): Promise<readonly VariantOption[]> {
            const variantOptions = await repository.getByProduct(productId);

            return variantOptions;
        },

        async find(
            query: VariantOptionQuery,
        ): Promise<VariantOptionList> {
            const variantOptions = await repository.find(query);

            return variantOptions;
        },

        async create(
            create: CreateVariantOption,
        ): Promise<void> {
            await this.validateName(create.productId, create.name);

            await repository.create(create);

        },

        async createMany(
            options: readonly CreateVariantOption[],
        ): Promise<void> {
            if (options.length === 0) {
                return;
            }

            await repository.createMany(options);

        },

        async update(
            update: UpdateVariantOption,
        ): Promise<void> {
            return await repository.update(update);

        },

        async updateMany(
            options: readonly UpdateVariantOption[],
        ): Promise<void> {
            if (options.length === 0) {
                return;
            }

            return await repository.updateMany(options);

        },

        async delete(
            id: string,
        ): Promise<void> {
            await repository.delete(id);
        },

        async deleteMany(
            ids: readonly string[],
        ): Promise<void> {
            if (ids.length === 0) {
                return;
            }

            await repository.deleteMany(ids);
        },

        async exists(
            productId: string,
            name: VariantOptionName,
        ): Promise<boolean> {
            const exists = await repository.exists(productId, name);

            return exists;
        },

        async validateName(
            productId: string,
            name: VariantOptionName,
        ): Promise<void> {
            const exists = await this.exists(productId, name);

            if (exists) {
                throw new Error(`Variant option with name "${name}" already exists for product "${productId}".`);
            }
        }
    };
}