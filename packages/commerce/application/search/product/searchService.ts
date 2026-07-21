
// servies
import type { ProductService } from "../../../domain/product";
import type { ProductCategoryService} from "../../../domain/product-category";
import type { ProductReadService } from "../../read/product";
import type { CategoryResolveService } from "../../identifiers";

// types
import type {
    ProductSearchQuery,
    ProductSearchResult
} from "./type";



export interface ProductSearchService {

    search(
        criteria: ProductSearchQuery,
    ): Promise<ProductSearchResult>;

}


interface ProductSearchServiceDependencies {

    productService: ProductService;

    productCategoryService: ProductCategoryService;

    productReadService: ProductReadService;
    
    categoryResolveService: CategoryResolveService;

}




class DefaultProductSearchService
    implements ProductSearchService {
    
    constructor(
        private readonly productService: ProductService,
        private readonly productCategoryService: ProductCategoryService,
        private readonly productReadService: ProductReadService,
        private readonly categoryResolveService: CategoryResolveService,
    ) {}

    async search(
        criteria: ProductSearchQuery,
    ): Promise<ProductSearchResult> {

        const categoryIds = await this.categoryResolveService
            .resolveIdsBySlugs(
                criteria.filter?.categorySlugs ?? [],
            );

        const productIds = await this.productCategoryService
            .getByCategoryIds(
                [...categoryIds],
            );


        const products = await this.productService.search({
            page: criteria.page,
            pageSize: criteria.pageSize,
            ...(criteria.filter?.keyword !== undefined && { keyword: criteria.filter.keyword }),
            ...(criteria.filter?.minPrice !== undefined && { minPrice: criteria.filter.minPrice }),
            ...(criteria.filter?.maxPrice !== undefined && { maxPrice: criteria.filter.maxPrice }),
            ...(criteria.sort !== undefined && { sort: criteria.sort }),
            productIds: productIds.map(relation => relation.product_id),
            status: criteria.filter?.status ?? ["active"],
        });

        const summaries = await this.productReadService.getProductSummaries(
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

export function createProductSearchService(
    dependencies: ProductSearchServiceDependencies,
):  ProductSearchService {

    return new DefaultProductSearchService(
        dependencies.productService,
        dependencies.productCategoryService,
        dependencies.productReadService,
        dependencies.categoryResolveService,
    );

}

