import type { ProductAggregate } from './type';

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
    SKUVariantValueRepository,
    Product
} from '../../../domain';

export interface ProductAggregateLoader {

    loadBySlug(slug: string): Promise<ProductAggregate | null>;

    loadById(productId: string): Promise<ProductAggregate | null>;

}




export class DefaultProductAggregateLoader
    implements ProductAggregateLoader {

    constructor(
        protected readonly categoryService: CategoryService,
        protected readonly productService: ProductService,
        protected readonly productCategoryService: ProductCategoryService,
        protected readonly productImageService: ProductImageService,
        protected readonly priceService: PriceService,
        protected readonly inventoryItemService: InventoryItemService,
        protected readonly skuService: SKUService,
        protected readonly variantOptionService: VariantOptionService,
        protected readonly variantOptionValueService: VariantOptionValueService,
        protected readonly skuVariantValueRepository: SKUVariantValueRepository,
    ) {}

    private async load(
        product: Product
    ): Promise<ProductAggregate | null> {

        const [productCategories, images, skus, options] =
            await Promise.all([
                this.productCategoryService.getByProductId(product.id),
                this.productImageService.getAllById(product.id),
                this.skuService.getByProduct(product.id),
                this.variantOptionService.getByProduct(product.id),
            ])

        if (!images) {
            return null;
        }

        const primaryCategory =
            productCategories.find((relation) => relation.is_primary);
        
        const productCategoryIds = productCategories.map((relation) => relation.category_id);
        const skuIds = skus.map(sku => sku.id);
        const optionIds = options.map(option => option.id);



        const [breadcrumbs, categories, prices, inventoryItems, skuVariantValues, values] =
            await Promise.all([
                this.categoryService.findPathToRoot(primaryCategory?.category_id || ''),
                this.categoryService.getMany(productCategoryIds),
                this.priceService.getManyBySKUIds(skuIds),
                this.inventoryItemService.getBySkus(skuIds),
                this.skuVariantValueRepository.getBySKUs(skuIds),
                this.variantOptionValueService.getByOptions(optionIds),
            ]);
        
        
        return {
            skuIds,
            productId: product.id,
            product,
            categories,
            breadcrumbs,
            images,
            options,
            values,
            skus,
            skuVariantValues,
            prices,
            inventory: inventoryItems,
            productCategories,
        }

    }


    async loadBySlug(
        slug: string,
    ): Promise<ProductAggregate | null> {

        const product = 
            await this.productService.findBySlug(slug);
        
        if (!product) {
            return null;
        }

        return this.load(product);
        
    }

    async loadById(
        productId: string,
    ): Promise<ProductAggregate | null> {
        const product =
            await this.productService.find({productIds: [productId], page: 1, pageSize: 1});

        if (!product) throw new Error(`Product with ID ${productId} not found.`);


        return this.load(product.items[0]);
    }

}

