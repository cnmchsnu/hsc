import { DefaultProductAggregateLoader, ProductAggregateLoader } from "../../aggragate";
import {
    PriceService,
    InventoryItemService,
    SKUVariantValueRepository,
    VariantOptionValueService,
    VariantOptionService,
    SKUService,
    ProductImageService,
    ProductCategoryService,
    ProductService,
    CategoryService
} from "../../../domain";
import { TransactionRunner } from "@repo/infra/transaction";



export interface CommerceDependencies {

    transactionRunner: TransactionRunner;

    categoryService: CategoryService;

    productService: ProductService;
    
    productCategoryService: ProductCategoryService;
    
    productImageService: ProductImageService;
    
    skuService: SKUService;
    
    variantOptionService: VariantOptionService;
    
    variantOptionValueService: VariantOptionValueService;
    
    priceService: PriceService;
    
    inventoryItemService: InventoryItemService;

    skuVariantValueRepository: SKUVariantValueRepository;

}


export function createProductManageAggregateLoader(
    deps: CommerceDependencies,
): ProductAggregateLoader {

    return new DefaultProductAggregateLoader(
        deps.categoryService,
        deps.productService,
        deps.productCategoryService,
        deps.productImageService,
        deps.priceService,
        deps.inventoryItemService,
        deps.skuService,
        deps.variantOptionService,
        deps.variantOptionValueService,
        deps.skuVariantValueRepository
    );
}