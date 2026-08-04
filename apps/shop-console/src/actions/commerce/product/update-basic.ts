"use server";

import { updateProductBasic } from "@repo/commerce/server";

import type { ProductEditorInfo } from "@repo/commerce/application";

export async function updateProductBasicAction(
    input: ProductEditorInfo,
) {
    return await updateProductBasic(input);
}