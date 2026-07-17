export interface UpdatePrice {

    id: string;

    currency: string;

    amount: number;

    compareAt?: number | null;

    cost?: number | null;

    effectiveFrom?: Date | null;

    effectiveTo?: Date | null;

    version: number;

}