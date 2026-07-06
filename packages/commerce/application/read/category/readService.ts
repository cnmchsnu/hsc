
// services
import { CategoryService } from '../../../domain/category';


// types
import type {
    CategoryTree,
    BreadcrumbItem,
    CategoryNavigation,
} from "../../projections"

import type { CategoryPage } from "./type";

// builders
import {
    buildCategoryTree,
    buildBreadcrumb,
    buildCategoryNavigation,
} from "../../projections"

// errors
import { CategoryTreeError } from "./error";
import { CategoryNotFoundError } from '../../../domain/category/error';


export interface CategoryReadService {

    getCategoryPage(
        slug: string,
    ): Promise<CategoryPage | null>;

    getCategoryTree(): Promise<readonly CategoryTree[]>;

    // getNavigation(
    //     selectedSlugs: readonly string[],
    // ): Promise<CategoryNavigation>;

    getBreadcrumb(
        slug: string,
    ): Promise<readonly BreadcrumbItem[]>;

}

interface CommerceServiceDependencies {

    categoryService: CategoryService;

}

class DefaultCategoryReadService 
    implements CategoryReadService {

    constructor(
        private readonly categoryService: CategoryService,
    ) {}

    async getCategoryTree() {

        const categories = await this.categoryService.list();
            
        const tree = buildCategoryTree(categories);

        if (!tree) {
               throw new CategoryTreeError("Failed to build category tree");
        }

        return tree;

    }  

    async getBreadcrumb(
        slug: string,
    ): Promise<readonly BreadcrumbItem[]> {

        const category =
            await this.categoryService.findBySlug(slug);

        if (!category) {
            throw new CategoryNotFoundError(slug);
        }

        const path =
            await this.categoryService
                .findPathToRoot(
                    category.id
                );

        return buildBreadcrumb(path);

    }

    // async getNavigation(
    //     selectedSlugs: readonly string[],
    // ) {

    //     const categories = await this.categoryService.list();

    //     const tree = buildCategoryTree(categories);

    //     if (!tree) {
    //         throw new CategoryTreeError("Failed to build category tree");
    //     }

    //     return buildCategoryNavigation(tree, selectedSlugs);


    // }

    async getCategoryPage(
        slug: string,
    ): Promise<CategoryPage | null> {


        const category = await this.categoryService.findBySlug(slug);

        if (!category) {
            return null;
        }

        const breadcrumb = 
            await this
                .getBreadcrumb(
                    category.id
                );

        const tree =
            await this.getCategoryTree();


        return {
            category,
            breadcrumb,
            tree,
        };

    }
}

export function createCategoryReadService(
    dependencies: CommerceServiceDependencies,
): CategoryReadService {

    return new DefaultCategoryReadService(
        dependencies.categoryService,
    );

}