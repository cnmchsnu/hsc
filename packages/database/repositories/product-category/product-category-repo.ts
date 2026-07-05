export interface ProductCategoryRepository {

    listCategoryIds(

        productId: string,

    ): Promise<string[]>;

    listProductIds(

        categoryId: string,

    ): Promise<string[]>;
    
    getPrimaryCategory(

        productId: string,
        
    ): Promise<string | null>;

    listPrimaryCategories(
        productIds: readonly string[],
    ): Promise<ReadonlyMap<string, string>>;

}