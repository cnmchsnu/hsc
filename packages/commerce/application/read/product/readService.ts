
// services
import { CategoryService } from '../../../domain/category';
import { ProductService } from '../../../domain/product';
import { ProductCategory, ProductCategoryService } from '../../../domain/product-category';
import { ProductImageService } from '../../../domain/product-image';
import { ProductResolveService } from '../../identifiers';
import { SKUService } from '../../../domain/sku';
import { VariantOptionService } from '../../../domain/variant-option';
import { VariantOptionValueService } from '../../../domain/variant-option-value';

import { InventoryItemService } from '../../../domain/inventory-item';

import { PriceService } from '../../../domain/price';

// repositories

import { SKUVariantValueRepository } from '../../../domain/sku-variant-value';


// types
import type { Product } from '../../../domain/product';
import type { ProductDetail, ProductSummary } from "./type";
import {
    buildBreadcrumb,
    buildDisplayPrice,
    buildProductAvailability,
    buildInventorySummary,
    buildCurrentPrice,
    buildProductVariant
} from '../../projections';



export interface ProductReadService {

    getProductDetail(
        slug: string,
    ): Promise<ProductDetail | null>;

    getProductSummary(
        slug: string,
    ): Promise<ProductSummary | null>;

    getProductSummaries(
        products: readonly Product[],
    ): Promise<ProductSummary[]>;

    getProductSummariesBySlugs(
        slugs: readonly string[],
    ): Promise<ProductSummary[]>;

    getProductSummariesByCategory(
        categoryId: string,
    ): Promise<ProductSummary[]>;

}

interface ProductReadServiceDependencies {

    categoryService: CategoryService;

    productService: ProductService;

    productCategoryService: ProductCategoryService;

    productImageService: ProductImageService;

    productResolveService: ProductResolveService;

    skuService: SKUService;

    variantOptionService: VariantOptionService;

    variantOptionValueService: VariantOptionValueService;

    priceService: PriceService;

    inventoryItemService: InventoryItemService;

    skuVariantValueRepository: SKUVariantValueRepository;

}

class DefaultProductReadService
    implements ProductReadService {

    constructor(
        private readonly categoryService: CategoryService,
        private readonly productService: ProductService,
        private readonly productCategoryService: ProductCategoryService,
        private readonly productImageService: ProductImageService,
        private readonly productResolveService: ProductResolveService,
        private readonly priceService: PriceService,
        private readonly inventoryItemService: InventoryItemService,
        private readonly skuService: SKUService,
        private readonly variantOptionService: VariantOptionService,
        private readonly variantOptionValueService: VariantOptionValueService,
        private readonly skuVariantValueRepository: SKUVariantValueRepository,
    ) {}

    async getProductDetail(
        slug: string,
    ): Promise<ProductDetail | null> {
        
        const product = 
            await this.productService.findBySlug(slug);
        
        if (!product) {
            return null;
        }

        const primaryCategory =
            await this.productCategoryService
                .getPrimaryByProductId(
                    product.id
                );
    
        const breadcrumbs = 
            await this.categoryService
                .findPathToRoot(
                    primaryCategory?.category_id || ''
                );

        const categoriesIds =
            await this.productCategoryService
                .getByProductId(
                    product.id
                );

        const categories =
            await this.categoryService
                .findByIds(
                    categoriesIds.map(
                        (relation) => relation.category_id
                    )
                );

        const images =
            await this.productImageService
                .getAllById(
                    product.id
                );

        if (!images) {
            return null;
        }

        const sku = 
            await this.skuService
                .getByProduct(
                    product.id
                );

        const price =
            await this.priceService
                .getManyBySKUIds(
                    sku.map(
                        (sku) => sku.id
                    )
                );

        const inventoryItems =
            await this.inventoryItemService
                .getMany(
                    sku.map(
                        (sku) => sku.id
                    )
                );

        const displayPrice =
            buildDisplayPrice(
                sku,
                price
            );

        const inventorySummary =
            buildInventorySummary(
                inventoryItems
            );

        const availability =
            buildProductAvailability(
                inventoryItems
            );

        const currentPrice =
            sku.map((sku) => buildCurrentPrice(sku, price));

        const option = 
            await this.variantOptionService
                .getByProduct(
                    product.id
                );

        const optionValues =
            await this.variantOptionValueService
                .getByOptions(
                    option.map(
                        (option) => option.id
                    )
                );

        const skuVariantValues =
            await this.skuVariantValueRepository
                .getBySKUs(
                    sku.map(
                        (sku) => sku.id
                    )
                );

        const variants =
            buildProductVariant(
                option,
                optionValues,
                sku,
                skuVariantValues,
                inventoryItems,
                currentPrice
            );

        return {
            
            product,
            
            categories: categories,
            
            images: images,
            
            breadcrumb: buildBreadcrumb(breadcrumbs),

            variants,

            displayPrice,

            inventorySummary,

            availability,

        };

    }

    async getProductSummary(
        slug: string,
    ): Promise<ProductSummary | null> {

        const product =
            await this.productService.findBySlug(
                slug
            );

        if (!product) {
            return null;
        }

        const summaries =
            await this.getProductSummaries(
                [product],
            );

        return summaries[0] ?? null;

    }

    async getProductSummaries(
        products: readonly Product[],
    ): Promise<ProductSummary[]> {

        if (products.length === 0) {
            return [];
        }

        const productIds =
            products.map(
                product => product.id,
            );

        const primaryCategories =
            await this.productCategoryService
                .getPrimaryByProductIds(
                    productIds,
                );

        if (!primaryCategories) {
            return [];
        }
                
        const categoryIds =
            primaryCategories!
                .map(
                    (relation: ProductCategory) => relation.category_id,
                );

        const categories =
            await this.categoryService
                .findByIds(
                    categoryIds,
                );
        const thumbnails =
            await this.productImageService
                .getThumbnailByIds(
                    productIds,
                );

        const categoryMap =
            new Map(
                categories.map(
                    category => [
                        category.id,
                        category,
                    ],
                ),
            );

        const sku = 
            await this.skuService
                .getByProducts(
                    productIds,
                );

        const skuMap = new Map(
            sku.map(
                sku => [
                    sku.productId,
                    sku,
                ],
            ),
        );

        const price =
            await this.priceService
                .getManyBySKUIds(
                    sku.map(
                        (sku) => sku.id
                    )
                );

        const inventoryItems =
            await this.inventoryItemService
                .getMany(
                    sku.map(
                        (sku) => sku.id
                    )
                );

        const inventoryItemsMap = new Map(
            inventoryItems.map(item => [item.skuid, item])
        );

        const displayPriceMap =
            new Map(
                products.map(
                    product => [
                        product.id,
                        buildDisplayPrice(
                            skuMap.get(product.id) ? [skuMap.get(product.id)!] : [],
                            price,
                        ),
                    ],
                ),
            );

        const availabilityMap =
            new Map(
                sku.map(
                    sku => [
                        sku.id,
                        buildProductAvailability(
                            inventoryItemsMap.get(sku.id) ? [inventoryItemsMap.get(sku.id)!] : []
                        ),
                    ],
                ),
            );
                

        return products.map(
            product => {
                const categoryId =
                    primaryCategories
                        .find(
                            (relation: ProductCategory) => relation.product_id === product.id
                        )?.category_id;

                return {

                    product,

                    thumbnail:
                        thumbnails.find(
                            image => image.productId === product.id
                        ) ?? null,

                    primaryCategory:
                        categoryId
                            ? categoryMap.get(
                                categoryId,
                            ) ?? null
                            : null,

                    displayPrice:
                        displayPriceMap.get(
                            product.id,
                        ) ?? null,

                    availability:
                        availabilityMap.get(
                            skuMap.get(product.id)?.id || ''
                        ) ?? null,

                };

            },
        );

    }

    async getProductSummariesBySlugs(
        slugs: readonly string[],
    ): Promise<ProductSummary[]> {

        const productIds =
            await this.productResolveService
                .resolveIdsBySlugs(
                    slugs,
                );


        const products = await this.productService
                .search({
                    page: 1,
                    pageSize: productIds.length,
                    productIds: [...productIds],
                });

        return this.getProductSummaries(
            products.items,
        );
    }

    async getProductSummariesByCategory(
        slug: string,
    ): Promise<ProductSummary[]> {

        const category = 
            await this.categoryService.findBySlug(slug);

        if (!category) {
            return [];
        }

        const productIds = await this.productCategoryService
            .getByCategoryId(
                category.id,
            );

        if (!productIds) {
            return [];
        }

        const products = await this.productService.search({
            page: 1,
            pageSize: productIds.length,
            productIds: [...productIds.map(relation => relation.product_id)],
        });

        return this.getProductSummaries(
            products.items,
        );
    }

}

export function createProductReadService(
    dependencies: ProductReadServiceDependencies,
): ProductReadService {

    return new DefaultProductReadService(
        dependencies.categoryService,
        dependencies.productService,
        dependencies.productCategoryService,
        dependencies.productImageService,
        dependencies.productResolveService,
        dependencies.priceService,
        dependencies.inventoryItemService,
        dependencies.skuService,
        dependencies.variantOptionService,
        dependencies.variantOptionValueService,
        dependencies.skuVariantValueRepository,
    );

}