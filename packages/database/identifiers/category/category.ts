export interface CategoryIdentifier {

        // Resolve

        resolveIdBySlug(
            slug: string,
        ): Promise<string | null>;
    
        resolveIdsBySlugs(
            slugs: readonly string[],
        ): Promise<readonly string[] | null>;

}