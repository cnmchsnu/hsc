import type { Category, CategoryService, CategoryStatus } from "../../../../domain";

import { ValidationError } from "@repo/shared/application";

export interface SaveCategoryCommand {

    id?: string;

    name: string;

    slug: string;

    description: string | null;

    parentId: string | null;

    status: CategoryStatus;

    displayOrder: number;

}


export interface CategorySynchronizer {

    execute(
        productId: string,
        desired: SaveCategoryCommand,
    ): Promise<Category | null>;

}

class DefaultCategorySynchronizer
    implements CategorySynchronizer {

    constructor(
        private readonly categoryService: CategoryService,
    ) {}

    async execute(
        productId: string,
        desired: SaveCategoryCommand,
    ): Promise<Category | null> {
        if (!productId) throw new ValidationError("Product ID is required for category synchronization.");

        if (!desired) throw new ValidationError("No category data provided for synchronization.");

        const [, result] = await Promise.all([
            this.categoryService.update({...desired, id: productId}),

            this.categoryService.findBySlug(desired.slug)
        ]);


        return result;
    }


}




export function createCategorySynchronizer(
    categoryService: CategoryService,
): CategorySynchronizer {
    return new DefaultCategorySynchronizer(categoryService);
}