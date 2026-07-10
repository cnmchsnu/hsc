
import type { Permission, PermissionList, PermissionListOptions } from "../../../auth/domain/authorization";

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

    add(
        permission: Permission
    ): Promise<void>;

    update(
        permission: Permission,
        newPermission: Permission
    ): Promise<void>;

    remove(
        permissionId: string
    ): Promise<void>;

    // Write batch

    addMany(
        permissions: readonly Permission[]
    ): Promise<void>;

    updateMany(
        permissions: readonly Permission[],
        newPermissions: readonly Permission[]
    ): Promise<void>;

    removeMany(
        permissionIds: readonly string[]
    ): Promise<void>;
}