"use server";

import { getProductManageDetail } from "@repo/commerce/server";


import { ProductManageDetail } from "@repo/commerce/application";

import { notFound } from "next/navigation";



export async function getProductDetailAction(
    id: string,
): Promise<ProductManageDetail> {
    try {
       return await getProductManageDetail(id);
    } catch (error) {
        console.error("Error fetching product detail:", error);
        notFound();
    }


}