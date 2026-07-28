
import type { Permission, PermissionList, PermissionListOptions } from "..";

import type { CreatePermission } from "./create";
import type { UpdatePermission } from "./update";

export interface PermissionRepository {

    // Read single

    getPermissionById(
        permissionId: string
    ): Promise<Permission | null>;

    // Read batch

    getPermissionsByIds(
        permissionIds: readonly string[]
    ): Promise<Permission[]>;

    

    list(): Promise<Permission[]>;

    search(
        options: PermissionListOptions
    ): Promise<PermissionList>;

    // Write signle

    create(
        permission: CreatePermission
    ): Promise<void>;

    update(
        permission: UpdatePermission
    ): Promise<void>;

    delete(
        permissionId: string
    ): Promise<void>;

    // Write batch

    createMany(
        permissions: readonly CreatePermission[]
    ): Promise<void>;

    updateMany(
        permissions: readonly UpdatePermission[]
    ): Promise<void>;

    deleteMany(
        permissionIds: readonly string[]
    ): Promise<void>;
}