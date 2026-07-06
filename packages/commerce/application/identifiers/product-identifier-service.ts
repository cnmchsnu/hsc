
import type { ProductIdentifier } from "@repo/database/identifiers";


export interface ProductResolveService {

    resolveIdBySlug(
        slug: string,
    ): Promise<string | null>;

    resolveIdsBySlugs(
        slugs: readonly string[],
    ): Promise<readonly string[]>;

}

export function createProductResolveService(
    productIdentifier: ProductIdentifier,
): ProductResolveService {

    return {

        async resolveIdBySlug(
            slug: string,
        ): Promise<string | null> {

            if (!slug) {
                return null;
            }

            const id = 
                await productIdentifier.resolveIdBySlug(slug);

            if (!id) {
                throw new Error(`Product with slug ${slug} not found`);
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
                await productIdentifier.resolveIdsBySlugs(slugs);

            if (!ids || ids.length === 0) {
                throw new Error(`Slugs not found`);
            }

            return ids;
        }

    };
}