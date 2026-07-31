"use server";

import { rebuildSKU } from "@repo/commerce/server";

import type { SKUDetail, VariantDetail } from "@repo/commerce/application";

import type { Product } from "@repo/commerce/domain";

export async function rebuildSKUAction({ current, desired, product }: {
    current: readonly SKUDetail[],
    desired: readonly VariantDetail[],
    product: Product,
}) {
    return await rebuildSKU(
        current,
        desired,
        product,
        false
    );
}