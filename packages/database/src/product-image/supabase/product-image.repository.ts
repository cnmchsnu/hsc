import type { SupabaseClient } from '@supabase/supabase-js';

import type {
    ProductImageRepository
} from '../interface';

import type {
    ProductImage,
} from '@repo/commerce/product-image';


import { toProductImage } from '../mappers/';


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

    async get_by_id(
        id: string,
    ) {
        const { data, error } =
            await this.client
                .schema('commerce')
                .from('product_images')
                .select('*')
                .eq('product_id', id)
                .single();
        
        if (error) {
            throw error;
        }

        if (!data) {
            return null;
        }

        return data;
    }

    async list_by_product_id(
        productId: string,
    ) {
        const { data, error } =
            await this.client
                .schema('commerce')
                .from('product_images')
                .select('*')
                .order('display_order', { ascending: true })
                .eq('product_id', productId);

        if (error) {
            throw error;
        }

        if (!data) {
            return [];
        }

        return data;
    }

    async get_thumbnail(
        productId: string,
    ) {
        const { data, error } =
            await this.client
                .schema('commerce')
                .from('product_images')
                .select('*')
                .eq('product_id', productId)
                .eq('display_order', 0)
                .single();

        if (error) {
            throw error;
        }

        if (!data) {
            return null;
        }

        return data;
    }

    async get_primary(
        productId: string,
    ) {
        const { data, error } =
            await this.client
                .schema('commerce')
                .from('product_images')
                .select('*')
                .eq('product_id', productId)
                .eq('display_order', 1)
                .single();

        if (error) {
            throw error;
        }

        if (!data) {
            return null;
        }

        return data;
    }

    async list_by_product_ids(
        ids: string[],
    ) {
        
        const { data, error } = await this.client
            .schema('commerce')
            .from('product_images')
            .select(`*`)
            .in('product_id', ids)
            .order('display_order', { ascending: true });

        if (error) {
            throw error;
        }

        const images = data.map(toProductImage);

        
        return groupBy(
            images,
            (image: any) => image.product_id,
        );
    }

    async list_thumbnails(
        productIds: string[],
    ) {

        if (productIds.length === 0) {
            return new Map();
        }

        const {
            data, error
        } = await this.client
            .schema('commerce')
            .from('product_images')
            .select('*')
            .in(
                'product_id',
                [...productIds]
            )
            .order(
                'display_order',
                {
                    ascending: true,
                },
            );

        
        if (error) {
            throw error;
        }

        const thumbnails =
            new Map<
                string,
                ProductImage
            >();

        for (const row of data) {

            if (
                thumbnails.has(
                    row.product_id
                )
            ) {
                continue;
            }

            thumbnails.set(
                row.product_id,
                toProductImage(
                    row
                ),
            );
        }

        return thumbnails;

    }
}