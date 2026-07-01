import type { SupabaseClient } from "@supabase/supabase-js";

import type {
    Product,
} from "@repo/commerce/types";

import type {
    ProductRepository,
} from "../interfaces/";

export class SupabaseProductRepository
    implements ProductRepository {

    constructor(
        private readonly client: SupabaseClient,
    ) {}

    async findById(
        id: string,
    ) {
        const { data, error } = await this.client
            .from("commerce")
            .select(`
                *, 
                product_images(*)
            `)
            .eq("id", id)
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        if (!data) {
            return null;
        }

        return data;
    }

    // async findBySlug(
    //     slug: string,
    // ){
    //     const { data, error } = await this.client
    //         .from("commerce")
    //         .select(`
    //             *, 
    //             product_images(*)
    //         `)
    //         .eq("slug", slug)
    //         .maybeSingle();
    // }

    // async list(): Promise<Product[]> {
    //     const { data, error } = await this.client
    //         .from("commerce")
    //         .select(`
    //             *, 
    //             product_images(*)
    //         `);

    //     if (error) {
    //         throw new Error(error.message);
    //     }

    //     return data;
    // }

    // async search(
    //     keyword: string,
    // ): Promise<Product[]> {
    //     const { data, error } = await this.client
    //         .from("commerce")
    //         .select(`
    //             *, 
    //             product_images(*)
    //         `)
    //         .ilike("name", `%${keyword}%`);

    //     if (error) {
    //         throw new Error(error.message);
    //     }

    //     return data;
    // }

    // async create(
    //     product: Product,
    // ): Promise<void> {
    //     const { error } = await this.client
    //         .from("commerce")
    //         .insert(product);

    //     if (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // async update(
    //     product: Product,
    // ): Promise<void> {
    //     const { error } = await this.client
    //         .from("commerce")
    //         .update(product)
    //         .eq("id", product.id);
    //     if (error) {
    //         throw new Error(error.message);
    //     }
    // }
}