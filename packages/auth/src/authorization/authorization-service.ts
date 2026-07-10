import { promises } from "dns";
import type { Authorization } from "../types";
import type { SupabaseAuthorizationRepository } from "@repo/infra/supabase/repositories";

export interface AuthorizationService {

    get(
        userId: string,
    ): Promise<Authorization>;

}

export function createAuthorizationService(
    repository: SupabaseAuthorizationRepository,
): AuthorizationService {

    return {

        async get(userId) {

            return repository.getAuthorization(
                userId,
            );
            
        },
    };

}