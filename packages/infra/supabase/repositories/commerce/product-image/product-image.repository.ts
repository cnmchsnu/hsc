import type { SupabaseClient } from '@supabase/supabase-js';

import type {
    ProductImage,
    CreateProductImage,
    UpdateProductImage,
    ProductImageRepository,
} from '../../../../../commerce/domain/product-image';



import { SupabaseRepositoryBase } from '../../base/SupabaseRepositoryBase';
import { ProductImageRepositoryMapper as mapper } from './to-product-image';
import { ProductImageRow } from '../../../entities';



export class SupabaseProductImageService
    extends SupabaseRepositoryBase<
        ProductImage,
        string,
        CreateProductImage,
        UpdateProductImage,
        any,
        any,
        ProductImageRow
    >
    implements ProductImageRepository {

    constructor(
        protected readonly client: SupabaseClient,
    ) {
        super(client);
    } 


    protected readonly schema = 'commerce';

    protected readonly table = 'product_images';

    protected readonly createRpc = 'create_product_image';

    protected readonly updateRpc = 'update_product_image';

    protected readonly mapper = mapper;

    // Read Single

    async getPrimaryById(
        productId: string,
    ): Promise<ProductImage | null> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("product_images")
            .select("*")
            .eq("product_id", productId)
            .eq("type", "primary")
            .single();

        if (error) {
            throw new Error(`Error fetching primary image for product ${productId}: ${error.message}`);
        }

        if (!data) {
            return null;
        }

        return mapper.fromRow(data);
    }

    async getThumbnailById(
        productId: string,
    ): Promise<ProductImage | null> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("product_images")
            .select("*")
            .eq("product_id", productId)
            .single();
        
        if (error) {
            throw new Error(`Error fetching thumbnail image for product ${productId}: ${error.message}`);
        }

        if (!data) {
            return null;
        }

        return mapper.fromRow(data);
    }

    async getAllById(
        productId: string,
    ): Promise<readonly ProductImage[] | null> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("product_images")
            .select("*")
            .eq("product_id", productId)
            .order("display_order", { ascending: true });

        if (error) {
            throw new Error(`Error fetching all images for product ${productId}: ${error.message}`);
        }

        if (!data) {
            return null;
        }

        return mapper.fromRows(data);
    }
    

    // Read Batch

    async getPrimaryByIds(
        productIds: readonly string[],
    ): Promise<readonly ProductImage[]> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("product_images")
            .select("*")
            .in("product_id", productIds)
            .eq("is_primary", true);

        if (error) {
            throw new Error(`Error fetching primary images for products ${productIds.join(", ")}: ${error.message}`);
        }

        if (!data) {
            return [];
        }

        return mapper.fromRows(data);
    }

    async getThumbnailByIds(
        productIds: readonly string[],
    ): Promise<readonly ProductImage[]> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("product_images")
            .select("*")
            .in("product_id", productIds)
            .eq("is_primary", true);

        if (error) {
            throw new Error(`Error fetching thumbnail images for products ${productIds.join(", ")}: ${error.message}`);
        }

        if (!data) {
            return [];
        }

        return mapper.fromRows(data);
    }


}