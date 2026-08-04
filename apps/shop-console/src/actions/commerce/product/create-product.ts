"use server";

import { createProduct } from "@repo/commerce/server";

import type { ProductEditor } from "@repo/commerce/application";

export async function createProductAction(
    input: ProductEditor,
) {
    return await createProduct(input);
}