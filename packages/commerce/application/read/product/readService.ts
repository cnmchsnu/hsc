
// services & repositories
import {
    CategoryService,
    ProductService,
    ProductCategoryService,
    ProductImageService,
    SKUService,
    VariantOptionService,
    VariantOptionValueService,
    InventoryItemService,
    PriceService,
    SKUVariantValueRepository
} from '../../../domain';

import { ProductResolveService } from '../../identifiers';

import { ProductAggregateLoader } from '../../aggragate';

// types
import type {
    Product,
    ProductCategory,
    VariantOptionValue,
    Price,
} from '../../../domain';

import type { ProductDetail, ProductSummary } from "./type";

import {
    buildBreadcrumb,
    buildDisplayPrice,
    buildProductAvailability,
    buildInventorySummary,
    buildCurrentPrice,
    toProductVariant,
    toProductVariantSKU,
    toProductVariantOption,
    
} from '../../projections';


import { NotFoundError } from "@repo/shared/application";


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

    productAggregateLoader: ProductAggregateLoader;

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
        protected readonly productAggregateLoader: ProductAggregateLoader,
        protected readonly categoryService: CategoryService,
        protected readonly productService: ProductService,
        protected readonly productCategoryService: ProductCategoryService,
        protected readonly productImageService: ProductImageService,
        protected readonly productResolveService: ProductResolveService,
        protected readonly priceService: PriceService,
        protected readonly inventoryItemService: InventoryItemService,
        protected readonly skuService: SKUService,
        protected readonly variantOptionService: VariantOptionService,
        protected readonly variantOptionValueService: VariantOptionValueService,
        protected readonly skuVariantValueRepository: SKUVariantValueRepository,
    ) {}

    async getProductDetail(
        slug: string,
    ): Promise<ProductDetail | null> {

        const aggregate = await this.productAggregateLoader.loadBySlug(slug);

        if (!aggregate) throw new NotFoundError(`Product with slug ${slug} does not exist.`);
            
        const inventoryItemsMap =
            new Map(aggregate.inventory.map(item => [item.skuid, item]));

        const variantOptionValuesMap =
            new Map(aggregate.values.map(value => [value.id, value]));

        const skuVariantValuesMap =
            new Map<string, VariantOptionValue[]>();

        for (const link of aggregate.skuVariantValues) {

            const optionValue =
                variantOptionValuesMap.get(link.optionValueId);

            if (!optionValue) continue;

            const values =
                skuVariantValuesMap.get(link.skuId) ?? [];

            values.push(optionValue);

            skuVariantValuesMap.set(
                link.skuId,
                values,
            );

        }

        const inventorySummary =
            buildInventorySummary(
                aggregate.inventory
            );

        const availability =
            buildProductAvailability(
                aggregate.inventory
            );


        const currentPrice =
            aggregate.skuIds.map((id) => buildCurrentPrice(id, aggregate.prices));


        const displayPrice =
            buildDisplayPrice(currentPrice);


        const currentPricesMap =
            new Map(aggregate.skus.map(sku =>
                [sku.id, currentPrice.find(price =>
                    price?.skuId === sku.id
                ) || null]
            ));



        const variantSKUs = aggregate.skus.map((sku) => toProductVariantSKU(
            sku,
            inventoryItemsMap,
            currentPricesMap,
            skuVariantValuesMap
            ));

        const variantOptions =
            aggregate.options.map((option) =>
                toProductVariantOption(option, aggregate.values)
            );



        const variants =
            toProductVariant(
                variantOptions,
                variantSKUs,
            )


        return {
            
            product: aggregate.product!,
            
            categories: aggregate.categories,
            
            images: aggregate.images,
            
            breadcrumb: buildBreadcrumb(aggregate.breadcrumbs),

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

        const skuMap = new Map(
            productIds.map(
                id => [
                    id,
                    sku.filter(sku => sku.productId === id).map(sku => sku.id) || [],
                ],
            ),
        );

        const skuIds = sku.map(sku => sku.id);


        const [categories, price, inventoryItems] =
            await Promise.all([
                this.categoryService.getMany(categoryIds),
                this.priceService.getManyBySKUIds(skuIds),
                this.inventoryItemService.getMany(skuIds),
            ]);


        const categoryMap =
            new Map(
                categories.map(category => [category.id,category]),
            );

        

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
                .find({
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

        const products = await this.productService.find({
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
        dependencies.productAggregateLoader,
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