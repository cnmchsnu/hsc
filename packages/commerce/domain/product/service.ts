import type { Product, ProductList, ProductListOptions } from './type';
import { ProductRepository } from '@repo/database/repositories';
import { ProductNotFoundError } from './error';

    
export interface ProductService {

    getById(
        id: string,
    ): Promise<Product>;

    getBySlug(
        slug: string,
    ): Promise<Product>;

    list(
        options: ProductListOptions,
    ): Promise<ProductList>;

    // create(): Promise<Product>;

    // update(
    //     id: string,
    // ): Promise<Product>;

    // delete(
    //     id: string,
    // ): Promise<void>;

    // exists(
    //     id: string,
    // ): Promise<boolean>;
}


export function createProductService(
    repository: ProductRepository,
): ProductService {

    return {

        async getById(id) {

            const product =
                await repository.findById(id);

            if (!product) {
                throw new ProductNotFoundError(id);
            }

            return product;
        },

        async getBySlug(slug) {

            const product =
                await repository.findBySlug(slug);

            if (!product) {
                throw new ProductNotFoundError(slug);
            }

            return product;
        },

        async list(
            options: ProductListOptions
        ) {

            const list =
                 await repository.list(options);

            if (!list) {
                throw new ProductNotFoundError(`No products found with the given options: ${JSON.stringify(options)}`);
            }

            return list;

        }
    
    };

}