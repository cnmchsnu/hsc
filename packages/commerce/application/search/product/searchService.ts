
// servies
import type { ProductService } from "../../../domain/product";
import type { ProductReadService } from "../../read/product";

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


export interface ProductSearchServiceDependencies {

    productService: ProductService;

    productReadService: ProductReadService;

}




export class DefaultProductSearchService
    implements ProductSearchService {
    
    constructor(
        private readonly productService: ProductService,
        private readonly productReadService: ProductReadService,
    ) {}

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
        dependencies.productReadService,
    );

}

