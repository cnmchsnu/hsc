import type { SupabaseClient } from "@supabase/supabase-js";

import type { AuthorizationRepository } from "../interface";
import { Authorization } from "../../../../auth/src/types";

export class SupabaseAuthorizationRepository
    implements AuthorizationRepository {

    constructor(
        private readonly client: SupabaseClient,
    ) {}

    async getAuthorization(
        userId: string,
    ): Promise<Authorization> {

        const identityClient =
            this.client.schema("identity");

        const  {
            data,
            error,
        } = await identityClient
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
                data.permissions ?? [],
            ),
        };


    }

}