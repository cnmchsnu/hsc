import type { ProductImage } from './type.ts';
import { ProductImageRepository } from '@repo/database/repositories';


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
    ): Promise<ReadonlyMap<string, readonly ProductImage[]>>;

    listThumbnails(
        productIds: string[],
    ): Promise<ReadonlyMap<string, ProductImage>>;

    // create(): Promise<ProductImage>;

    // delete(
    //     id: string,
    // ): Promise<void>;

    // update(
    //     id: string,
    // ): Promise<ProductImage>;

    // reorder(
    //     neworder: {productId: string, imageId: string, newOrder: number}[],
    // ): Promise<void>;

    // getThumbnail(
    //     productId: string,
    // ): Promise<ProductImage | null>;

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



