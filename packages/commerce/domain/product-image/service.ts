import type { ProductImage } from './type';
import{ CreateProductImage } from './create';
import { UpdateProductImage } from './update';
import { ProductImageRepository } from './repository';


import { type CRUDService, DefaultCRUDService } from "@repo/shared/service";

export interface ProductImageService extends CRUDService<
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

class DefaultProductImageService
    extends DefaultCRUDService<
        ProductImage,
        string,
        CreateProductImage,
        UpdateProductImage,
        any,
        any,
        ProductImageRepository
    >
    implements ProductImageService {

    constructor(
        protected readonly repository: ProductImageRepository,
    ) {
        super(repository);
    }

    // Read Single

    async getPrimaryById(
        productId: string,
    ): Promise<ProductImage | null> {

        const productImage = 
            await this.repository.getPrimaryById(productId);

        if (!productImage) return null;
            
        return productImage;
       
    }

    async getThumbnailById(
        productId: string,
    ): Promise<ProductImage | null> {

        const productImage = 
            await this.repository.getThumbnailById(productId);
            
        if (!productImage) return null;

        return productImage;
    }

    async getAllById(
        productId: string,
    ): Promise<readonly ProductImage[] | null> {

        if (!productId) return null;

        const productImages =
            await this.repository.getAllById(productId);

        if (!productImages) return null;

        return productImages;
    }

    // Read Batch

    async getPrimaryByIds(
        productIds: readonly string[],
    ): Promise<readonly ProductImage[]> {
        
        const productImages =
            await this.repository.getPrimaryByIds(productIds);
        
        if (!productImages) return [];

        return productImages;
    }

    async getThumbnailByIds(
        productIds: readonly string[],
    ): Promise<readonly ProductImage[]> {
        const productImages =
            await this.repository.getThumbnailByIds(productIds);
        
        if (!productImages) return [];

        return productImages;
    }

}



export function createProductImageService(
    repository: ProductImageRepository,
): ProductImageService {
    return new DefaultProductImageService(repository);
}