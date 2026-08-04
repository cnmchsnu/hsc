import { createCommerceContainer } from '../../container';

import type { Product } from "../../domain";
import { SKUDetail, VariantDetail } from "../../application";


export async function rebuildSKU(
    current: readonly SKUDetail[],
    desired: readonly VariantDetail[],
    product: Product,
    includeDisabled?: boolean,
): Promise<SKUDetail[]> {

    const {
        productManageContainer,
    } = await createCommerceContainer();

    return productManageContainer.skuRebuilder.build({
        current,
        desired,
        product,
        includeDisabled
    })

    
}