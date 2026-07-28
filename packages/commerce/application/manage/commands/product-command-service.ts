import { ProductCommandResult, ProductEditor, CreateProductCommand, UpdateProductCommand } from './product';
import { ProductEditorInfo } from '../sync';
import { UpdateProductBasicCommand } from './product-basic';

import { ProductImageEditor, UpdateProductImagesCommand } from './images';
import { ProductCategoriesEditor, UpdateProductCategoriesCommand } from './product-categories';
import { ProductVariantWorkflowInput, UpdateProductVariantCommand } from './variant';
import { ProductVariantValueWorkflowInput, UpdateVariantValueCommand} from './variant-value';
import { ProductSkuWorkflowInput, UpdateProductSKUsCommand } from './sku';


export interface ProductCommandService {

    create(
        input: ProductEditor,
    ): Promise<ProductCommandResult>;

    update(
        input: ProductEditor,
    ): Promise<ProductCommandResult>;

    archive(
        slug: string,
    ): Promise<ProductCommandResult>;

    publish(
        slug: string,
    ): Promise<ProductCommandResult>;

    updateBasic(
        input: ProductEditorInfo,
    ): Promise<ProductCommandResult>;

    updateImages(
        input: ProductImageEditor,
    ): Promise<ProductCommandResult>;

    updateCategories(
        input: ProductCategoriesEditor,
    ): Promise<ProductCommandResult>;

    updateVariants(
        input: ProductVariantWorkflowInput,
    ): Promise<ProductCommandResult>;

    updateVariantValues(
        input: ProductVariantValueWorkflowInput,
    ): Promise<ProductCommandResult>;

    updateSkus(
        input: ProductSkuWorkflowInput,
    ): Promise<ProductCommandResult>;

}

export class DefaultProductCommandService
implements ProductCommandService {

    constructor(

        private readonly createCommand:
            CreateProductCommand,

        private readonly updateCommand:
            UpdateProductCommand,

        private readonly updateBasicCommand:
            UpdateProductBasicCommand,

        private readonly updateImagesCommand:
            UpdateProductImagesCommand,

        private readonly updateCategoriesCommand:
            UpdateProductCategoriesCommand,

        private readonly updateVariantsCommand:
            UpdateProductVariantCommand,

        private readonly updateVariantValuesCommand:
            UpdateVariantValueCommand,

        private readonly updateSkusCommand:
            UpdateProductSKUsCommand,

    ) {}


    async create(
        input: ProductEditor,
    ): Promise<ProductCommandResult> {
        return await this.createCommand.execute(input);
    }

    async update(
        input: ProductEditor,
    ): Promise<ProductCommandResult> {
        return await this.updateCommand.execute(input);
    }

    async archive(
        slug: string,
    ): Promise<ProductCommandResult> {
        throw new Error("Method not implemented.");
    }

    async publish(
        slug: string,
    ): Promise<ProductCommandResult> {
        throw new Error("Method not implemented.");
    }

    async updateBasic(
        input: ProductEditorInfo,
    ): Promise<ProductCommandResult> {
        return await this.updateBasicCommand.execute(input);
    }

    async updateImages(
        input: ProductImageEditor,
    ): Promise<ProductCommandResult> {
        return await this.updateImagesCommand.execute(input);
    }

    async updateCategories(
        input: ProductCategoriesEditor,
    ): Promise<ProductCommandResult> {
        return await this.updateCategoriesCommand.execute(input);
    }

    async updateVariants(
        input: ProductVariantWorkflowInput,
    ): Promise<ProductCommandResult> {
        return await this.updateVariantsCommand.execute(input);
    }

    async updateVariantValues(
        input: ProductVariantValueWorkflowInput,
    ): Promise<ProductCommandResult> {
        return await this.updateVariantValuesCommand.execute(input);
    }

    async updateSkus(
        input: ProductSkuWorkflowInput,
    ): Promise<ProductCommandResult> {
        return await this.updateSkusCommand.execute(input);
    }


}
