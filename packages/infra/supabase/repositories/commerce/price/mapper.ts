import { Price, CreatePrice, UpdatePrice } from "../../../../../commerce/domain/price";
import type { PriceRow } from "../../../entities";

import { RepositoryMapper } from "@repo/shared";

export const PriceRepositoryMapper: RepositoryMapper<
    Price,
    PriceRow,
    CreatePrice,
    UpdatePrice
> = {

    fromRow(
        row: PriceRow,
    ): Price {
        return {
            id: row.id,

            skuId: row.sku_id,

            currency: row.currency,

            amount: Number(row.amount),

            compareAt: row.compare_at !== null ? Number(row.compare_at) : null,

            cost: row.cost !== null ? Number(row.cost) : null,

            effectiveFrom: row.effective_from ? new Date(row.effective_from) : new Date(),

            effectiveTo: row.effective_to ? new Date(row.effective_to) : null,

            version: Number(row.version),
        };
    },

    fromRows(
        rows: readonly PriceRow[],
    ): Price[] {
        return rows.map(this.fromRow);
    },

    toCreateRow(
        dto: CreatePrice,
    ): Partial<PriceRow> {
        return {
            sku_id: dto.skuId,

            currency: dto.currency,

            amount: dto.amount,

            compare_at: dto.compareAt ?? null,

            cost: dto.cost ?? null,

            effective_from: dto.effectiveFrom ? dto.effectiveFrom.toISOString() : new Date().toISOString(),

            effective_to: dto.effectiveTo ? dto.effectiveTo.toISOString() : null,
        };
    },

    toCreateRows(
        dto: readonly CreatePrice[],
    ): Partial<PriceRow>[] {
        return dto.map(this.toCreateRow);
    },

    toUpdateRow(
        dto: UpdatePrice,
    ): Partial<PriceRow> {
        return {
            id: dto.id,

            currency: dto.currency,

            amount: dto.amount,

            compare_at: dto.compareAt ?? null,

            cost: dto.cost ?? null,

            effective_from: dto.effectiveFrom ? dto.effectiveFrom.toISOString() : undefined,

            effective_to: dto.effectiveTo ? dto.effectiveTo.toISOString() : null,

            version: dto.version,
        };
    },

    toUpdateRows(
        dto: readonly UpdatePrice[],
    ): Partial<PriceRow>[] {
        return dto.map(this.toUpdateRow);
    },

};
