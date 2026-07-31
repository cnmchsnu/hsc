import type { ProductImage, ProductImageService } from "../../../../domain";

import { ValidationError } from "@repo/shared/application";
import { ProductAggregate } from "../../../aggragate";

export interface SaveProductImageCommand {

    id?: string;

    productId: string;

    url: string;

    isPrimary: boolean;

    alt: string;

    displayOrder: number;
    
}

export interface ProductImageSynchronizer {

    execute(
        aggregate: ProductAggregate,
        desired: readonly SaveProductImageCommand[],
    ): Promise<void>;

}


class DefaultProductImageSynchronizer
    implements ProductImageSynchronizer {

    constructor(
        private readonly imageService: ProductImageService,
    ) {}

    async execute(
        aggregate: ProductAggregate,
        desired: readonly SaveProductImageCommand[],
    ): Promise<void> {
        if (!desired || desired.length === 0) throw new ValidationError("No image data provided for synchronization.");
        if (!aggregate) throw new ValidationError("No product aggregate provided for synchronization.");

        const current = aggregate.images;

        const currentMap = new Map<string, ProductImage>(
            current.map(image => [image.id, image])
        );

        const desiredMap = new Map<string, SaveProductImageCommand>(
            desired.map(image => [image.id ?? "", image])
        );

        await Promise.all([
            this.imageService.createMany(
                desired.filter(image => !currentMap.has(image.id!)).map(image => ({
                    productId: aggregate.productId!,
                    url: image.url,
                    isPrimary: image.isPrimary,
                    alt: image.alt,
                    displayOrder: image.displayOrder,
                }))
            ),

            this.imageService.updateMany(
                desired.filter(image => currentMap.has(image.id!) && !this.equals(currentMap.get(image.id!) as ProductImage, image)).map(image => ({
                    id: image.id!,
                    productId: aggregate.productId!,
                    url: image.url,
                    isPrimary: image.isPrimary,
                    alt: image.alt,
                    displayOrder: image.displayOrder,
                }))
            ),

            this.imageService.deleteMany(
                current.filter(image => !desiredMap.has(image.id)).map(image => image.id)
            )
        ])
    }

    
    private equals(
        current: ProductImage,
        desired: SaveProductImageCommand,
    ): boolean {
        return (
            current.alt === desired.alt &&
            current.displayOrder === desired.displayOrder &&
            current.isPrimary === desired.isPrimary

        );
    }

}
export function createProductImageSynchronizer(
    imageService: ProductImageService,
): ProductImageSynchronizer {
    return new DefaultProductImageSynchronizer(imageService);
}