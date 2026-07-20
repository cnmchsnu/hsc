import type {
    VariantOptionValue,
    CreateVariantOptionValue,
    UpdateVariantOptionValue
} from "../../../../../commerce/domain/variant-option-value";

import { RepositoryMapper } from "@repo/shared";

import { VariantOptionValueRow } from "../../../entities";


export const VariantOptionValueRepositoryMapper: RepositoryMapper<
    VariantOptionValue,
    VariantOptionValueRow,
    CreateVariantOptionValue,
    UpdateVariantOptionValue
> = {

    fromRow(
        row: VariantOptionValueRow,
    ): VariantOptionValue {
        return {
            id: row.id,

            optionId: row.option_id,

            value: row.value,

            value_name: row.value_name,

            displayValue: row.display_value,

            sortOrder: row.sort_order,

            version: row.version,
        };
    },

    fromRows(
        rows: readonly VariantOptionValueRow[],
    ): VariantOptionValue[] {
        return rows.map(this.fromRow);
    },

    toCreateRow(
        dto: CreateVariantOptionValue,
    ): Partial<VariantOptionValueRow> {
        return {

            option_id: dto.optionId,

            value: dto.value,

            value_name: dto.valueName,

            display_value: dto.displayValue,

            sort_order: dto.sortOrder ?? 0,
        };
    },

    toCreateRows(
        dto: readonly CreateVariantOptionValue[],
    ): Partial<VariantOptionValueRow>[] {
        return dto.map(this.toCreateRow);
    },

    toUpdateRow(
        dto: UpdateVariantOptionValue,
    ): Partial<VariantOptionValueRow> {
        return {

            id: dto.id,

            display_value: dto.displayValue,

            sort_order: dto.sortOrder,

            version: dto.version,
        };
    },

    toUpdateRows(
        dto: readonly UpdateVariantOptionValue[],
    ): Partial<VariantOptionValueRow>[] {
        return dto.map(this.toUpdateRow);
    }
    
    
}
