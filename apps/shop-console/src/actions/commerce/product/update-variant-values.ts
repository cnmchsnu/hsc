"use server";

import { updateVariantValues } from "@repo/commerce/server";

import type { ProductVariantValueWorkflowInput } from "@repo/commerce/application";

export async function updateVariantValuesAction(
    input: ProductVariantValueWorkflowInput,
) {
    return await updateVariantValues(input);
}