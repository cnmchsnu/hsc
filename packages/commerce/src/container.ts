
import { createServerClient } from '@repo/database/client/server';

import { SupabaseProductRepository } from '@repo/database/product';
import { SupabaseCategoryRepository } from '@repo/database/category';
import { SupabaseProductCategoryRepository } from '@repo/database/product-category';

import { createProductService, ProductService } from './product/service';
import { createCategoryService, CategoryService } from './category/service';
import { createCommerceService, CommerceService } from './read-models/service';

export interface CommerceContainer {

    productService: ProductService;

    categoryService: CategoryService;

    commerceService: CommerceService;

}

export async function createCommerceContainer(): Promise<CommerceContainer> {

    const client = 
        await createServerClient();

    const productRepository = 
        new SupabaseProductRepository(client);

    const categoryRepository =
        new SupabaseCategoryRepository(client);

    const productCategoryRepository =
        new SupabaseProductCategoryRepository(client);

    const productService =
        createProductService(
            productRepository,
        );
    
    const categoryService =
        createCategoryService(
            categoryRepository,
        );

    const commerceService =
        createCommerceService({
            productService,
            categoryService,
            productCategoryRepository,
        });

    return {

        productService,

        categoryService,

        commerceService,

    };

}