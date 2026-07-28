import type { ProductCategory, ProductCategoryService } from "../../../../domain";

import { ProductAggregate } from "../../../aggragate";

import { ValidationError } from "@repo/shared/application";

export interface SaveProductCategoryCommand {

    category_id: string;

    product_id: string;

    is_primary: boolean;

    display_order: number;
}

export interface ProductCategorySynchronizer {

    execute(
        aggregate: ProductAggregate,
        desired: readonly SaveProductCategoryCommand[],
    ): Promise<void>;

}

class DefaultProductCategorySynchronizer
    implements ProductCategorySynchronizer {

    constructor(
        private readonly productCategoryService: ProductCategoryService,
    ) {}

    async execute(
        aggregate: ProductAggregate,
        desired: readonly SaveProductCategoryCommand[],
    ): Promise<void> {
        if (!aggregate.productId) throw new ValidationError("Product ID is required for product category synchronization.");
        if (!desired || desired.length === 0) throw new ValidationError("No product category data provided for synchronization.");

        const current = aggregate.productCategories;

        const currentMap = new Map<string, ProductCategory>(
            current.map(relation => [relation.category_id, relation])
        );

        const desiredMap = new Map<string, SaveProductCategoryCommand>(
            desired.map(relation => [relation.category_id, relation])
        );

        await Promise.all([
            this.productCategoryService.createMany(
                desired.filter(relation => !currentMap.has(relation.category_id)).map(relation => {
                    return {
                        categoryId: relation.category_id,
                        productId: aggregate.productId!,
                        isPrimary: relation.is_primary,
                        displayOrder: relation.display_order,
                    };
                }),
            ),
            
            this.productCategoryService.updateMany(
                desired.filter(relation => currentMap.has(relation.category_id)
                ? !this.equals(currentMap.get(relation.category_id) as ProductCategory, relation)
                : false).map(relation => ({
                    categoryId: relation.category_id,
                    productId: aggregate.productId!,
                    isPrimary: relation.is_primary,
                    displayOrder: relation.display_order,
                })),
            ),

            this.productCategoryService.deleteMany(
                current.filter(relation => !desiredMap.has(relation.category_id)).map(relation => {
                    return {
                        category_id: relation.category_id,
                        product_id: aggregate.productId!,
                        is_primary: relation.is_primary,
                        display_order: relation.display_order,
                    };
                }),
            ),

        ]);

    }

    private equals(
        current: ProductCategory,
        desired: SaveProductCategoryCommand
    ): boolean {
        return (

            current.is_primary === desired.is_primary &&
            current.display_order === desired.display_order

        );
    }



}

export function createProductCategorySynchronizer(
    productCategoryService: ProductCategoryService,
): ProductCategorySynchronizer {
    return new DefaultProductCategorySynchronizer(productCategoryService);
}