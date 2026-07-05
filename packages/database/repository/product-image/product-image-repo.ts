import type { ProductImage } from "../../../commerce/domain/product-image";

export interface ProductImageRepository {

    get_by_id(
        id: string,
    ): Promise<ProductImage | null>;

    list_by_product_id(
        productId: string,
    ): Promise<ProductImage[]>;

    get_thumbnail(
        productId: string,
    ): Promise<ProductImage | null>;

    get_primary(
        productId: string,
    ): Promise<ProductImage | null>;

    list_by_product_ids(
        ids: string[],
    ): Promise<
        Map<
            string,
            ProductImage[]
        >
    >;

    list_thumbnails(
        productIds: string[],
    ): Promise<
        ReadonlyMap<
            string,
            ProductImage
        >
    >;

    // find_by_storage_key(
    //     storageKey: string,
    // );

    // replace_productImages();

    // reorder_images();

    // set_primaryImage();

    // set_thumbnail();

    // remove_image();


}