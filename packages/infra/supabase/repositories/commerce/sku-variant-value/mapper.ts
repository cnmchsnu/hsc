import type { SKUVariantValueRow } from "../../../entities";
import type { SKUVariantValue, CreateSKUVariantValue } from "../../../../../commerce/domain/sku-variant-value";


export const SKUVariantValueRepositoryMapper = {

    fromRow(
        row: SKUVariantValueRow,
    ): SKUVariantValue {
        return {
            skuId: row.sku_id,

            optionValueId: row.option_value_id,
        };
    },

    fromRows(
        rows: readonly SKUVariantValueRow[],
    ): SKUVariantValue[] {
        return rows.map(this.fromRow);
    },

    toCreateRow(
        dto: CreateSKUVariantValue,
    ): Partial<SKUVariantValueRow> {
        return {
            sku_id: dto.skuId,
            option_value_id: dto.optionValueId,
        };
    },

    toCreateRows(
        dtos: readonly CreateSKUVariantValue[],
    ): Partial<SKUVariantValueRow>[] {
        return dtos.map(this.toCreateRow);
    }

};