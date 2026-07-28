import type { SupabaseClient } from "@supabase/supabase-js";

import type { CategoryIdentifier } from "../../../../commerce/application";


export class SupabaseCategoryIdentifier
    implements CategoryIdentifier {

        constructor(
            private readonly client: SupabaseClient,
        ) {}

        async resolveIdBySlug(
            slug: string,
        ): Promise<string | null> {
            const { data, error } = await this.client
                .schema("commerce")
                .from("categories")
                .select("id")
                .eq("slug", slug)
                .single();

            if (error) {
                throw error;
            }

            if (!data) {
                return null;
            }

            return data.id;
        }

        async resolveIdsBySlugs(
            slugs: readonly string[],
            ): Promise< readonly string[]> {

            let slugsArray: string[] = [];
            if (typeof slugs === 'string') {
                slugsArray = [slugs];
            } else if (Array.isArray(slugs)) {
                slugsArray = [...slugs]; // 複製出一份乾淨的可變陣列
            } else if (slugs) {
                // 防止是其他種類的唯讀類陣列物件 (Array-like)
                slugsArray = Array.from(slugs); 
            }

            const cleanSlugs = slugsArray
                .flatMap(slug => (typeof slug === 'string' ? slug.split(',') : []))
                .map(slug => slug.trim())
                .filter(Boolean);

            const { data, error } = await this.client
                .schema("commerce")
                .from("categories")
                .select("id")
                .in("slug", cleanSlugs);



            if (error) {
                throw error;
            }

            return data.map((row) => row.id);
        }
}