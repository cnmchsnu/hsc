
// servies
import type { ProductService } from "../../../domain/product";
import type { ProductCategoryService} from "../../../domain/product-category";
import type { ProductReadService } from "../../read/product";
import type { CategoryResolveService } from "../../identifiers";

// types
import type {
    ProductSearchCriteria,
    ProductSearchResult
} from "./type";



export interface ProductSearchService {

    search(
        criteria: ProductSearchCriteria,
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
        criteria: ProductSearchCriteria,
    ): Promise<ProductSearchResult> {

        const categoryIds = await this.categoryResolveService
            .resolveIdsBySlugs(
                criteria.categorySlugs ?? [],
            );

        const productIds = await this.productCategoryService
            .getByCategoryIds(
                [...categoryIds],
            );


        const products = await this.productService.search({
            page: criteria.page,
            pageSize: criteria.pageSize,
            keyword: criteria.keyword,
            minPrice: criteria.minPrice,
            maxPrice: criteria.maxPrice,
            productIds: productIds.map(relation => relation.product_id),
            status: ["active"],
            sort: criteria.sort,
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

