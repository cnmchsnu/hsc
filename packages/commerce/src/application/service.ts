import { CategoryService } from '../category';
import { ProductService, Product } from '../product';
import { ProductImageService } from '../product-image';

import type {
    ProductDetail, ProductSummary, CategoryPage
} from './read-models';

import type {
    ProductSearchCriteria, ProductSearchResult
} from './queries';

import { ProductCategoryRepository } from '@repo/database/read-models';


export interface CommerceService {

    getProductDetail(
        slug: string,
    ): Promise<ProductDetail | null>;

    getProductSummary(
        id: string,
    ): Promise<ProductSummary | null>;

    getProductSummaries(
        products: readonly Product[],
    ): Promise<ProductSummary[]>;

    getProductSummariesByIds(
        ids: readonly string[],
    ): Promise<ProductSummary[]>;

    getProductSummariesByCategory(
        categoryId: string,
    ): Promise<ProductSummary[]>;

    // getProductSummariesBySlugs(
    //     slugs: readonly string[],
    // ): Promise<ProductSummary[]>;

    getCategoryPage(
        slug: string,
    ): Promise<CategoryPage | null>;

    searchProducts(
        criteria: ProductSearchCriteria,
    ): Promise<ProductSearchResult>;


}

export interface CommerceServiceDependencies {

    productService: ProductService;

    productImageService: ProductImageService;

    categoryService: CategoryService;

    productCategoryRepository: ProductCategoryRepository;

}


export class DefaultCommerceService
    implements CommerceService {

    constructor(
        private readonly productService: ProductService,
        private readonly productImageService: ProductImageService,
        private readonly categoryService: CategoryService,
        private readonly productCategoryRepository: ProductCategoryRepository,
    ) {}

    async getProductDetail(
        slug: string,
    ): Promise<ProductDetail | null> {
        
        const product = 
            await this.productService.getBySlug(slug);
        
        if (!product) {
            return null;
        }

        const categoryIds = 
            await this.productCategoryRepository
                .listCategoryIds(
                    product.id
                );

        const categories =
            await this.categoryService
                .getByIds(
                    categoryIds
                );

        const images =
            await this.productImageService
                .listByProductId(
                    product.id
                );

        if (!images) {
            return null;
        }

        return {
            
            product,
            
            categories: categories,
            
            images: images,

        };

    }

    async getProductSummary(
    id: string,
    ): Promise<ProductSummary | null> {

        const product =
            await this.productService.getById(
                id,
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
            await this.productCategoryRepository
                .listPrimaryCategories(
                    productIds,
                );

        const categoryIds = [
            ...new Set(
                primaryCategories.values(),
            ),
        ];

        const categories =
            await this.categoryService
                .getByIds(
                    categoryIds,
                );

        const thumbnails =
            await this.productImageService
                .listThumbnails(
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
                    primaryCategories.get(
                        product.id,
                    );

                return {

                    product,

                    thumbnail:
                        thumbnails.get(
                            product.id,
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

    async getProductSummariesByCategory(
        categoryId: string,
    ): Promise<ProductSummary[]> {

        const products = await this.productService.list({
            page: 1,
            pageSize: 100,
            categoryIds: [categoryId],
            status: ["active"],
        });

        if (!products) {
            return [];
        }

        return this.getProductSummaries(
            products.items,
        );
    }

    async getProductSummariesByIds(
        ids: readonly string[],
    ): Promise<ProductSummary[]> {

        const products = await this.productService.list({
            page: 1,
            pageSize: ids.length,
            productIds: [...ids],
        });

        return this.getProductSummaries(
            products.items,
        );
    }

    // async getProductSummariesBySlugs(
    //     slugs: readonly string[],
    // ): Promise<ProductSummary[]> {
    //     const products = await this.productService.list({
    //         page: 1,
    //         pageSize: slugs.length,
            
    //     });

    // }

    async getCategoryPage(
        slug: string,
    ): Promise<CategoryPage | null> {

        const category = await this.categoryService.getBySlug(slug);

        if (!category) {
            return null;
        }

        const breadcrumb = 
            await this.categoryService
                .getBreadcrumb(
                    category.id
                );

        
        const tree = 
            await this.categoryService
                .getTree();

        return {
            category,
            breadcrumb,
            tree,
        };

    }

    async searchProducts(
        criteria: ProductSearchCriteria,
    ): Promise<ProductSearchResult> {

        const products = await this.productService.list({
            page: criteria.page,
            pageSize: criteria.pageSize,
            keyword: criteria.keyword,
            categoryIds: criteria.categoryIds ? [...criteria.categoryIds] : undefined,
            status: ["active"],
            sort: criteria.sort,
        });

        const summaries = await this.getProductSummaries(
            products.items,
        );

        return {
            items: summaries,
            total: products.total,
            page: products.page,
            pageSize: products.pageSize,
            totalPages: products.total,
        }


    }

    
}


export function createCommerceService(
    dependencies: CommerceServiceDependencies,
): CommerceService {

    return new DefaultCommerceService(
        dependencies.productService,
        dependencies.productImageService,
        dependencies.categoryService,
        dependencies.productCategoryRepository,
    );

}
