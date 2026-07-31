



import type { ProductManageDetail } from "@repo/commerce/application";
import { getProductDetailAction } from "@/actions/commerce";

type Params = Promise<{ id: string }>;

interface PageProps {
  params: Params;
}

import { ProductDetailContent as Page } from "./pageClient";
import { notFound } from "next/navigation";


export default async function ProductDetailContent({ params }: PageProps) {
    const { id } = await params;

    let productDetail: ProductManageDetail = {
        product: {
        id: "",
        name: "",
        slug: "",
        description: "",
        status: "draft",
        },
        categories: [],
        images: [],
        breadcrumb: [],
        variantDetails: [],
        skuDetails: []
    };

    if (id !== "new") {
        productDetail = await getProductDetailAction(id);
        if (!productDetail) {
            notFound();
        }
    }

    return (
        <Page productDetail={productDetail} />
    );
}
