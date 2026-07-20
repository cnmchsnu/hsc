import { VariantOptionValue } from './type';
import { VariantOptionValueQuery } from './query';
import { VariantOptionValueList } from './list';
import { CreateVariantOptionValue } from './create';
import { UpdateVariantOptionValue } from './update';
import { VariantOptionValueRepository } from './repository';


export interface VariantOptionValueService {

    get(id: string): Promise<VariantOptionValue | null>;

    getByOptions(
        optionIds: readonly string[],
    ): Promise<readonly VariantOptionValue[]>;

    getMany(ids: readonly string[]): Promise<readonly VariantOptionValue[]>;

    find(query: VariantOptionValueQuery): Promise<VariantOptionValueList>;

    create(create: CreateVariantOptionValue): Promise<void>;

    update(update: UpdateVariantOptionValue): Promise<void>;

    delete(id: string): Promise<void>;

    createMany(
        options: readonly CreateVariantOptionValue[],
    ): Promise<void>;

    updateMany(
        options: readonly UpdateVariantOptionValue[],
    ): Promise<void>;

    deleteMany(ids: readonly string[]): Promise<void>;

    exists(
        optionId: string,
        value: string,
    ): Promise<boolean>;

    validateValue(
        optionId: string,
        value: string,
    ): Promise<void>;

}


export function createVariantOptionValueService(
    repository: VariantOptionValueRepository,
): VariantOptionValueService {
    return {

        async get(
            id: string,
        ): Promise<VariantOptionValue | null> {
            const variantOptionValue = await repository.get(id);

            if (!variantOptionValue) {
                return null;
            }

            return variantOptionValue;
        },

        async getByOptions(
            optionIds: readonly string[],
        ): Promise<readonly VariantOptionValue[]> {
            const variantOptionValues = await repository.getByOptions(optionIds);

            return variantOptionValues;

        },

        async getMany(
            ids: readonly string[],
        ): Promise<readonly VariantOptionValue[]> {
            const variantOptionValues = await repository.getByOptions(ids);

            return variantOptionValues;

        },

        async find(
            query: VariantOptionValueQuery,
        ): Promise<VariantOptionValueList> {
            const variantOptionValues = await repository.find(query);

            return variantOptionValues;
        },

        async create(
            create: CreateVariantOptionValue,
        ): Promise<void> {
            await this.validateValue(create.optionId, create.value);
            return await repository.create(create);
        },

        async update(
            update: UpdateVariantOptionValue,
        ): Promise<void> {
            await this.validateValue(update.id, update.displayValue ?? '');
            await repository.update(update);
        },

        async delete(
            id: string,
        ): Promise<void> {
            await repository.delete(id);
        },

        async exists(
            optionId: string,
            value: string,
        ): Promise<boolean> {
            const exists = await repository.exists(optionId, value);

            return exists;

        },

        async validateValue(
            optionId: string,
            value: string,
        ): Promise<void> {
            const exists = await repository.exists(optionId, value);

            if (exists) {
                throw new Error(`Variant option value "${value}" already exists for option "${optionId}"`);
            }

        },

        async createMany(
            options: readonly CreateVariantOptionValue[],
        ): Promise<void> {
            await repository.createMany(options);
        },


        async updateMany(
            options: readonly UpdateVariantOptionValue[],
        ): Promise<void> {
            await repository.updateMany(options);
        },


        async deleteMany(
            ids: readonly string[],
        ): Promise<void> {
            await repository.deleteMany(ids);
        }


    };
}


