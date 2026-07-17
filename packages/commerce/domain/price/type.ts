export interface Price {

    id: string;

    skuId: string;

    amount: number;

    currency: string;

    compareAt: number | null;
    
    cost: number | null;

    effectiveFrom: Date;

    effectiveTo: Date | null;

    version: number;

}
