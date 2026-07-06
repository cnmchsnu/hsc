import type { ProductImage } from './type.ts';
import { ProductImageRepository } from '@repo/database/repositories';


export interface ProductImageService {

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

export function createProductImageService(
    repository: ProductImageRepository,
): ProductImageService {
    return {

        // Read Single

        async getPrimaryById(
            productId: string,
        ): Promise<ProductImage | null> {

            const productImage = 
                await repository.getPrimaryById(productId);

            if (!productImage) {
                return null;
            }
            
            return productImage;
           
        },

        async getThumbnailById(
            productId: string,
        ): Promise<ProductImage | null> {

            const productImage = 
                await repository.getThumbnailById(productId);
            
            if (!productImage) {
                return null;
            }

            return productImage;
        },

        async getAllById(
            productId: string,
        ): Promise<ProductImage[] | null> {

            if (!productId) {
                return null;
            }

            const productImages =
                await repository.getAllById(productId);

            if (!productImages) {
                return null;
            }

            return productImages;
        },

        // Read Batch

        async getPrimaryByIds(
            productIds: readonly string[],
        ): Promise<ProductImage[]> {
            
            const productImages =
                await repository.getPrimaryByIds(productIds);
            
            if (!productImages) {
                return [];
            }

            return productImages;
        },

        async getThumbnailByIds(
            productIds: readonly string[],
        ): Promise<ProductImage[]> {
            const productImages =
                await repository.getThumbnailByIds(productIds);

            if (!productImages) {
                return [];
            }

            return productImages;
        },

        // Exists Single

        async existsIds(
            id: string,
        ): Promise<boolean> {
            return await repository.existsIds(id);
        },

        // Exists Batch

        async listExistingIds(
            ids: readonly string[],
        ): Promise<string[]> {
            return await repository.listExistingIds(ids);
        },

        // Write Single

        async create(
            productImage: ProductImage,
        ): Promise<void> {
            await repository.create(productImage);
        },

        async update(
            productImage: ProductImage,
        ): Promise<void> {
            await repository.update(productImage);
        },

        async delete(
            id: string,
        ): Promise<void> {
            await repository.delete(id);
        },

        // Write Batch

        async createMany(
            productImages: readonly ProductImage[],
        ): Promise<void> {
            await repository.createMany(productImages);
        },

        async updateMany(
            productImages: readonly ProductImage[],
        ): Promise<void> {
            await repository.updateMany(productImages);
        },

        async deleteMany(
            ids: readonly string[],
        ): Promise<void> {
            await repository.deleteMany(ids);
        }

    }
}



