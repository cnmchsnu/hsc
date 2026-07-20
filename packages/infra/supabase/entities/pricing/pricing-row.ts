export interface PriceRow {

    id: string;

    sku_id: string;

    currency: string;

    amount: number;

    compare_at: number | null;

    cost: number | null;

    effective_from: string | null;

    effective_to: string | null;

    version: number;

    created_at: string;

    updated_at: string;

}