import type { Authorization } from "./type";
import type { SupabaseAuthorizationRepository } from "@repo/database/authorization";

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
