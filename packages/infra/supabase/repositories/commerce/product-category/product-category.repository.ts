import type { SupabaseClient } from "@supabase/supabase-js";


import {
    CreateProductCategory,
    ProductCategory,
    ProductCategoryRepository
} from "../../../../../commerce/domain/product-category";

import { ProductCategoryRepositoryMapper as mapper } from "./mapper";

import { ProductCategoryRow } from "../../../entities";

import { SupabaseRepositoryBase } from "../../base/SupabaseRepositoryBase";

export class SupabaseProductCategoryRepository
    extends SupabaseRepositoryBase<
        ProductCategory,
        string,
        CreateProductCategory,
        any,
        any,
        any,
        ProductCategoryRow
    >
    implements ProductCategoryRepository {

        constructor(
            protected readonly client: SupabaseClient,
        ) {
            super(client);
        }
        

        protected readonly schema = "commerce";

        protected readonly table = "product_categories";

        protected readonly createRpc = "create_product_category";

        protected readonly updateRpc = "update_product_category";

        protected readonly mapper = mapper;

        // Read Single
        
        async getByProductId(
            productId: string,
        ): Promise<readonly ProductCategory[]> {
            const { data, error } = await this
                .from()
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
            const { data, error } = await this
                .from()
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
            const { data, error } = await this
                .from()
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
            const { data, error } = await this
                .from()
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
            const { data, error } = await this
                .from()
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
            const { data, error } = await this
                .from()
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

        // Delete

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


        override async deleteMany(
            ids: readonly string[],
            relations: readonly ProductCategory[],
        ): Promise<void> {

            const { error } = await this.client
                .schema("commerce")
                .rpc("delete_product_categories", {
                    product_categories: relations
                });

            if (error) {
                throw error;
            }
        }
    
}
