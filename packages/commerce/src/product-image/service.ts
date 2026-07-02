import type { ProductImage } from './product-image';
import { ProductImageRepository } from '@repo/database/product-image';


export interface ProductImageService {

    getById(
        id: string,
    ): Promise<ProductImage | null>;

    listByProductId(
        productId: string,
    ): Promise<ProductImage[]>;

    getThumbnail(
        productId: string,
    ): Promise<ProductImage | null>;

    getPrimary(
        productId: string,
    ): Promise<ProductImage | null>;

    listByProductIds(
        ids: string[],
    ): Promise<Map<string, readonly ProductImage[]>>;

    listThumbnails(
        productIds: string[],
    ): Promise<Map<string, ProductImage>>;

    // findByStorageKey(
    //     storageKey: string,
    // );

    // replaceProductImages();

    // reorderImages();

    // setPrimaryImage();

    // setThumbnail();

    // removeImage();

}

export function createProductImageService(
    repository: ProductImageRepository,
): ProductImageService {
    return {

        async getById(id) {

            const image = 
                await repository.get_by_id(id);

            if (!image) {
                return null;
            }

            return image;
        },

        async listByProductId(productId) {
            const images = 
                await repository.list_by_product_id(productId);

            if (!images) {
                return [];
            }

            return images;
        },

        async getThumbnail(productId) {

            const thumbnail = 
                await repository.get_thumbnail(productId);

            if (!thumbnail) {
                return null;
            }

            return thumbnail;
        },

        async getPrimary(productId) {

            const primary = 
                await repository.get_primary(productId);
            
            if (!primary) {
                return null;
            }

            return primary;
        },

        async listByProductIds(ids) {

            const images = 
                await repository.list_by_product_ids(ids);
            
            if (!images) {
                return new Map();
            }

            return images;
        },

        async listThumbnails(productIds) {

            const thumbnails = 
                await repository.list_thumbnails(productIds);

            if (!thumbnails) {
                return new Map();
            }

            return thumbnails;
        }

    }
}



