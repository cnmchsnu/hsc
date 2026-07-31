"use server";

import { updateCategories } from "@repo/commerce/server";

import type { ProductCategoriesEditor } from "@repo/commerce/application";

export async function updateCategoriesAction(
    input: ProductCategoriesEditor,
) {
    return await updateCategories(input);
}