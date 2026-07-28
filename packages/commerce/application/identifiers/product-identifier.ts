export interface ProductIdentifier {

        // Resolve
        
        resolveIdBySlug(
            slug: string,
        ): Promise<string | null>;
    
        resolveIdsBySlugs(
            slugs: readonly string[],
        ): Promise<readonly string[] | null>;

}