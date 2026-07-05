
import { createServerClient } from '@repo/database/client/server';

import {
    SupabaseProductRepository,
    SupabaseCategoryRepository,
    SupabaseProductCategoryRepository,
    SupabaseProductImageService 
} from '@repo/infra/supabase/repositories';

import { SupabaseProductIdentifier } from '@repo/infra/supabase/identifiers';

import {
    createCategoryService,
    createProductService,
    createProductCategoryService,
    createProductImageService
} from './domain';

import { createProductResolveService } from './application/identifiers';



import { createCategoryReadService, type CategoryReadService } from './application/read';
import { createProductReadService, type ProductReadService } from './application/read/product';
import { createProductSearchService, type ProductSearchService } from './application/search/product';

export interface CommerceContainer {

    categoryReadService: CategoryReadService;

    productReadService: ProductReadService;

    productSearchService: ProductSearchService;

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

    const productResolveService =
        new SupabaseProductIdentifier(client);




    const productService =
        createProductService(
            productRepository,
        );

    const productImageService =
        createProductImageService(
            productImageRepository,
        );

    const productCategoryService =
        createProductCategoryService(
            productCategoryRepository,
        );

    const categoryService =
        createCategoryService(
            categoryRepository,
        );

    const productReadService =
        createProductReadService({
            categoryService,
            productService,
            productCategoryService,
            productImageService,
            productResolveService,
        });

    const categoryReadService =
        createCategoryReadService({
            categoryService,
        });

    const productSearchService =
        createProductSearchService({
            productService,
            productCategoryService,
            productReadService,
            categoryResolveService: productResolveService,
        });

    
    

    return {

        categoryReadService,

        productReadService,

        productSearchService,


    };

}