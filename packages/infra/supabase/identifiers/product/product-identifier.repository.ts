import type { SupabaseClient } from "@supabase/supabase-js";

import type { ProductIdentifier } from "../../../../commerce/application";


export class SupabaseProductIdentifier
    implements ProductIdentifier {

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
            const { data, error } = await this.client
                .schema("commerce")
                .from("categories")
                .select("id")
                .in("slug", slugs);

            if (error) {
                throw error;
            }

            return data.map((row) => row.id);
        }
}