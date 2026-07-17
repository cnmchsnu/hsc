import type { SupabaseClient } from "@supabase/supabase-js";


import { CreateProductCategory, ProductCategory, ProductCategoryRepository } from "../../../../../commerce/domain/product-category";

import { ProductCategoryRepositoryMapper as mapper } from "./mapper";

export class SupabaseProductCategoryRepository
    implements ProductCategoryRepository {
        constructor(
            private readonly client: SupabaseClient,
        ) {}

        // Read Single
        
        async getByProductId(
            productId: string,
        ): Promise<readonly ProductCategory[]> {
            const { data, error } = await this.client
                .schema("commerce")
                .from("product_categories")
                .select("*")
                .eq("product_id", productId);

            if (error) {
                throw error;
            }

            if (!data) {
                return [];
            }

            return mapper.fromRows(data);
        }

        async getByCategoryId(
            categoryId: string,
        ): Promise<readonly ProductCategory[]> {
            const { data, error } = await this.client
                .schema("commerce")
                .from("product_categories")
                .select("*")
                .eq("category_id", categoryId);

            if (error) {
                throw error;
            }
            
            if (!data) {
                return [];
            }

            return mapper.fromRows(data);
        }

        async getPrimaryByProductId(
            productId: string,
        ): Promise<ProductCategory | null> {
            const { data, error } = await this.client
                .schema("commerce")
                .from("product_categories")
                .select("*")
                .eq("product_id", productId)
                .eq("is_primary", true)
                .maybeSingle();
            
            if (error) {
                throw error;
            }

            if (!data) {
                return null;
            }

            return mapper.fromRow(data);
        }

        // Read Batch

        async getByProductIds(
            productIds: string[],
        ): Promise<readonly ProductCategory[]> {
            const { data, error } = await this.client
                .schema("commerce")
                .from("product_categories")
                .select("*")
                .in("product_id", [...productIds]);

            if (error) {
                throw error;
            }

            if (!data) {
                return [];
            }

            return mapper.fromRows(data);
        }

        async getByCategoryIds(
            categoryIds: string[],
        ): Promise<readonly ProductCategory[]> {
            const { data, error } = await this.client
                .schema("commerce")
                .from("product_categories")
                .select("*")
                .in("category_id", [...categoryIds]);

            if (error) {
                throw error;
            }

            if (!data) {
                return [];
            }
            
            return mapper.fromRows(data);
        }

        async getPrimaryByProductIds(
            productIds: string[],
        ): Promise<readonly ProductCategory[]> {
            const { data, error } = await this.client
                .schema("commerce")
                .from("product_categories")
                .select("*")
                .in("product_id", [...productIds])
                .eq("is_primary", true);

            if (error) {
                throw error;
            }

            if (!data) {
                return [];
            }

            return mapper.fromRows(data);
        }

        // Write Single

        async create(
            relation: CreateProductCategory,
        ): Promise<void> {

            const row = mapper.toCreateRow(relation);

            const { error } = await this.client
                .schema("commerce")
                .from("product_categories")
                .insert(row);

            if (error) {
                throw error;
            }

        }

        async update(
            relation: ProductCategory,
        ): Promise<void> {

            const row = mapper.toUpdateRow(relation);

            const { error } = await this.client
                .schema("commerce")
                .from("product_categories")
                .update(row)
                .eq("product_id", relation.product_id)
                .eq("category_id", relation.category_id);
            if (error) {
                throw error;
            }

        }

        async delete(
            productId: string,
            categoryId: string,
        ): Promise<void> {
            const { error } = await this.client
                .schema("commerce")
                .from("product_categories")
                .delete()
                .eq("product_id", productId)
                .eq("category_id", categoryId);

            if (error) {
                throw error;
            }

        }

        // Write Batch

        async createMany(
            relations: readonly CreateProductCategory[],
        ): Promise<void> {

            const rows = mapper.toCreateRows(relations);

            const { error } = await this.client
                .schema("commerce")
                .from("product_categories")
                .insert(rows);

            if (error) {
                throw error;
            }

        }

        async updateMany(
            relations: readonly ProductCategory[],
        ): Promise<void> {

            const rows = mapper.toUpdateRows(relations);

            const { error } = await this.client
                .schema("commerce")
                .rpc(
                    "update_product_categories", {
                        relations: rows,
                    },
                );


            if (error) {
                throw error;
            }
        }

        async deleteMany(
            relations: readonly ProductCategory[],
        ): Promise<void> {  
            const { error } = await this.client
                .schema("commerce")
                .from("product_categories")
                .delete()
                .in(
                    "product_id",
                    relations.map((relation) => relation.product_id),
                )
                .in(
                    "category_id",
                    relations.map((relation) => relation.category_id),
                );
            
            if (error) {
                throw error;
            }

        }

        async deleteManyByProductId(
            productId: string,
        ): Promise<void> {
            const { error } = await this.client
                .schema("commerce")
                .from("product_categories")
                .delete()
                .eq("product_id", productId);

            if (error) {
                throw error;
            }
        }

        async deleteManyByCategoryId(
            categoryId: string,
        ): Promise<void> {
            const { error } = await this.client
                .schema("commerce")
                .from("product_categories")
                .delete()
                .eq("category_id", categoryId);

            if (error) {
                throw error;
            }

        }
}
