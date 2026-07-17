import type { Product, ProductList, ProductListOptions } from './type';
import { ProductRepository } from "./repository";
import { ProductNotFoundError } from './error';

    
export interface ProductService {

    // Read Single
    findById(
        id: string,
    ): Promise<Product | null>;

    findBySlug(
        slug: string,
    ): Promise<Product | null>;


    // Read Batch

    findByIds(
        ids: readonly string[],
    ): Promise<readonly Product[]>;

    findBySlugs(
        slugs: readonly string[],
    ): Promise<readonly Product[]>;


    // Query

    list(): Promise<readonly Product[]>;

    search(
        options: ProductListOptions,
    ): Promise<ProductList>;


    // Exists Single

    exists(
        id: string,
    ): Promise<boolean>;

    
    // Exists Batch

    listExistingIds(
        ids: readonly string[],
    ): Promise<readonly string[]>;

    listExistingSlugs(
        slugs: readonly string[],
    ): Promise<readonly string[]>;


    // Write Single

    create(
        product: Product,
    ): Promise<void>;

    update(
        product: Product,
    ): Promise<void>;

    delete(
        id: string,
    ): Promise<void>;


    // Write Batch

    createMany(
        products: readonly Product[],
    ): Promise<void>;

    updateMany(
        products: readonly Product[],
    ): Promise<void>;

    deleteMany(
        ids: readonly string[],
    ): Promise<void>;
}


export function createProductService(
    repository: ProductRepository,
): ProductService {

    return {

        // Read Single

        async findById(
            id: string,
        ): Promise<Product | null> {
            if (!id) {
                return null;
            }

            const product = 
                await repository.get(id);

            if (!product) {
                throw new ProductNotFoundError(
                    `Product with id ${id} not found`,
                );
            }

            return product;
        },

        async findBySlug(
            slug: string,
        ): Promise<Product | null> {
            if (!slug) {
                return null;
            }

            const product = 
                await repository.findBySlug(slug);

            if (!product) {
                throw new ProductNotFoundError(
                    `Product with slug ${slug} not found`,
                );
            }

            return product;
        },

        // Read Batch

        async findByIds(
            ids: readonly string[],
        ): Promise<readonly Product[]> {
            if (!ids || ids.length === 0) {
                return [];
            }

            const products = 
                await repository.getMany(ids);
            
            if (!products || products.length === 0) {
                throw new ProductNotFoundError(
                    `Products with ids ${ids.join(', ')} not found`,
                );
            }

            return products;
        },

        async findBySlugs(
            slugs: readonly string[],
        ): Promise<readonly Product[]> {
            if (!slugs || slugs.length === 0) {
                return [];
            }

            const products = 
                await repository.findBySlugs(slugs);

            if (!products || products.length === 0) {
                throw new ProductNotFoundError(
                    `Products with slugs ${slugs.join(', ')} not found`,
                );
            }

            return products;
        },

        // Query

        async list(): Promise<Product[]> {
            const products = 
                await repository.list();

            return products;
        },

        async search(
            options: ProductListOptions,
        ): Promise<ProductList> {
            const products = 
                await repository.find(options);

            return products;
        },

        // Exists Single

        async exists(
            id: string,
        ): Promise<boolean> {
            if (!id) {
                return false;
            }

            const exists = 
                await repository.exists(id);

            return exists;
        },

        // Exists Batch

        async listExistingIds(
            ids: readonly string[],
        ): Promise<readonly string[]> {
            if (!ids || ids.length === 0) {
                return [];
            }
            const existingIds = 
                await repository.listExisting(ids);

            return existingIds;
        },

        async listExistingSlugs(
            slugs: readonly string[],
        ): Promise<readonly string[]> {
            if (!slugs || slugs.length === 0) {
                return [];
            }
            const existingSlugs = 
                await repository.listExistingSlugs(slugs);
            
            return existingSlugs;
        },

        // Write Single

        async create(
            product: Product,
        ): Promise<void> {
            await repository.create(product);
        },

        async update(
            product: Product,
        ): Promise<void> {
            await repository.update(product);
        },

        async delete(
            id: string,
        ): Promise<void> {
            await repository.delete(id);
        },

        // Write Batch

        async createMany(
            products: readonly Product[],
        ): Promise<void> {
            await repository.createMany(products);
        },

        async updateMany(
            products: readonly Product[],
        ): Promise<void> {
            await repository.updateMany(products);
        },

        async deleteMany(
            ids: readonly string[],
        ): Promise<void> {
            await repository.deleteMany(ids);
        }
    
    };

}