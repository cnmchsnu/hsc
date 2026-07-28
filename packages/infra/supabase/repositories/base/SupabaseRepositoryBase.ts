import { SupabaseClient } from '@supabase/supabase-js';

import { RepositoryMapper } from '../../../../shared/repository-mapper';
import { List, Query, Repository } from '@repo/shared';

export abstract class SupabaseRepositoryBase<
    TEntity,
    TId,
    TCreate,
    TUpdate,
    TQuery extends Query,
    TList extends List<TEntity>,
    TRow,
> implements Repository<
    TEntity,
    TId,
    TCreate,
    TUpdate,
    TQuery,
    TList

> {

    protected abstract readonly schema: string;

    protected abstract readonly table: string;

    protected abstract readonly createRpc: string;

    protected abstract readonly updateRpc: string;

    protected abstract readonly mapper: RepositoryMapper<
        TEntity,
        TRow,
        TCreate,
        TUpdate
    >;

    constructor(

        protected readonly client: SupabaseClient,

    ) {}


    protected from() {

        return this.client

            .schema(this.schema)

            .from(this.table);

    }

    protected async getRow(

        id: TId,

    ) {

        const {

            data,

            error,

        } = await this

            .from()

            .select("*")

            .eq("id", id)

            .maybeSingle();

        if (error)

            throw error;

        return data;

    }

    protected async getRows(

        ids: readonly TId[],

    ) {

        if (!ids.length)

            return [];

        const {

            data,

            error,

        } = await this

            .from()

            .select("*")

            .in("id", [...ids]);

        if (error)

            throw error;

        return data ?? [];

    }

    protected buildQuery(
        options: TQuery,
    ) {

        return this.from().select(
            "*",
            {
                count: "exact",
            },
        );

    }

    protected buildRange(
        page: number,
        pageSize: number,
    ) {

        const safePage =
            Math.max(page, 1);

        const safePageSize =
            Math.max(pageSize, 1);

        const start =
            (safePage - 1) * safePageSize;

        const end =
            start + safePageSize - 1;

        return {
            start,
            end,
        };

    }

    protected normalizeQuery<T extends Query>(
        options?: T,
    ): T {

        return {

            page: 1,

            pageSize: 50,

            ...(options ?? {}),

        } as T;

    }

    protected async executeQuery(

        query: any,

    ) {

        const {

            data,

            error,

            count,

        } = await query;

        if (!error) {

            return {

                rows: data ?? [],

                count: count ?? 0,

            };

        }

        if (error?.code === 'PGRST103') return { rows: [], count: 0 };
        
        throw error;

    }

    protected toList(
        result: any,
        options: TQuery,
    ): TList {
        return {
            items: this.mapper.fromRows(result.rows),
            total: result.count,
            page: options.page ?? 1,
            pageSize: options.pageSize ?? 50,
        } as unknown as TList;
    }

    protected async executeRpc(

        fn: string,

        args?: Record<string, unknown>,

    ): Promise<void> {

        const { error } =

            await this.client.rpc(fn, args);

        if (error) {

            throw error;

        }

    }



    protected async deleteRows(

        ids: readonly TId[],

    ) {

        if (!ids.length)

            return;

        const { error } =

            await this

                .from()

                .delete()

                .in("id", [...ids]);

        if (error)

            throw error;

    }

    protected async listExistingRows(

        ids: readonly TId[],

    ): Promise<TId[]> {

        if (!ids.length)

            return [];

        const {

            data,

            error,

        } = await this

            .from()

            .select("id")

            .in("id", [...ids]);

        if (error)

            throw error;

        return (data ?? [])

            .map(

                x => x.id,

            );

    }

    async get(
        id: TId,
    ): Promise<TEntity | null> {

        const {data, error} = await this.getRow(id);

        if (error) {
            throw error;
        }

        if (!data) {
            return null;
        }

        return this.mapper.fromRow(data);
    }

    async getMany(
        ids: readonly TId[],
    ): Promise<readonly TEntity[]> {

        const rows = await this.getRows(ids);

        return this.mapper.fromRows(rows);
    }

    async find(
        options: TQuery,
    ): Promise<TList> {


        const normalized =
            this.normalizeQuery(options);

        let query =
            this.buildQuery(normalized);

        const { start, end } =
            this.buildRange(normalized.page, normalized.pageSize);

        query.range(start, end);

        const result = await this.executeQuery(query);

        return this.toList(
            result,
            normalized
        );
    }

    async exists(
        id: TId,
        name?: string,
    ): Promise<boolean> {
        const data = await this.listExistingRows([id]);

        return !!data;
    }

    async listExisting(
        ids: readonly TId[],
    ): Promise<readonly TId[]> {

        return this.listExistingRows(ids);
    }

    async create(
        command: TCreate,
    ): Promise<TEntity> {
        const { data, error } = await this
            .from()
            .insert(this.mapper.toCreateRow(command) as any);
            
        if (error) {
            throw error;
        }

        if (!data || !data) {
            throw new Error("Failed to create entity");
        }

        return this.mapper.fromRow(data);
    }

    async createMany(
        commands: readonly TCreate[],
    ): Promise<void> {

        if (!commands.length) {
            return;
        }

        await this.executeRpc(
            this.createRpc,
            {
                items: this.mapper.toCreateRows(commands),
            },
        );
    }

    async update(
        command: TUpdate,
    ): Promise<TEntity> {
        const { data, error } = await this
            .from()
            .insert(this.mapper.toUpdateRow(command) as any)
            .eq("id", (command as any).id)
            
        if (error) {
            throw error;
        };

        if (!data || !data) {
            throw new Error("Failed to update entity");
        }

        return this.mapper.fromRow(data);
    }

    async updateMany(
        commands: readonly TUpdate[],
    ): Promise<void> {

        if (!commands.length) {
            return;
        }

        await this.executeRpc(
            this.updateRpc,
            {
                items: this.mapper.toUpdateRows(commands),
            },
        );
    }


    async delete(
        id: TId,
        relations?: readonly TEntity[],
    ): Promise<void> {

        await this.deleteMany([
            id,
        ]);
    }

    async deleteMany(
        ids: readonly TId[],
        relations?: readonly TEntity[],
    ): Promise<void> {

        await this.deleteRows(ids);

    }

}