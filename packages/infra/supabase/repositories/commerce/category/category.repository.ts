import type { SupabaseClient } from "@supabase/supabase-js";

import type {
    Category,
    CreateCategory,
    UpdateCategory,
    CategoryRepository
} from "../../../../../commerce/domain/category";


import { CategoryRepositoryMapper as mapper } from "./to-category";

import type { CategoryRow } from "../../../entities";

import { SupabaseRepositoryBase } from "../../base/SupabaseRepositoryBase";


export class SupabaseCategoryRepository
    extends SupabaseRepositoryBase<
        Category,
        string,
        CreateCategory,
        UpdateCategory,
        any,
        any,
        CategoryRow
    >

    implements CategoryRepository {

        constructor(
            protected readonly client: SupabaseClient,
        ) {
            super(client);
        }

        protected readonly schema = "commerce";

        protected readonly table = "categories";

        protected readonly createRpc = "create_category";

        protected readonly updateRpc = "update_category";

        protected readonly mapper = mapper;


        async getBySlug(
            slug: string,
        ): Promise<Category | null> {
            const { data, error } = await this.client
                .schema("commerce")
                .from("categories")
                .select("*")
                .eq("slug", slug)
                .single();

            if (error) {
                throw error;
            }

            if (!data) {
                return null;
            }

            return mapper.fromRow(data);
        }


        async getBySlugs(
            slugs: readonly string[],
        ): Promise<Category[]> {

            if (slugs.length === 0) {
                return [];
            }

            const { data, error } = await this.client
                .schema("commerce")
                .from("categories")
                .select("*")
                .in("slug", [...slugs]);

            if (error) {
                throw error;
            }

            return [...mapper.fromRows(data)];
        }

        // Query

        async list(): Promise<Category[]> {
            const { data, error } = await this.client
                .schema("commerce")
                .from("categories")
                .select("*");  

            if (error) {
                throw error;
            }

            return [...mapper.fromRows(data)];
        }

  

        async listExistingSlugs(
            slugs: readonly string[],
        ): Promise<readonly string[]> {

            if (slugs.length === 0) {
                return [];
            }

            const { data, error } = await this.client
                .schema("commerce")
                .from("categories")
                .select("slug")
                .in("slug", [...slugs]);
            
            if (error) {
                throw error;
            }

            return data.map((row) => row.slug);
        }


        // Others

        async findPathToRoot(
            categoryId: string,
        ): Promise<Category[]> {

            const {
                data,
                error,
            } = await this.client
                .schema("commerce")
                .rpc(
                    "get_category_path",
                    {
                        p_category_id: categoryId,
                    },
                );

            if (error) {
                throw error;
            }

            return [...mapper.fromRows(data)];
        }


}
