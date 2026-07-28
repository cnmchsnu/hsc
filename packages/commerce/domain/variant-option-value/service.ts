import { VariantOptionValue } from './type';
import { VariantOptionValueQuery } from './query';
import { VariantOptionValueList } from './list';
import { CreateVariantOptionValue } from './create';
import { UpdateVariantOptionValue } from './update';

import { VariantOptionValueRepository } from './repository';


import { type CRUDService, DefaultCRUDService } from "@repo/shared/service";

export interface VariantOptionValueService
    extends Omit<CRUDService<
        VariantOptionValue,
        string,
        CreateVariantOptionValue,
        UpdateVariantOptionValue,
        VariantOptionValueQuery,
        VariantOptionValueList
    >, "delete" | "deleteMany"> {

    archiveMany(commands: readonly VariantOptionValue[]): Promise<void>;


    getByOptions(
        optionIds: readonly string[],
    ): Promise<readonly VariantOptionValue[]>;

    exists(
        optionId: string,
        value: string,
    ): Promise<boolean>;


}


class DefaultVariantOptionValueService
    extends DefaultCRUDService<
        VariantOptionValue,
        string,
        CreateVariantOptionValue,
        UpdateVariantOptionValue,
        VariantOptionValueQuery,
        VariantOptionValueList,
        VariantOptionValueRepository
    >
    implements VariantOptionValueService {

    constructor(
        protected readonly repository: VariantOptionValueRepository,
    ) {
        super(repository);
    }

    async archiveMany(
        commands: readonly VariantOptionValue[],
    ): Promise<void> {
        await super.updateMany(commands.map(command => ({
            id: command.id,
            isEnabled: false
        })));
    }

    async getByOptions(
        optionIds: readonly string[],
    ): Promise<readonly VariantOptionValue[]> {
        const variantOptionValues = await this.repository.getByOptions(optionIds);

        return variantOptionValues;

    }

    async exists(
        optionId: string,
        value: string,
    ): Promise<boolean> {
        const exists = await this.repository.exists(optionId, value);

        return exists;

    }
}

export function createVariantOptionValueService(
    repository: VariantOptionValueRepository,
): VariantOptionValueService {
    return new DefaultVariantOptionValueService(repository);
}