import type { VariantOption, CreateVariantOption, UpdateVariantOption } from '../../../../../commerce/domain/variant-option';

import { RepositoryMapper } from "@repo/shared";

import { VariantOptionRow } from "../../../entities";


export const VariantOptionRepositoryMapper: RepositoryMapper<
    VariantOption,
    VariantOptionRow,
    CreateVariantOption,
    UpdateVariantOption
> = {

    fromRow(
        row: VariantOptionRow,
    ): VariantOption {
        return {
            id: row.id,

            productId: row.product_id,

            name: row.name,

            displayName: row.display_name,

            sortOrder: row.sort_order,

            version: row.version,
        };
    },
    

    fromRows(
        rows: readonly VariantOptionRow[],
    ): VariantOption[] {
        return rows.map(this.fromRow);
    },

    toCreateRow(
        dto: CreateVariantOption,
    ): Partial<VariantOptionRow> {
        return {

            product_id: dto.productId,

            name: dto.name,

            display_name: dto.displayName,

            sort_order: dto.sortOrder ?? 0,
        };
    },

    toCreateRows(
        dto: readonly CreateVariantOption[],
    ): Partial<VariantOptionRow>[] {
        return dto.map(this.toCreateRow);
    },

    toUpdateRow(
        dto: UpdateVariantOption,
    ): Partial<VariantOptionRow> {
        return {

            id: dto.id,

            display_name: dto.displayName,

            sort_order: dto.sortOrder,

            version: dto.version,
        };

    },

    toUpdateRows(
        dto: readonly UpdateVariantOption[],
    ): Partial<VariantOptionRow>[] {
        return dto.map(this.toUpdateRow);
    }

}

