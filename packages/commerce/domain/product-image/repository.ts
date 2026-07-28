import type { ProductImage } from "./type";
import type { CreateProductImage } from "./create";
import type { UpdateProductImage } from "./update";

import type { Repository } from "@repo/shared";

export interface ProductImageRepository
    extends Repository<
        ProductImage,
        string,
        CreateProductImage,
        UpdateProductImage,
        any,
        any
    > {

    // Read Single

    getPrimaryById(
        productId: string,
    ): Promise<ProductImage | null>;

    getThumbnailById(
        productId: string,
    ): Promise<ProductImage | null>;

    getAllById(
        productId: string,
    ): Promise<readonly ProductImage[] | null>;


    // Read Batch

    getPrimaryByIds(
        productIds: readonly string[],
    ): Promise<readonly ProductImage[]>;
    
    getThumbnailByIds(
        productIds: readonly string[],
    ): Promise<readonly ProductImage[]>;
}