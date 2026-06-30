// packages/auth/src/types/authorization.ts

import type { PermissionKey } from "./permission";

export interface Authorization {
    roles: ReadonlySet<string>;

    permissions: ReadonlySet<PermissionKey>;

}