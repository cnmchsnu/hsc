import { Query, List, Repository } from "./repository";

export interface CRUDService<
    TEntity,
    TId,
    TCreate,
    TUpdate,
    TOptions extends Query,
    TList extends List<TEntity>,
> {
    get(id: TId): Promise<TEntity | null>;
    
    getMany(ids: readonly TId[]): Promise<readonly TEntity[]>;
    
    find(options: TOptions): Promise<TList>;

    exists(id: TId, secondaryId?: any): Promise<boolean>;

    listExistingIds(ids: readonly TId[]): Promise<readonly TId[]>;

    create(create: TCreate): Promise<TEntity | null>;
    
    createMany(commands: readonly TCreate[]): Promise<void>;
    
    update(update: TUpdate): Promise<void>;

    updateMany(commands: readonly TUpdate[]): Promise<void>;
    
    delete(id: TId): Promise<void>;
    
    deleteMany(ids: readonly TId[]): Promise<void>;
}

export abstract class DefaultCRUDService<
    TEntity,
    TId,
    TCreate,
    TUpdate,
    TOptions extends Query,
    TList extends List<TEntity>,
    TRepository extends Repository<TEntity, TId, TCreate, TUpdate, TOptions, TList>,
> implements CRUDService<
    TEntity,
    TId,
    TCreate,
    TUpdate,
    TOptions,
    TList
    > {

    constructor(
        protected readonly repository: TRepository,
    ) {}

    async get(
        id: TId,
    ): Promise<TEntity | null> {
        const entities =
            await this.repository.get(id);

        if (!entities) return null;
        
        return entities;
    }

    async getMany(
        ids: readonly TId[],
    ): Promise<readonly TEntity[]> {
        
        const entities =
            await this.repository.getMany(ids);

        if (!entities) return [];
        
        return entities;
    }

    async find(
        options: TOptions,
    ): Promise<TList> {
        return this.repository.find(options);
    }

    async exists(
        id: TId,
        secondaryId?: any,
    ): Promise<boolean> {
        if (!id) return false;

        return this.repository.exists(id);
    }

    async listExistingIds(
        ids: readonly TId[],
    ): Promise<readonly TId[]> {
        if (!ids || !ids.length) return [];

        return this.repository.listExisting(ids);
    }

    async create(
        create: TCreate,
    ): Promise<TEntity | null> {
        return this.repository.create(create);
    }

    async createMany(
        commands: readonly TCreate[],
    ): Promise<void> {
        await this.repository.createMany(commands);
    }

    async update(
        update: TUpdate,
    ): Promise<void> {
        await this.repository.update(update);
    }

    async updateMany(
        commands: readonly TUpdate[],
    ): Promise<void> {
        await this.repository.updateMany(commands);
    }

    async delete(
        id: TId,
    ): Promise<void> {
        await this.repository.delete(id);
    }

    async deleteMany(
        ids: readonly TId[],
    ): Promise<void> {
        await this.repository.deleteMany(ids);
    }
    
}