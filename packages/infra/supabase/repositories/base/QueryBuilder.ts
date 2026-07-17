import { SupabaseClient } from '@supabase/supabase-js';

export class QueryBuilder {

    constructor(
        protected readonly client: SupabaseClient,
    ) {}


    protected paginate(

        query: any,

        page: number,

        pageSize: number,

    ) {

        return query.range(

            (page - 1) * pageSize,

            page * pageSize - 1,

        );

    }

    protected applySort(

        query: any,

        sort: string | undefined,

        mapping: Record<string, { column: string; ascending: boolean }>,

    ) {

        if (!sort)

            return query;

        const rule =
            mapping[sort];

        if (!rule)

            return query;

        return query.order(

            rule.column,

            {

                ascending:

                    rule.ascending,

            },

        );

    }

}