import {
    CreateProductCommand,
    UpdateProductCommand,
    UpdateProductImagesCommand,
    UpdateProductBasicCommand,
    UpdateProductCategoriesCommand,
    UpdateProductVariantCommand,
    UpdateVariantValueCommand,
    UpdateProductSKUsCommand,
} from "../commands"

import { ProductSynchronizers } from "./synchronizers";
import { CommerceDependencies } from "./aggregate";

import { ProductManagementWorkflows } from "./workflows";
import { ProductAggregateLoader } from "../../aggragate";

export interface ProductCommandServices {
    createCommand: CreateProductCommand;
    updateCommand: UpdateProductCommand;
    updateBasicCommand: UpdateProductBasicCommand;
    updateImagesCommand: UpdateProductImagesCommand;
    updateCategoriesCommand: UpdateProductCategoriesCommand;
    updateVariantsCommand: UpdateProductVariantCommand;
    updateVariantValuesCommand: UpdateVariantValueCommand;
    updateSkusCommand: UpdateProductSKUsCommand;
}



export function createProductServiceUseCases(
    deps: CommerceDependencies,
    synchronizers: ProductSynchronizers,
    workflows: ProductManagementWorkflows,
    aggregateLoader: ProductAggregateLoader
) : ProductCommandServices {

    const createCommand =
        new CreateProductCommand(
            deps.productService,
            aggregateLoader,
            workflows.productManagementWorkflow,
            deps.transactionRunner
        );

    const updateCommand =
        new UpdateProductCommand(
            aggregateLoader,
            workflows.productManagementWorkflow,
            deps.transactionRunner
        );

    const updateBasicCommand =
        new UpdateProductBasicCommand(
            deps.productService,
            synchronizers.product,
            deps.transactionRunner
        );

    const updateImagesCommand =
        new UpdateProductImagesCommand(
            deps.productImageService,
            synchronizers.image,
            deps.transactionRunner
        );

    const updateCategoriesCommand =
        new UpdateProductCategoriesCommand(
            deps.productCategoryService,
            aggregateLoader,
            synchronizers.category,
            deps.transactionRunner
        );

    const updateVariantsCommand =
        new UpdateProductVariantCommand(
            aggregateLoader,
            workflows.variantWorkflow,
            deps.transactionRunner
        );

    const updateVariantValuesCommand =
        new UpdateVariantValueCommand(
            aggregateLoader,
            workflows.variantValueWorkflow,
            deps.transactionRunner
        );
    
    const updateSkusCommand =
        new UpdateProductSKUsCommand(
            aggregateLoader,
            workflows.skuWorkflow,
            deps.transactionRunner
        );

    return {
        createCommand,
        updateCommand,
        updateBasicCommand,
        updateImagesCommand,
        updateCategoriesCommand,
        updateVariantsCommand,
        updateVariantValuesCommand,
        updateSkusCommand
    }

}