
import type { CategoryIdentifier } from "./category-identifier";
import { NotFoundError } from "@repo/shared/application";


export interface CategoryResolveService {

    resolveIdBySlug(
        slug: string,
    ): Promise<string | null>;

    resolveIdsBySlugs(
        slugs: readonly string[],
    ): Promise<readonly string[]>;

}

export function createCategoryResolveService(
    categoryIdentifier: CategoryIdentifier,
): CategoryResolveService {

    return {

        async resolveIdBySlug(
            slug: string,
        ): Promise<string | null> {

            if (!slug) {
                return null;
            }

            const id = 
                await categoryIdentifier.resolveIdBySlug(slug);

            if (!id) {
                throw new NotFoundError(`Category with slug ${slug} not found`);
            }

            return id;
        },

        async resolveIdsBySlugs(
            slugs: readonly string[],
        ): Promise<readonly string[]> {

            if (!slugs || slugs.length === 0) {
                return [];
            }

            const ids = 
                await categoryIdentifier.resolveIdsBySlugs(slugs);

            if (!ids || ids.length === 0) {
                
                throw new NotFoundError(`Categories with slugs ${slugs.join(", ")} not found`);
            }

            return ids;
        }

    };
}