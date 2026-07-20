
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

import { Price, PriceService } from '../../../domain/price';

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

        const [primaryCategory, productCategoryIds, images, sku, option] =
            await Promise.all([
            this.productCategoryService.getPrimaryByProductId(product.id),
            this.productCategoryService.getByProductId(product.id),
            this.productImageService.getAllById(product.id),
            this.skuService.getByProduct(product.id),
            this.variantOptionService.getByProduct(product.id),
            ])

        if (!images) {
            return null;
        }
        
        const categoriesIds = productCategoryIds.map((relation) => relation.category_id);
        const skuIds = sku.map(sku => sku.id);
        const optionIds = option.map(option => option.id);



        const [breadcrumbs, categories, price, inventoryItems, skuVariantValues, optionValues] =
            await Promise.all([
                this.categoryService.findPathToRoot(primaryCategory?.category_id || ''),
                this.categoryService.findByIds(categoriesIds),
                this.priceService.getManyBySKUIds(skuIds),
                this.inventoryItemService.getMany(skuIds),
                this.skuVariantValueRepository.getBySKUs(skuIds),
                this.variantOptionValueService.getByOptions(optionIds),
            ]);


        const inventorySummary =
            buildInventorySummary(
                inventoryItems
            );

        const availability =
            buildProductAvailability(
                inventoryItems
            );


        const currentPrice =
            skuIds.map((id) => buildCurrentPrice(id, price));


        const displayPrice =
            buildDisplayPrice(currentPrice);

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


        const [primaryCategories, thumbnails, sku] =
            await Promise.all([
                this.productCategoryService.getPrimaryByProductIds(productIds,),
                this.productImageService.getThumbnailByIds(productIds,),
                this.skuService.getByProducts(productIds,),
            ])

        if (!primaryCategories) {
            return [];
        }


        const thumbnailMap = new Map(
            thumbnails.map(t => [t.productId, t]),
        );

        const primaryCategoryMap = new Map(
            primaryCategories.map(r => [r.product_id, r.category_id]),
        );


        const categoryIds =
            primaryCategories!
                .map(
                    (relation: ProductCategory) => relation.category_id,
                );


        const [categories] =
            await Promise.all([
                this.categoryService.findByIds(categoryIds,),
            ]);


        const categoryMap =
            new Map(
                categories.map(category => [category.id,category]),
            );


        const skuMap = new Map(
            productIds.map(
                id => [
                    id,
                    sku.filter(sku => sku.productId === id).map(sku => sku.id) || [],
                ],
            ),
        );

        const skuIds = sku.map(sku => sku.id);


        const [price, inventoryItems] =
            await Promise.all([
                this.priceService.getManyBySKUIds(skuIds),
                this.inventoryItemService.getMany(skuIds),
            ]);

        const inventoryItemsMap = new Map(
            inventoryItems.map(item => [item.skuid, item])
        );

        const productInventoryItemMap = new Map<string, any[]>();

        skuMap.forEach((skuIds, productId) => {
            const items = skuIds.map(id => inventoryItemsMap.get(id) || null).filter(item => item !== null);
            productInventoryItemMap.set(productId, items);
        });


        const currentPrices =
            skuIds.map((id) => buildCurrentPrice(id, price));

        const currentPricesMap = new Map(
            currentPrices
                .filter((p): p is Price => p !== null)
                .map(price => [price.skuId, price])
        );

        const productPriceMap = new Map<string, Price[]>();

        skuMap.forEach((skuIds, productId) => {
            const prices = skuIds
                .map(id => currentPricesMap.get(id))
                .filter((p): p is Price => p !== undefined);

            productPriceMap.set(productId, prices);
        });


        const displayPriceMap =
            new Map(
                productIds.map(
                    id => [
                        id,
                        buildDisplayPrice(
                            productPriceMap.get(id) || [],
                        ),
                    ],
                ),
            );

        const availabilityMap =
            new Map(
                productIds.map(
                    id => [
                        id,
                        buildProductAvailability(
                            productInventoryItemMap.get(id) || []
                        ),
                    ],
                ),
            );

        return products.map(
            product => {
                const categoryId =
                    primaryCategoryMap.get(product.id);

                return {

                    product,

                    thumbnail:
                        thumbnailMap.get(product.id) ?? null,

                    primaryCategory:
                        categoryId
                            ? categoryMap.get(
                                categoryId,
                            ) ?? null
                            : null,

                    displayPrice:
                        displayPriceMap.get(product.id) ?? null,

                    availability:
                        availabilityMap.get(product.id) ?? null,

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