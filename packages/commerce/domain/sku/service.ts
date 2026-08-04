import { SKU } from './type';
import { SKUQuery } from './query';
import { SKUList } from './list';
import { CreateSKU } from './create';
import { UpdateSKU } from './update';



import { SKURepository } from './repository';
import { SKUVariantValueRepository } from '../sku-variant-value';

import { type CRUDService, DefaultCRUDService } from "@repo/shared/service";
import { ProductSkuEditor } from '../../application/manage';
import { ConflictError, NotFoundError, ValidationError } from '@repo/shared/application';



export interface SKUService extends CRUDService<
    SKU,
    string,
    CreateSKU,
    UpdateSKU,
    SKUQuery,
    SKUList
> {

    createManyViaAggregate(commands: readonly ProductSkuEditor[]): Promise<ReadonlyMap<string, string>>;

    updateManyViaAggregate(commands: readonly ProductSkuEditor[]): Promise<ReadonlyMap<string, string>>;

    archiveMany(commands: readonly SKU[]): Promise<void>;


    getByCode(code: string): Promise<SKU | null>;

    getByProduct(productId: string): Promise<readonly SKU[]>;

    getByProducts(productIds: readonly string[]): Promise<readonly SKU[]>;

    validateCode(code: string): Promise<void>;

    generateCode(productId: string): Promise<string>;

}
    



class DefaultSKUService
    extends DefaultCRUDService<
        SKU,
        string,
        CreateSKU,
        UpdateSKU,
        SKUQuery,
        SKUList,
        SKURepository
    >
    implements SKUService {

    constructor(
        protected readonly repository: SKURepository,
        protected readonly SKUVariantValueRepository: SKUVariantValueRepository,
    ) {
        super(repository);
    }

    async createManyViaAggregate(
        commands: readonly ProductSkuEditor[],
    ): Promise<ReadonlyMap<string, string>> {
        const result = new Map<string, string>();
        for (const command of commands) {

            await super.create({
                productId: command.productId,
                code: command.code,
                barcode: command.barcode ?? null,
                status: command.status,
            });

            const sku = await this.getByCode(command.code);

            if (!sku) {
                throw new ConflictError(`Failed to create SKU with code: ${command.code}`);
            }
            result.set(command.code, sku.id);

            await this.SKUVariantValueRepository.createMany(

                command.optionValueIds.map(id => ({
                    optionValueId: id,
                    skuId: sku.id, 
                })),

            );

        }
        return result;
    }

    async updateManyViaAggregate(
        commands: readonly ProductSkuEditor[],
    ): Promise<ReadonlyMap<string, string>> {
        const result = new Map<string, string>();
        for (const command of commands) {
            const existingSKU = await this.getByCode(command.code);

            if (!existingSKU) {
                throw new NotFoundError(`SKU with code ${command.code} does not exist.`);
            }

            result.set(command.code, existingSKU.id);

            await super.update({
                id: existingSKU.id,
                code: command.code,
                barcode: command.barcode ?? null,
                status: command.status,
            });

            await this.SKUVariantValueRepository.replace(
                existingSKU.id,
                command.optionValueIds.map(id => ({
                    optionValueId: id,
                    skuId: existingSKU.id, 
                })),
            );
        }
        return result;

    }

    async archiveMany(
        commands: readonly SKU[],
    ): Promise<void> {
        for (const command of commands) {
            const existingSKU = await this.getByCode(command.code);

            if (!existingSKU) {
                throw new NotFoundError(`SKU with code ${command.code} does not exist.`);
            }

            await super.update({
                id: existingSKU.id,
                code: existingSKU.code,
                barcode: existingSKU.barcode ?? null,
                status: 'archived',
            });

            await this.SKUVariantValueRepository.deleteBySKU(existingSKU.id);
        }
    }

    async validateCode(
        code: string,
    ): Promise<void> {

        if (code.trim().length === 0) {
            throw new ValidationError("SKU code cannot be empty.");
        }

        if (await this.exists(code)) {
            throw new ConflictError("SKU code already exists.");
        }

    }

    async generateCode(
        productId: string,
    ): Promise<string> {

        return crypto.randomUUID();

    }

    async getByCode(
        code: string,
    ): Promise<SKU | null> {

        return this.repository.getByCode(code);

    }

    async getByProduct(
        productId: string,
    ): Promise<readonly SKU[]> {

        return this.repository.getByProduct(productId);

    }

    async getByProducts(
        productIds: readonly string[],
    ): Promise<readonly SKU[]> {
        return this.repository.getByProducts(productIds);
    }

}


export function createSKUService(
    repository: SKURepository,
    SKUVariantValueRepository: SKUVariantValueRepository,
): SKUService {
    return new DefaultSKUService(repository, SKUVariantValueRepository);
}