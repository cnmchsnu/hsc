
import { createServerClient } from '@repo/database/client/server';

import { SupabaseProductRepository } from '@repo/database/product';

import { createProductService, ProductService } from './product/service';

export interface CommerceContainer {

    productService: ProductService;

}

export async function createCommerceContainer() {

    const client = 
        await createServerClient();

    const productRepository = 
        new SupabaseProductRepository(client);

    const productService =
        createProductService(
            productRepository,
        );

    return {

        client,

        productService,

        productRepository,

    };

}