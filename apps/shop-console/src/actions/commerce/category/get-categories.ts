"use server";

import { getCategories } from "@repo/commerce/server";
import { Category } from "@repo/commerce/domain";


export async function getCategoriesAction(
): Promise<Category[]> {
    const categories = await getCategories();
    if (!categories) return [];
    return [...categories];
}