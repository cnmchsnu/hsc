export interface List<T> {

    items: readonly T[];

    total: number;

    page: number;

    pageSize: number;

}

export interface Query {

    page: number;

    pageSize: number;

    keyword?: string;

}


export interface Repository<
    TEntity,
    TId,
    TCreate,
    TUpdate,
    TOptions extends Query,
    TList,
> {

    get(
        id: TId,
    ): Promise<TEntity | null>;

    getMany(
        ids: readonly TId[],
    ): Promise<readonly TEntity[]>;

    exists(
        id: TId,
        secondaryId?: string,
    ): Promise<boolean>;

    listExisting(
        ids: readonly TId[],
    ): Promise<readonly TId[]>;

    find(
        options?: TOptions,
    ): Promise<TList>;

    create(
        command: TCreate,
    ): Promise<TEntity | null>;

    createMany(
        commands: readonly TCreate[],
    ): Promise<void>;

    update(
        command: TUpdate,
    ): Promise<TEntity | null>;

    updateMany(
        commands: readonly TUpdate[],
    ): Promise<void>;

    delete(
        id: TId,
    ): Promise<void>;

    deleteMany(
        ids: readonly TId[],
    ): Promise<void>;

}