
// servies
import type { ProductService } from "../../../domain/product";
import type { ProductCategoryService} from "../../../domain/product-category";
import type { ProductReadService } from "../../read/product";
import type { CategoryResolveService } from "../../identifiers";

// types
import type {
    ProductSearchRequest,
    ProductSearchResponse
} from "./type";



export interface ProductSearchService {

    search(
        criteria: ProductSearchRequest,
    ): Promise<ProductSearchResponse>;

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
        request: ProductSearchRequest,
    ): Promise<ProductSearchResponse> {

        const categoryIds = await this.categoryResolveService
            .resolveIdsBySlugs(
                request.filter?.categorySlugs ?? [],
            );

        const productIds = await this.productCategoryService
            .getByCategoryIds(
                [...categoryIds],
            );


        const products = await this.productService.search({
            page: request.page ?? 1,
            pageSize: request.pageSize ?? 10,
            ...(request.filter?.keyword !== undefined && { keyword: request.filter.keyword }),
            ...(request.filter?.minPrice !== undefined && { minPrice: request.filter.minPrice }),
            ...(request.filter?.maxPrice !== undefined && { maxPrice: request.filter.maxPrice }),
            ...(request.sort !== undefined && { sort: request.sort }),
            productIds: productIds.map(relation => relation.product_id),
            status: request.filter?.status ?? ["active"],
        });

        const summaries = await this.productReadService.getProductSummaries(
            products.items,
        );

        return {
            items: summaries,
            pagination: {
                page: products.page,
                pageSize: products.pageSize,
                total: products.total,
                hasMore: products.page * products.pageSize < products.total,
            },
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

