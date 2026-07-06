
// services
import { CategoryService } from '../../../domain/category';
import { ProductService } from '../../../domain/product';
import { ProductCategoryService } from '../../../domain/product-category';
import { ProductImageService } from '../../../domain/product-image';
import { ProductResolveService } from '../../identifiers';



// types
import type { Product } from '../../../domain/product';
import type { ProductDetail, ProductSummary } from "./type";
import { buildBreadcrumb } from '../../projections';


export interface ProductReadService {

    getProductDetail(
        slug: string,
    ): Promise<ProductDetail | null>;

    getProductSummary(
        slug: string,
    ): Promise<ProductSummary | null>;

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

}

class DefaultProductReadService
    implements ProductReadService {

    constructor(
        private readonly categoryService: CategoryService,
        private readonly productService: ProductService,
        private readonly productCategoryService: ProductCategoryService,
        private readonly productImageService: ProductImageService,
        private readonly productResolveService: ProductResolveService,
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

        return {
            
            product,
            
            categories: categories,
            
            images: images,
            
            breadcrumb: buildBreadcrumb(breadcrumbs),

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

    private async getProductSummaries(
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
                    relation => relation.category_id,
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

        

        return products.map(
            product => {
                const categoryId =
                    primaryCategories
                        .find(
                            relation => relation.product_id === product.id
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
    );

}