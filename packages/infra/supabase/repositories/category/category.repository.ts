import type { SupabaseClient } from "@supabase/supabase-js";

import type {
    Category,
} from "../../../../commerce/domain/category";

import { toCategory } from "@repo/database/mappers";

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

            return toCategory(data);
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

            return toCategory(data);
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

            return data.map(toCategory);
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

            return data.map(toCategory);
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

            return data.map(toCategory);
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
            category: Category,
        ): Promise<void> {
            const { error } = await this.client
                .schema("commerce")
                .from("categories")
                .insert({
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    status: category.status,
                    display_order: category.displayOrder,
                    description: category.description,
                    parent_id: category.parentId,
                });

            if (error) {
                throw error;
            }
        }

        async update(
            category: Category,
        ): Promise<void> {
            const { error } = await this.client
                .schema("commerce")
                .from("categories")
                .update({
                    name: category.name,
                    slug: category.slug,
                    status: category.status,
                    display_order: category.displayOrder,
                    description: category.description,
                    parent_id: category.parentId,
                })
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
            categories: readonly Category[],
        ): Promise<void> {
            const { error } = await this.client
                .schema("commerce")
                .from("categories")
                .insert(categories.map((cat) => ({
                    name: cat.name,
                    slug: cat.slug,
                    status: cat.status,
                    display_order: cat.displayOrder,
                    description: cat.description,
                    parent_id: cat.parentId,
                })));

            if (error) {
                throw error;
            }
        }

        async updateMany(
            categories: readonly Category[],
        ): Promise<void> {
            const { error } = await this.client
                .schema("commerce")
                .rpc(
                    "update_categories",
                    {
                        p_categories: categories,
                    }
                );

            if (error) {
                throw error;
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

            return data.map(toCategory);
        }


}
