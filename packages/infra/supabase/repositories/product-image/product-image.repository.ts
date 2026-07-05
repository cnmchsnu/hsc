import type { SupabaseClient } from '@supabase/supabase-js';

import type {
    ProductImage,
} from '../../../../commerce/domain/product-image';


import type { ProductImageRepository } from '@repo/database/repositories';

import { toProductImage } from '@repo/database/mappers';


export function groupBy<
    T,
    K,
>(
    items: readonly T[],
    keySelector: (
        item: T,
    ) => K,
): Map<K, T[]> {

    const result =
        new Map<K, T[]>();

    for (const item of items) {

        const key =
            keySelector(item);

        const group =
            result.get(key);

        if (group) {

            group.push(item);

        } else {

            result.set(
                key,
                [item],
            );

        }

    }

    return result;

}



export class SupabaseProductImageService
    implements ProductImageRepository {

    constructor(
        private readonly client: SupabaseClient,
    ) {} 

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

        return toProductImage(data);
    }

    async getThumbnailById(
        productId: string,
    ): Promise<ProductImage | null> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("product_images")
            .select("*")
            .eq("product_id", productId)
            .eq("type", "thumbnail")
            .single();
        
        if (error) {
            throw new Error(`Error fetching thumbnail image for product ${productId}: ${error.message}`);
        }

        if (!data) {
            return null;
        }

        return toProductImage(data);
    }

    async getAllById(
        productId: string,
    ): Promise<ProductImage[] | null> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("product_images")
            .select("*")
            .eq("product_id", productId);

        if (error) {
            throw new Error(`Error fetching all images for product ${productId}: ${error.message}`);
        }

        if (!data) {
            return null;
        }

        return data.map(toProductImage);
    }
    

    // Read Batch

    async getPrimaryByIds(
        productIds: readonly string[],
    ): Promise<ProductImage[]> {
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

        return data.map(toProductImage);
    }

    async getThumbnailByIds(
        productIds: readonly string[],
    ): Promise<ProductImage[]> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("product_images")
            .select("*")
            .in("product_id", productIds)
            .eq("is_primary", false);

        if (error) {
            throw new Error(`Error fetching thumbnail images for products ${productIds.join(", ")}: ${error.message}`);
        }

        if (!data) {
            return [];
        }

        return data.map(toProductImage);
    }

    // Exists Single

    async existsIds(
        id: string,
    ): Promise<boolean> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("product_images")
            .select("id")
            .eq("id", id)
            .single();

        if (error) {
            throw new Error(`Error checking existence of product image ${id}: ${error.message}`);
        }

        return !!data;
    }

    // Exists Batch

    async listExistingIds(
        ids: readonly string[],
    ): Promise<string[]> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("product_images")
            .select("id")
            .in("id", ids);

        if (error) {
            throw new Error(`Error checking existence of product images ${ids.join(", ")}: ${error.message}`);
        }

        return data.map((row) => row.id);
    }

    // Write Single

    async create(
        productImage: ProductImage,
    ): Promise<void> {
        const { error } = await this.client
            .schema("commerce")
            .from("product_images")
            .insert(productImage);

        if (error) {
            throw new Error(`Error creating product image: ${error.message}`);
        }
    }

    async update(
        productImage: ProductImage,
    ): Promise<void> {

        const existing = await this.existsIds(productImage.id);

        if (!existing) {
            throw new Error(`Product image with id ${productImage.id} does not exist.`);
        }

        const { error } = await this.client
            .schema("commerce")
            .from("product_images")
            .update(productImage)
            .eq("id", productImage.id);
        
        if (error) {
            throw new Error(`Error updating product image ${productImage.id}: ${error.message}`);
        }
    }

    async delete(
        id: string,
    ): Promise<void> {

        const existing = await this.existsIds(id);

        if (!existing) {
            return; // No need to delete if it doesn't exist
        }

        const { error } = await this.client
            .schema("commerce")
            .from("product_images")
            .delete()
            .eq("id", id);

        if (error) {
            throw new Error(`Error deleting product image ${id}: ${error.message}`);
        }
    }

    // Write Batch

    async createMany(
        productImages: readonly ProductImage[],
    ): Promise<void> {
        const { error } = await this.client
            .schema("commerce")
            .from("product_images")
            .insert(productImages);

        if (error) {
            throw new Error(`Error creating product images: ${error.message}`);
        }

    }

    async updateMany(
        productImages: readonly ProductImage[],
    ): Promise<void> {
        const  { error } = await this.client
            .schema("commerce")
            .rpc("update_product_images", {
                product_images: productImages,
            });

        
        if (error) {
            throw new Error(`Error updating product images: ${error.message}`);
        }

    }

    async deleteMany(
        ids: readonly string[],
    ): Promise<void> {
        const existingIds = await this.listExistingIds(ids);

        if (existingIds.length === 0) {
            return; // No need to delete if none exist
        }

        const { error } = await this.client
            .schema("commerce")
            .from("product_images")
            .delete()
            .in("id", existingIds);
        
        if (error) {
            throw new Error(`Error deleting product images ${existingIds.join(", ")}: ${error.message}`);
        }
    }
}