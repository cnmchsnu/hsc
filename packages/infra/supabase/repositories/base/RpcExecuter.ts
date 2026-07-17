import { SupabaseClient } from '@supabase/supabase-js';

export class RpcExecutor {

    constructor(
        protected readonly client: SupabaseClient,
    ) {}


}