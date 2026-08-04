"use server";

import { updateImages } from "@repo/commerce/server";

import type { ProductImageEditor } from "@repo/commerce/application";

export async function updateImagesAction(
    input: ProductImageEditor,
) {
    return await updateImages(input);
}