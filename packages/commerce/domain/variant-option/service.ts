import type { VariantOption, VariantOptionName, } from './type';
import type { VariantOptionQuery } from './query';
import type { VariantOptionList } from './list';
import type { CreateVariantOption } from './create';
import type { UpdateVariantOption } from './update';

import { VariantOptionRepository } from './repository';


import { type CRUDService, DefaultCRUDService } from "@repo/shared/service";

export interface VariantOptionService
    extends CRUDService<
        VariantOption,
        string,
        CreateVariantOption,
        UpdateVariantOption,
        VariantOptionQuery,
        VariantOptionList
    > {

    archiveMany(commands: readonly VariantOption[]): Promise<void>;

    getByProduct( productId: string, ): Promise<readonly VariantOption[]>;

    exists(
        productId: string,
        name: VariantOptionName,
    ): Promise<boolean>;

}

class DefaultVariantOptionService
    extends DefaultCRUDService<
        VariantOption,
        string,
        CreateVariantOption,
        UpdateVariantOption,
        VariantOptionQuery,
        VariantOptionList,
        VariantOptionRepository
    >
    implements VariantOptionService {

    constructor(
        protected readonly repository: VariantOptionRepository,
    ) {
        super(repository);
    }

    async archiveMany(
        commands: readonly VariantOption[],
    ): Promise<void> {
        await super.updateMany(commands.map(command => ({
            id: command.id,
            isEnabled: false,
        })));
    }

    async getByProduct(
        productId: string,
    ): Promise<readonly VariantOption[]> {
        const variantOptions = await this.repository.getByProduct(productId);

        return variantOptions;
    }

    async exists(
        productId: string,
        name: VariantOptionName,
    ): Promise<boolean> {
        const exists = await this.repository.exists(productId, name);

        return exists;
    }

}

export function createVariantOptionService(
    repository: VariantOptionRepository,
): VariantOptionService {
    return new DefaultVariantOptionService(repository);
}