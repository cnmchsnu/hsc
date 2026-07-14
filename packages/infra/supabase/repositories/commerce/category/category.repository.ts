import type { SupabaseClient } from "@supabase/supabase-js";

import type {
    Category,
} from "../../../../../commerce/domain/category";

import type {
    CreateCategory,
    UpdateCategory,
} from "../../../../../commerce/application/command/category";

import { CategoryRepositoryMapper as mapper } from "./to-category";

import type { CategoryRepository } from "@repo/database/repositories";

export class SupabaseCategoryRepository
    implements CategoryRepository {

        constructor(
            private readonly client: SupabaseClient,
        ) {}

        // Read Single

        async findById(
            id: string,
        ): Promise<Category | null> {
            const { data, error } = await this.client
                .schema("commerce")
                .from("categories")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                throw error;
            }

            if (!data) {
                return null;
            }

            return mapper.fromRow(data);
        }

        async findBySlug(
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

        // Read Batch

        async findByIds(
            ids: readonly string[],
        ): Promise<Category[]> {

            if (ids.length === 0) {
                return [];
            }

            const { data, error } = await this.client
                .schema("commerce")
                .from("categories")
                .select("*")
                .in("id", [...ids]);

            if (error) {
                throw error;
            }

            return [...mapper.fromRows(data)];
        }

        async findBySlugs(
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

        // Exists Single

        async exists(
            id: string
        ): Promise<boolean> {
            const { data, error } = await this.client
                .schema("commerce")
                .from("categories")
                .select("id")
                .eq("id", id)
                .limit(1);

            if (error) {
                throw error;
            }

            return !!data;
        }

        // Exists Batch

        async listExistingIds(
            ids: readonly string[],
        ): Promise<string[]> {
            
            if (ids.length === 0) {
                return [];
            }

            const { data, error } = await this.client
                .schema("commerce")
                .from("categories")
                .select("id")
                .in("id", [...ids]);
            
            if (error) {
                throw error;
            }

            return data.map((row) => row.id);
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

        // Write Single

        async create(
            category: CreateCategory,
        ): Promise<void> {
            const row = mapper.toCreateRow(category);

            const { error } = await this.client
                .schema("commerce")
                .from("categories")
                .insert(row);

            if (error) {
                throw error;
            }
        }

        async update(
            category: UpdateCategory,
        ): Promise<void> {
            const row = mapper.toUpdateRow(category);

            const { error } = await this.client
                .schema("commerce")
                .from("categories")
                .update(row)
                .eq("id", category.id);

            if (error) {
                throw error;
            }
        }

        async delete(
            id: string,
        ): Promise<void> {

            const exists = await this.exists(id);

            if (!exists) {
                return;
            }

            const { error } = await this.client
                .schema("commerce")
                .from("categories")
                .delete()
                .eq("id", id);
            
            if (error) {
                throw error;
            }
        }

        // Write Batch

        async createMany(
            categories: readonly CreateCategory[],
        ): Promise<void> {
            const rows = mapper.toCreateRows(categories);

            const { error } = await this.client
                .schema("commerce")
                .from("categories")
                .insert(rows);

            if (error) {
                throw error;
            }
        }

        async updateMany(
            categories: readonly UpdateCategory[],
        ): Promise<void> {
            const rows = mapper.toUpdateRows(categories);

            for (let index = 0; index < categories.length; index += 1) {
                const category = categories[index];
                const row = rows[index];

                const { error } = await this.client
                    .schema("commerce")
                    .from("categories")
                    .update(row)
                    .eq("id", category.id);

                if (error) {
                    throw error;
                }
            }
        }
        
        async deleteMany(
            ids: readonly string[],
        ): Promise<void> {

            const Ids = await this.listExistingIds(ids);

            if (Ids.length === 0) {
                return;
            }

            const { error } = await this.client
                .schema("commerce")
                .from("categories")
                .delete()
                .in("id", [...Ids]);

            if (error) {
                throw error;
            }
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
