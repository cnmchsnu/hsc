"use server";

import { checkSlugExists } from "@repo/commerce/server";


export async function checkSlugAction(
    slug: string,
): Promise<boolean> {
    return await checkSlugExists(slug);
}