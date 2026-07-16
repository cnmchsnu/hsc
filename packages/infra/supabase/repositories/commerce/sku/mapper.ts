import { SKU, CreateSKU, UpdateSKU } from "../../../../../commerce/domain/sku";
import type { SKURow } from "../../../entities";

import { RepositoryMapper } from "@repo/shared";

export const SKURepositoryMapper: RepositoryMapper<
    SKU,
    SKURow,
    CreateSKU,
    UpdateSKU
> = {

    fromRow(
        row: SKURow,
    ): SKU {
        return {
            id: row.id,

            productId: row.product_id,

            code: row.code,

            barcode: row.barcode,

            status: row.status,

            version: row.version,
        };
    },

    fromRows(
        rows: readonly SKURow[],
    ): SKU[] {
        return rows.map(this.fromRow);
    },

    toCreateRow(
        dto: CreateSKU,
    ): Partial<SKURow> {
        return {
            product_id: dto.productId,

            code: dto.code,

            barcode: dto.barcode ?? null,

            status: dto.status,
        };
    },


    toCreateRows(
        dto: readonly CreateSKU[],
    ): Partial<SKURow>[] {
        return dto.map(this.toCreateRow);
    },

    toUpdateRow(
        dto: UpdateSKU,
    ): Partial<SKURow> {
        return {
            id: dto.id,

            code: dto.code,

            barcode: dto.barcode ?? null,

            status: dto.status,
        };
    },


    toUpdateRows(
        dto: readonly UpdateSKU[],
    ): Partial<SKURow>[] {
        return dto.map(this.toUpdateRow);
    },

}


            