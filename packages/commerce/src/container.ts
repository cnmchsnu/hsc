
import { createServerClient } from '@repo/database/client/server';

import { SupabaseProductRepository } from '@repo/database/product';
import { SupabaseCategoryRepository } from '@repo/database/category';

import { createProductService, ProductService } from './product/service';
import { createCategoryService, CategoryService } from './category/service';

export interface CommerceContainer {

    productService: ProductService;
    categoryService: CategoryService;

}

export async function createCommerceContainer() {

    const client = 
        await createServerClient();

    const productRepository = 
        new SupabaseProductRepository(client);

    const categoryRepository =
        new SupabaseCategoryRepository(client);

    const productService =
        createProductService(
            productRepository,
        );
    
    const categoryService =
        createCategoryService(
            categoryRepository,
        );

    return {

        client,

        productService,

        productRepository,

        categoryService,

    };

}