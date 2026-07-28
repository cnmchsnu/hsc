import { SupabaseClient } from "@supabase/supabase-js";
import { CommerceDependencies } from "../application/manage";

import {
    SupabaseProductRepository,
    SupabaseProductCategoryRepository,
    SupabaseProductImageService,
    SupabaseSKURepository,
    SupabaseInventoryItemRepository,
    SupabasePriceRepository,
    SupabaseVariantOptionRepository,
    SupabaseSKUVariantValueRepository,
    SupabaseVariantOptionValueRepository,
    SupabaseCategoryRepository
} from '@repo/infra/supabase/repositories';


import {
    createProductService,
    createProductCategoryService,
    createProductImageService,
    createPriceService,
    createInventoryItemService,
    createSKUService,
    createVariantOptionService,
    createVariantOptionValueService,
    createCategoryService,
    SKUVariantValueRepository
} from '../domain';

import type {
    ProductService,
    ProductCategoryService,
    ProductImageService,
    PriceService,
    InventoryItemService,
    SKUService,
    VariantOptionService,
    VariantOptionValueService,
    CategoryService,
} from '../domain';


import {
    SupabaseProductIdentifier,
    SupabaseCategoryIdentifier
} from "@repo/infra/supabase/identifiers";

import type {
    CategoryResolveService,
    ProductResolveService
} from '../application/identifiers';

import  {
    createCategoryResolveService,
    createProductResolveService
} from '../application/identifiers';
import { DefaultProductAggregateLoader, type ProductAggregateLoader } from "../application/aggragate";
import { NoopTransactionRunner, TransactionRunner } from "@repo/infra/transaction";


export interface ServiceContainer {

    transactionRunner: TransactionRunner;
    
    productAggregateLoader: ProductAggregateLoader;

    categoryService: CategoryService;

    productService: ProductService;

    productImageService: ProductImageService;

    productCategoryService: ProductCategoryService;
    
    priceService: PriceService;

    inventoryItemService: InventoryItemService;

    skuService: SKUService;
    
    variantOptionService: VariantOptionService;
    
    variantOptionValueService: VariantOptionValueService;

    skuVariantValueRepository: SKUVariantValueRepository;

    productResolveService: ProductResolveService

    categoryResolveService: CategoryResolveService

}


export function createServiceContainer(
    client: SupabaseClient,
): ServiceContainer {

    const productRepository = 
        new SupabaseProductRepository(client);

    const categoryRepository =
        new SupabaseCategoryRepository(client);
    
    const productImageRepository =
        new SupabaseProductImageService(client);

    const productCategoryRepository =
        new SupabaseProductCategoryRepository(client);

    const priceRepository =
        new SupabasePriceRepository(client);
    
    const inventoryItemRepository =
        new SupabaseInventoryItemRepository(client);

    const variantOptionRepository =
        new SupabaseVariantOptionRepository(client);

    const variantValueOptionRepository =
        new SupabaseVariantOptionValueRepository(client);


    const skuVariantValueRepository =
        new SupabaseSKUVariantValueRepository(client);

    const skuRepository =
        new SupabaseSKURepository(client);


    const productService =
        createProductService(
            productRepository,
        );
    
    const categoryService =
        createCategoryService(
            categoryRepository,
        );
    
    const productImageService =
        createProductImageService(
            productImageRepository,
        );
    
    const productCategoryService =
        createProductCategoryService(
            productCategoryRepository,
        );

    const priceService =
        createPriceService(
            priceRepository,
        );

    const inventoryItemService =
        createInventoryItemService(
            inventoryItemRepository,
        );

    const skuService =
        createSKUService(
            skuRepository,
            skuVariantValueRepository,
        );

    const variantOptionService =
        createVariantOptionService(
            variantOptionRepository,
        );

    const variantOptionValueService =
        createVariantOptionValueService(
            variantValueOptionRepository,
        );

    const productResolveRepository =
        new SupabaseProductIdentifier(client);

    const categoryResolveRepository =
        new SupabaseCategoryIdentifier(client);

    const productResolveService =
        createProductResolveService(productResolveRepository,);

    const categoryResolveService =
        createCategoryResolveService(categoryResolveRepository,);

    const transactionRunner = new NoopTransactionRunner();

    const productAggregateLoader =
        new DefaultProductAggregateLoader(
            categoryService,
            productService,
            productCategoryService,
            productImageService,
            priceService,
            inventoryItemService,
            skuService,
            variantOptionService,
            variantOptionValueService,
            skuVariantValueRepository
        )

    return {
        transactionRunner,
        productAggregateLoader,
        categoryService,
        productService,
        productImageService,
        productCategoryService,
        priceService,
        inventoryItemService,
        skuService,
        variantOptionService,
        variantOptionValueService,
        skuVariantValueRepository,
        productResolveService,
        categoryResolveService,
    }

}