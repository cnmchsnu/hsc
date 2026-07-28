

import {
    ProductCommandService,
    DefaultProductCommandService,
} from "../commands"

import { ProductCommandServices } from "./commands";

export function createProductCommandService(
    services: ProductCommandServices
): ProductCommandService {
    return new DefaultProductCommandService(
        services.createCommand,
        services.updateCommand,
        services.updateBasicCommand,
        services.updateImagesCommand,
        services.updateCategoriesCommand,
        services.updateVariantsCommand,
        services.updateVariantValuesCommand,
        services.updateSkusCommand,
    );
}