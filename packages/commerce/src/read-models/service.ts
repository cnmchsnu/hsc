import { CategoryService } from '../category';
import { ProductService } from '../product';
import type { ProductDetail, ProductSummary, CategoryPage,  } from './read-models';
import { ProductCategoryRepository } from '@repo/database/product-category';


export interface CommerceService {

    getProductDetail(
        slug: string,
    ): Promise<ProductDetail | null>;

    getProductSummary(
        id: string,
    ): Promise<ProductSummary | null>;

    getCategoryPage(
        slug: string,
    ): Promise<CategoryPage | null>;


}

export interface CommerceServiceDependencies {

    productService: ProductService;

    categoryService: CategoryService;

    productCategoryRepository: ProductCategoryRepository;

}


export class DefaultCommerceService
    implements CommerceService {

    constructor(
        private readonly productService: ProductService,
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

        return {
            
            product,
            
            categories: categories,
            
            images: product.images,

        };

    }

    async getProductSummary(
        id: string,
    ): Promise<ProductSummary | null> {
        
        const product = 
            await this.productService.getById(id);
        
        if (!product) {
            return null;
        }

        const primaryCategory =
            await this.productCategoryRepository
                .getPrimaryCategory(
                    product.id
                );
        
        if (!primaryCategory) {
            return null;
        }
        
        const category = 
                await this.categoryService
                    .getById(
                        primaryCategory,
                    );

        return {

            product,

            primaryCategory: category,

        };  

    }
    
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
    
}


export function createCommerceService(
    dependencies: CommerceServiceDependencies,
): CommerceService {

    return new DefaultCommerceService(
        dependencies.productService,
        dependencies.categoryService,
        dependencies.productCategoryRepository,
    );

}
