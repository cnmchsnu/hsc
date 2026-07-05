
import { createServerClient } from '@repo/database/client/server';

import { SupabaseProductRepository } from '@repo/database/product';
import { SupabaseCategoryRepository } from '@repo/database/category';
import { SupabaseProductCategoryRepository } from '@repo/database/read-models';
import { SupabaseProductImageService } from '@repo/database/product-image';

import { createProductService, ProductService } from './product/service';
import { createCategoryService, CategoryService } from './category/service';
import { createCommerceService, CommerceService } from './src/application/service';
import { createProductImageService, ProductImageService } from './product-image/service';

export interface CommerceContainer {

    categoryService: CategoryService;

    commerceService: CommerceService;


}

export async function createCommerceContainer(): Promise<CommerceContainer> {

    const client = 
        await createServerClient();

    const productRepository = 
        new SupabaseProductRepository(client);

    const productImageRepository =
        new SupabaseProductImageService(client);

    const categoryRepository =
        new SupabaseCategoryRepository(client);

    const productCategoryRepository =
        new SupabaseProductCategoryRepository(client);


    const productService =
        createProductService(
            productRepository,
        );

    const productImageService =
        createProductImageService(
            productImageRepository,
        );
    
    const categoryService =
        createCategoryService(
            categoryRepository,
        );

    const commerceService =
        createCommerceService({
            productService,
            productImageService,
            categoryService,
            productCategoryRepository,
        });
    
    

    return {

        categoryService,

        commerceService,


    };

}