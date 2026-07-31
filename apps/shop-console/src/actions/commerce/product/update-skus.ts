"use server";

import { updateSkus } from "@repo/commerce/server";

import type { ProductSkuWorkflowInput } from "@repo/commerce/application";

export async function updateSkusAction(
    input: ProductSkuWorkflowInput,
) {
    return await updateSkus(input);
}