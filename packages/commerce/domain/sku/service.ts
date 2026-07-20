import { SKU } from './type';
import { SKUQuery } from './query';
import { SKUList } from './list';
import { CreateSKU } from './create';
import { UpdateSKU } from './update';



import { SKURepository } from './repository';



export interface SKUService {

    get(id: string): Promise<SKU | null>;

    getMany(ids: readonly string[]): Promise<readonly SKU[]>;

    getByCode(code: string): Promise<SKU | null>;

    getByProduct(productId: string): Promise<readonly SKU[]>;

    getByProducts(productIds: readonly string[]): Promise<readonly SKU[]>;

    find(query: SKUQuery): Promise<SKUList>;

    create(create: CreateSKU): Promise<void>;

    createMany(commands: readonly CreateSKU[]): Promise<void>;

    update(update: UpdateSKU): Promise<void>;

    updateMany(commands: readonly UpdateSKU[]): Promise<void>;

    delete(id: string): Promise<void>;

    createMany(commands: readonly CreateSKU[]): Promise<void>;

    exists(code: string): Promise<boolean>;

    listExisting(ids: readonly string[]): Promise<readonly string[]>;

    validateCode(code: string): Promise<void>;

    generateCode(productId: string): Promise<string>;

}
    


class DefaultSKUService implements SKUService {

    constructor(

        private readonly repository: SKURepository,

    ) {}

    async create(
        create: CreateSKU,
    ): Promise<void> {

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
    }

    async createMany(
        commands: readonly CreateSKU[],
    ): Promise<void> {

        await this.repository.createMany(commands);

    }



    async exists(
        code: string,
    ): Promise<boolean> {

        return await this.repository.existsByCode(code);

    }


    async listExisting(
        ids: readonly string[],
    ): Promise<readonly string[]> {

        return await this.repository.listExistingCode(ids);
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

    async find(
        query: SKUQuery,
    ): Promise<SKUList> {

        return this.repository.find(query);

    }

    async update(
        update: UpdateSKU,
    ): Promise<void> {

        const exists = await this.repository.exists(update.id);

        if (!exists) {
            return;
        }

        await this.repository.update(update);

    }

    async updateMany(
        commands: readonly UpdateSKU[],
    ): Promise<void> {

        const exsits = await this.repository.listExisting(
            commands.map(c => c.id),
        );

        const row = commands.filter(c => exsits.includes(c.id));

        await this.repository.updateMany(row);

    }

    async delete(
        id: string,
    ): Promise<void> {
        await this.repository.delete(id);
    }

    async deleteMany(
        ids: readonly string[],
    ): Promise<void> {
        await this.repository.deleteMany(ids);
    }


}


export function createSKUService(
    repository: SKURepository,
): SKUService {
    return new DefaultSKUService(repository);
}