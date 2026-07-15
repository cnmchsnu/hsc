
import type { Permission, PermissionList, PermissionListOptions } from "../../../auth/domain/authorization";
import type { CreatePermission, UpdatePermission } from "../../../auth/application/authorization/permissions";

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