"use server";

import { updateProduct } from "@repo/commerce/server";

import type { ProductEditor } from "@repo/commerce/application";

export async function updateProductAction(
    input: ProductEditor,
) {
    return await updateProduct(input);
}