export interface CreatePrice {

    skuId: string;

    currency: string;

    amount: number;

    compareAt?: number | null;

    cost?: number | null;

    effectiveFrom?: Date | null;

    effectiveTo?: Date | null;

}

export interface CommandCreatePrice {

    currency: string;

    amount: number;

    compareAt?: number | null;

    cost?: number | null;

    effectiveFrom?: Date | null;

    effectiveTo?: Date | null;

}