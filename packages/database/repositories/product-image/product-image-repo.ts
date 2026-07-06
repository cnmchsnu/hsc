import type { ProductImage } from "../../../commerce/domain/product-image";

export interface ProductImageRepository {

    // Read Single

    getPrimaryById(
        productId: string,
    ): Promise<ProductImage | null>;

    getThumbnailById(
        productId: string,
    ): Promise<ProductImage | null>;

    getAllById(
        productId: string,
    ): Promise<ProductImage[] | null>;


    // Read Batch

    getPrimaryByIds(
        productIds: readonly string[],
    ): Promise<ProductImage[]>;
    
    getThumbnailByIds(
        productIds: readonly string[],
    ): Promise<ProductImage[]>;

    // Exists Single

    existsIds(
        id: string,
    ): Promise<boolean>;


    // Exists Batch

    listExistingIds(
        ids: readonly string[],
    ): Promise<string[]>;


    // Write Single

    create(
        productImage: ProductImage,
    ): Promise<void>;

    update(
        productImage: ProductImage,
    ): Promise<void>;

    delete(
        id: string,
    ): Promise<void>;
    

    // Write Batch

    createMany(
        productImages: readonly ProductImage[],
    ): Promise<void>;

    updateMany(
        productImages: readonly ProductImage[],
    ): Promise<void>;

    deleteMany(
        ids: readonly string[],
    ): Promise<void>;

}