
// services
import { CategoryService } from '../../../domain/category';
import { ProductService } from '../../../domain/product';
import { ProductImageService } from '../../../domain/product-image';


// types
import type { Product } from '../../../domain/product';
import type { ProductSummary } from "./type";
import { ProductCategoryRepository } from '../../../../database/repositories/product-category';


export interface ProductReadService {

    getSummary(
        id: string,
    ): Promise<ProductSummary | null>;

    getSummaries(
        products: readonly Product[],
    ): Promise<ProductSummary[]>;

    getSummariesByIds(
        ids: readonly string[],
    ): Promise<ProductSummary[]>;

    getSummariesByCategory(
        categoryId: string,
    ): Promise<ProductSummary[]>;

}

export interface ProductReadServiceDependencies {

    productService: ProductService;

    productImageService: ProductImageService;

    categoryService: CategoryService;

    productCategoryRepository: ProductCategoryRepository;

}