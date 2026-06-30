import type { SupabaseClient } from "@supabase/supabase-js";

import type { AuthorizationRepository } from "./authorization-repo";
import { Authorization } from "../../../auth/src/types/authorization";

export class SupabaseAuthorizationRepository
    implements AuthorizationRepository {

    constructor(
        private readonly client: SupabaseClient,
    ) {}

    async getAuthorization(
        userId: string,
    ): Promise<Authorization> {

        const  {
            data,
            error,
        } = await this.client
                .rpc(
                    "get_authorization",
                    {
                        p_user_id: userId,
                    },
                )

         if (error) {
            throw error;
        }

        return {
            
            roles: new Set(
                data.roles ?? [],
            ),

            permissions: new Set(
                data.permission ?? [],
            ),
        };


    }

}