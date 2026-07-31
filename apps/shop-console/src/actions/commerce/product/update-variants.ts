"use server";

import { updateVariant } from "@repo/commerce/server";

import type { ProductVariantWorkflowInput } from "@repo/commerce/application";

export async function updateVariantAction(
    input: ProductVariantWorkflowInput,
) {
    return await updateVariant(input);
}