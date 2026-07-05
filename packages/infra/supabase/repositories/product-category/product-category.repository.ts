import type { SupabaseClient } from "@supabase/supabase-js";

import type {
    ProductCategoryRepository,
} from "@repo/database/repositories";

export class SupabaseProductCategoryRepository
    implements ProductCategoryRepository {
        constructor(
            private readonly client: SupabaseClient,
        ) {}

        async listCategoryIds(
            productId: string,
        ): Promise<string[]> {
            const { data, error } = await this.client
                .schema("commerce")
                .from("product_categories")
                .select("category_id")
                .eq("product_id", productId);

            if (error) {
                throw new Error(`Error fetching category IDs for product ${productId}: ${error.message}`);
            }

            return data.map((row) => row.category_id);
        }

        async listProductIds(
            categoryId: string,
        ): Promise<string[]> {
            const { data, error } = await this.client
                .schema("commerce")
                .from("product_categories")
                .select("product_id")
                .eq("category_id", categoryId);

            if (error) {
                throw new Error(`Error fetching product IDs for category ${categoryId}: ${error.message}`);
            }

            return data.map((row) => row.product_id);
        }

        async getPrimaryCategory(
            productId: string,
        ): Promise<string | null> {
            const { data, error } = await this.client
                .schema("commerce")
                .from("product_categories")
                .select("category_id")
                .eq("product_id", productId)
                .eq("display_order", 0)
                .maybeSingle();

            if (error) {
                throw new Error(`Error fetching primary category for product ${productId}: ${error.message}`);
            }

            return data?.category_id || null;
        }

        async listPrimaryCategories(
            productIds: readonly string[],
        ): Promise<ReadonlyMap<string, string>> {

            if (productIds.length === 0) {
                return new Map();
            }

            const {
                data,
                error,
            } = await this.client
                .schema("commerce")
                .from("product_categories")
                .select(`
                    product_id,
                    category_id
                `)
                .in(
                    "product_id",
                    [...productIds],
                )
                .eq(
                    "display_order",
                    0,
                );

            if (error) {
                throw error;
            }

            const result =
                new Map<string, string>();

            for (const row of data) {

                result.set(
                    row.product_id,
                    row.category_id,
                );

            }

            return result;

        }
}