import type { Product, ProductList, ProductListOptions } from './type';
import { CreateProduct } from './create';
import { UpdateProduct } from './update';
import { ProductRepository } from "./repository";

import { type CRUDService, DefaultCRUDService } from "@repo/shared/service";
    
export interface ProductService extends CRUDService<
    Product,
    string,
    CreateProduct,
    UpdateProduct,
    ProductListOptions,
    ProductList
> {

    // Read Single
    findBySlug(
        slug: string,
    ): Promise<Product | null>;


    // Read Batch
    findBySlugs(
        slugs: readonly string[],
    ): Promise<readonly Product[]>;


    // Query
    list(): Promise<readonly Product[]>;

    // Exists Batch
    listExistingSlugs(
        slugs: readonly string[],
    ): Promise<readonly string[]>;
}


class DefaultProductService
    extends DefaultCRUDService<
        Product,
        string,
        CreateProduct,
        UpdateProduct,
        ProductListOptions,
        ProductList,
        ProductRepository
    >
    implements ProductService {

    constructor(
        protected readonly repository: ProductRepository,
    ) {
        super(repository);
    }

    // Read Single

    async findBySlug(
        slug: string,
    ): Promise<Product | null> {
        if (!slug) return null;
              
        const product =
            await this.repository.findBySlug(slug);

        if (!product) return null;

        return product;
    }

    // Read Batch

    async findBySlugs(
        slugs: readonly string[],
    ): Promise<readonly Product[]> {
        if (!slugs || slugs.length === 0) return [];

        const products = 
            await this.repository.findBySlugs(slugs);

        if (!products || products.length === 0) return [];

        return products;
    }

    // Query

    async list(): Promise<Product[]> {
        const products = 
            await this.repository.list();

        return products;
    }


    // Exists Batch
    async listExistingSlugs(
        slugs: readonly string[],
    ): Promise<readonly string[]> {
        if (!slugs || slugs.length === 0) return [];

        const existingSlugs = 
            await this.repository.listExistingSlugs(slugs);
        
        return existingSlugs;
    }

}


export function createProductService(
    repository: ProductRepository,
): ProductService {
    return new DefaultProductService(repository);
}