import { createServerClient } from '@repo/infra/supabase/client';

import {
    SupabaseProductRepository,
    SupabaseProductCategoryRepository,
    SupabaseProductImageService 
} from '@repo/infra/supabase/repositories';

import { SupabaseProductIdentifier } from '@repo/infra/supabase/identifiers';


import type { CategoryService } from '../domain/category';


import {
    createProductService,
    createProductCategoryService,
    createProductImageService
} from '../domain';

import { createProductReadService, type ProductReadService } from '../application/read/product';
import { createProductSearchService, type ProductSearchService } from '../application/search/product';

import { createProductResolveService } from '../application/identifiers';

export interface ProductContainer {

    productReadService: ProductReadService;

    productSearchService: ProductSearchService;

}

export async function createProductContainer(
    categoryService: CategoryService
): Promise<ProductContainer> {

    const client = 
        await createServerClient();

    const productRepository = 
        new SupabaseProductRepository(client);

    
    const productImageRepository =
        new SupabaseProductImageService(client);

    const productCategoryRepository =
        new SupabaseProductCategoryRepository(client);

    const productResolveRepository =
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

        const productResolveService =
            createProductResolveService(
                productResolveRepository,
            );
    

        const productReadService =
            createProductReadService({
                categoryService,
                productService,
                productCategoryService,
                productImageService,
                productResolveService,
            });


        const productSearchService =
                createProductSearchService({
                    productService,
                    productCategoryService,
                    productReadService,
                    categoryResolveService: productResolveService,
                });

    return {

        productReadService,

        productSearchService

    };

}