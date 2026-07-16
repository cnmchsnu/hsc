import { SKU } from './type';
import { SKUQuery } from './query';
import { SKUList } from './list';
import { CreateSKU } from './create';
import { UpdateSKU } from './update';



import { SKURepository } from './repository';



export interface SKUService {

    get(id: string): Promise<SKU | null>;

    getMany(ids: readonly string[]): Promise<readonly SKU[]>;

    find(query: SKUQuery): Promise<SKUList>;

    create(create: CreateSKU): Promise<SKU>;

    update(update: UpdateSKU): Promise<SKU>;

    delete(id: string): Promise<void>;

    exists(code: string): Promise<boolean>;

    validateCode(code: string): Promise<void>;

    generateCode(productId: string): Promise<string>;

}
    


class DefaultSKUService implements SKUService {

    constructor(

        private readonly repository: SKURepository,

    ) {}

    async create(
        create: CreateSKU,
    ): Promise<SKU> {

        let code = create.code;

        if (!code) {
            code = await this.generateCode(
                create.productId,
            );
        }

        await this.validateCode(code);

        await this.repository.create({
            ...create,
            code,
        });

        const created = await this.repository.find({
            codes: [code],
            page: 1,
            pageSize: 1,
        });

        if (created.items.length === 0) {
            throw new Error("Failed to create SKU.");
        }

        return created.items[0];
    }

    async exists(
        code: string,
    ): Promise<boolean> {

        const result =
            await this.repository.find({

                codes: [code],

                page: 1,

                pageSize: 1,

            });

        return result.items.length > 0;

    }

    async validateCode(
        code: string,
    ): Promise<void> {

        if (code.trim().length === 0) {
            throw new Error("SKU code cannot be empty.");
        }

        if (await this.exists(code)) {
            throw new Error("SKU code already exists.");
        }

    }

    async generateCode(
        productId: string,
    ): Promise<string> {

        return crypto.randomUUID();

    }

    async get(
        id: string,
    ): Promise<SKU | null> {

        return this.repository.get(id);

    }

    async getMany(
        ids: readonly string[],
    ): Promise<readonly SKU[]> {

        return this.repository.getMany(ids);

    }

    async find(
        query: SKUQuery,
    ): Promise<SKUList> {

        return this.repository.find(query);

    }

    async update(
        update: UpdateSKU,
    ): Promise<SKU> {

        await this.repository.update(update);

        const sku =
            await this.repository.get(update.id);

        if (!sku) {
            throw new Error("SKU not found.");
        }

        return sku;

    }

    async delete(
        id: string,
    ): Promise<void> {

        await this.repository.delete(id);

    }


}


export function createSKUService(
    repository: SKURepository,
): SKUService {
    return new DefaultSKUService(repository);
}