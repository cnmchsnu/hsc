import type { ProductImage, ProductImageService } from "../../../../domain";

import { ChildCollectionSynchronizer, type CollectionUpdate } from "@repo/shared/sync";

export interface SaveProductImageCommand {

    id?: string;

    productId: string;

    url: string;

    isPrimary: boolean;

    alt: string | null;

    displayOrder: number;
    
}

export class ProductImageSynchronizer extends ChildCollectionSynchronizer<
    string,
    ProductImage,
    SaveProductImageCommand
> {

    constructor(

        private readonly imageService: ProductImageService,

    ) {
        super();
    }

    async loadCurrent(
        productId: string,
    ): Promise<readonly ProductImage[]> {

        const result = await this.imageService.getAllById(productId);

        if (!result) return [];

        return result;
    }

    async createMany(
        productId: string,
        create: readonly SaveProductImageCommand[],
    ): Promise<void> {
        await this.imageService.createMany(create.map((image) => ({
            ...image,
            productId,
        })));
    }

    async updateMany(
        update: readonly CollectionUpdate<
            ProductImage,
            SaveProductImageCommand
        >[],
    ): Promise<void> {
        await this.imageService.updateMany(update.map((item) => ({
            ...item.desired,
            id: item.current.id,
        })));
    }

    async deleteMany(
        deleteIds: readonly string[],
    ): Promise<void> {
        await this.imageService.deleteMany(deleteIds);
    }

    currentKey(
        current: ProductImage,
    ): string {
        return current.id;
    }

    desiredKey(
        desired: SaveProductImageCommand,
    ): string | null {
        return desired.id ?? null;
    }

    equals(
        current: ProductImage,
        desired: SaveProductImageCommand,
    ): boolean {
        return (

            current.url === desired.url &&
            current.alt === desired.alt &&
            current.displayOrder === desired.displayOrder &&
            current.isPrimary === desired.isPrimary

        );
    }

}
export function createProductImageSynchronizer(
    imageService: ProductImageService,
): ProductImageSynchronizer {
    return new ProductImageSynchronizer(imageService);
}