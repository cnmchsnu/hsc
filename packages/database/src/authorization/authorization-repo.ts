import type { PermissionKey } from "@repo/auth/types";
import { Authorization } from "@repo/auth/types";

export interface AuthorizationRepository {

    getAuthorization(
        userId: string,
    ): Promise<
        Authorization
    >;
}