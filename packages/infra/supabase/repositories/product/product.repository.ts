import type { SupabaseClient } from "@supabase/supabase-js";

import type {
    Product,
    ProductList,
    ProductListOptions,
} from "../../../../commerce/domain/product";


import type { ProductRepository } from "@repo/database/repositories";

import { toProduct } from "@repo/database/mappers";


export class SupabaseProductRepository
    implements ProductRepository {

    constructor(
        private readonly client: SupabaseClient,
    ) {}

    private createListQuery(
        options: ProductListOptions,
    ) {

        let query =
            this.client
                .schema("commerce")
                .from("products")
                .select(
                    "*",
                    {
                        count: "exact",
                    },
                );

        if (options.status?.length) {

            query =
                query.in(
                    "status",
                    options.status,
                );

        }

        if (options.productIds?.length) {

            query =
                query.in(
                    "id",
                    options.productIds,
                );
        }

        if (options.minPrice) {

            query = 
                query.gte(
                    "price",
                    options.minPrice,
                );

        }

        if (options.maxPrice) {

            query = 
                query.lte(
                    "price",
                    options.maxPrice,
                );

        }

        if (options.keyword) {

            query =
                query.ilike(
                    "name",
                    `%${options.keyword}%`,
                );

        }


        switch (options.sort) {

            case "price-asc":

                query =
                    query.order(
                        "price",
                        {
                            ascending: true,
                        },
                    );

                break;

            case "price-desc":

                query =
                    query.order(
                        "price",
                        {
                            ascending: false,
                        },
                    );

                break;

            case "oldest":

                query =
                    query.order(
                        "created_at",
                        {
                            ascending: true,
                        },
                    );

                break;

            default:

                query =
                    query.order(
                        "created_at",
                        {
                            ascending: false,
                        },
                    );

        }

        const from =
            (options.page - 1)
            * options.pageSize;

        query =
            query.range(
                from,
                from + options.pageSize - 1,
            );

        return query;

    }

    // Read Single

    async findById(
        id: string,
    ): Promise<Product | null> {
        
        const { data, error } = await this.client
            .schema("commerce")
            .from("products")
            .select(`*`)
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

    async findBySlug(
        slug: string,
    ): Promise<Product | null> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("products")
            .select(`*`)
            .eq("slug", slug)
            .maybeSingle();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    // Read Batch

    async findByIds(
        ids: readonly string[],
    ): Promise<Product[]> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("products")
            .select(`*`)
            .in("id", ids);
        
        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    async findBySlugs(
        slugs: readonly string[],
    ): Promise<Product[]> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("products")
            .select(`*`)
            .in("slug", slugs);
        
        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    // Query

    async list(): Promise<Product[]> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("products")
            .select("*");  

        if (error) {
            throw error;
        }

        return data.map(toProduct);
    
    }

    async search(
        options: ProductListOptions,
    ): Promise<ProductList> {

        const query =
            this.createListQuery(options);

        const { data, error, count, } = await query;

        if (error) {
            throw error;
        }

        return {

            items:
                data.map(toProduct),

            total:
                count ?? 0,

            page:
                options.page,

            pageSize:
                options.pageSize,

        };

    }

    // Exists Single

    async exists(
        id: string,
    ): Promise<boolean> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("products")
            .select("id")
            .eq("id", id)
            .limit(1);

        if (error) {
            throw new Error(error.message);
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
            .from("products")
            .select("id")
            .in("id", [...ids]);
        
        if (error) {
            throw new Error(error.message);
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
            .from("products")
            .select("slug")
            .in("slug", [...slugs]);

        if (error) {
            throw new Error(error.message);
        }

        return data.map((row) => row.slug);
    }

    // Write Single

    async create(
        product: Product,
    ): Promise<void> {
        const { error } = await this.client
            .schema("commerce")
            .from("products")
            .insert(product);
        
        if (error) {
            throw new Error(error.message);
        }
    }

    async update(
        product: Product,
    ): Promise<void> {

        const exists = await this.exists(product.id);

        if (!exists) {
            throw new Error(`Product with id ${product.id} does not exist.`);
        }
        
        const { error } = await this.client
            .schema("commerce")
            .from("products")
            .update(product)
            .eq("id", product.id);

        if (error) {
            throw new Error(error.message);
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
            .from("products")
            .delete()
            .eq("id", id);

        if (error) {
            throw new Error(error.message);
        }
    }

    // Write Batch

    async createMany(
        products: readonly Product[],
    ): Promise<void> {
        const { error } = await this.client
            .schema("commerce")
            .from("products")
            .insert(products.map((product) => ({
                name: product.name,
                slug: product.slug,
                description: product.description,
                status: product.status,
                price: product.price,
                compareAtPrice: product.compareAtPrice,
            })));
        
        if (error) {
            throw new Error(error.message);
        }

    }

    async updateMany(
        products: readonly Product[],
    ): Promise<void> {

        const { error } = await this.client
            .schema("commerce")
            .rpc("update_products", {
                products: products.map((product: Product) => ({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    description: product.description,
                    status: product.status,
                    price: product.price,
                }))
            });

        if (error) {
            throw new Error(error.message);
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
            .from("products")
            .delete()
            .in("id", [...Ids]);
        
        if (error) {
            throw new Error(error.message);
        }
    }
}