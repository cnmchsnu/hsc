
import { SKUVariantValue } from "./type";
import { CreateSKUVariantValue } from "./create";

export interface SKUVariantValueRepository {

    getBySKU(
        skuId: string,
    ): Promise<readonly SKUVariantValue[]>;

    getBySKUs(
        skuIds: readonly string[],
    ): Promise<readonly SKUVariantValue[]>;

    replace(
        skuId: string,
        values: readonly CreateSKUVariantValue[],
    ): Promise<void>;

    deleteBySKU(
        skuId: string,
    ): Promise<void>;

}