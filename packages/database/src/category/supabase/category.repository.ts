import type { SupabaseClient } from "@supabase/supabase-js";

import type {
    Category,
} from "@repo/commerce/category";

import { toCategory } from "../mappers";

import type {
    CategoryRepository,
} from "../interfaces";

export class SupabaseCategoryRepository
    implements CategoryRepository {

        constructor(
            private readonly client: SupabaseClient,
        ) {}

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

        async findManyByIds(
            ids: readonly string[],
        ): Promise<Category[]> {

            if (ids.length === 0) {
                return [];
            }

            const {
                data, error
            } = await this.client
                .schema("commerce")
                .from("categories")
                .select("*")
                .in(
                    "id", 
                    [...ids]
                );

            if (error) {
                throw error;
            }

            return data.map(toCategory);
        }

    }
