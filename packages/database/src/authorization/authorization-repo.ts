import type { Authorization } from "../../../auth/src/types";

export interface AuthorizationRepository {

    getAuthorization(
        userId: string,
    ): Promise<
        Authorization
    >;
}