import type { Product } from '../types';
import { ProductRepository } from '@repo/database/product';
import { ProductNotFoundError } from './errors';

export interface ProductService {

    getById(
        id: string,
    ): Promise<Product>;

    // getBySlug(
    //     slug: string,
    // ): Promise<Product>;

    // list(): Promise<Product[]>;

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

        // async getBySlug(slug) {

        //     const product =
        //         await repository.findBySlug(slug);

        //     if (!product) {
        //         throw new ProductNotFoundError(slug);
        //     }

        //     return product;
        // },

        // async list() {

        //     return repository.list();

        // },

    };

}