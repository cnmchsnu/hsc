import {

    PostgrestFilterBuilder,

    SupabaseClient,

} from "@supabase/supabase-js";

export abstract class SupabaseRepository {

    protected constructor(
        
        protected readonly client: SupabaseClient,

    ) {}

    // protected abstract applyFilters(
    //     query: Builder,
    //     options: TQuery,
    // ): Builder;

    // protected buildQuery(options: TQuery): Builder {
    //     let query = this.createBaseQuery();

    //     query = this.applyFilters(query, options);
    //     query = this.applySorting(query, options);
    //     query = this.applyPagination(query, options.page, options.pageSize);

    //     return query;
    // }

    protected applyPagination<Builder extends PostgrestFilterBuilder<any, any, any, any>>(

        query: Builder,

        page = 1,

        pageSize = 50,

    ): Builder {

        const from = (page - 1) * pageSize;

        return query.range(

            from,

            from + pageSize - 1,

        ) as Builder;

    }

}