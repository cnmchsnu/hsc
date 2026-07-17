import type { SupabaseClient } from "@supabase/supabase-js";

import type {
    Product,
    ProductList,
    ProductListOptions,
    CreateProduct,
    UpdateProduct,
    ProductRepository,
} from "../../../../../commerce/domain/product";

import type { ProductRow } from "../../../entities";



import { ProductRepositoryMapper as mapper } from "./mapper";
import { SupabaseRepositoryBase } from "../../base/SupabaseRepositoryBase";


export class SupabaseProductRepository
    extends SupabaseRepositoryBase<
    Product,
    string,
    CreateProduct,
    UpdateProduct,
    ProductListOptions,
    ProductList,
    ProductRow
    >
    implements ProductRepository {

    constructor(
        protected readonly client: SupabaseClient,
    ) {
        super(client);
    }

    protected readonly schema = "commerce";

    protected readonly table = "products";

    protected readonly createRpc = "create_product";

    protected readonly updateRpc = "update_product";

    protected readonly mapper = mapper;

    protected override buildQuery(
        options: ProductListOptions,
    ) {

        let query = super.buildQuery(options);

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


        if (options.keyword) {

            query =
                query.ilike(
                    "name",
                    `%${options.keyword}%`,
                );

        }


        switch (options.sort) {

            case "oldest":

                query =
                    query.order(
                        "created_at",
                        {
                            ascending: true,
                        },
                    );

                break;

            case "newest":

                query =
                    query.order(
                        "created_at",
                        {
                            ascending: false,
                        },
                    );

                break;

            case "name-asc":

                query =
                    query.order(
                        "name",
                        {
                            ascending: true,
                        },
                    );

                break;

            case "name-desc":

                query =
                    query.order(
                        "name",
                        {
                            ascending: false,
                        },
                    );
                break;

        }

        return query;

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

        if (!data) {
            return null;
        }

        return mapper.fromRow(data);
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

        return [...mapper.fromRows(data)];
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
            .from("products")
            .select("slug")
            .in("slug", [...slugs]);

        if (error) {
            throw new Error(error.message);
        }

        return data.map((row) => row.slug);
    }


}