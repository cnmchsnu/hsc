
import type { CategoryIdentifier } from "@repo/database/identifiers";


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
                throw new Error(`Category with slug ${slug} not found`);
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
                
                throw new Error(`Slugs not found`);
            }

            return ids;
        }

    };
}