
import type { Permission, PermissionList, PermissionListOptions,  } from "./type";
import { PermissionRepository } from "@repo/database/repositories";

export interface PermissionService {

    // Read Single

    getPermission(
        permissionId: string,
    ): Promise<Permission | null>;

    // Read Batch

    getPermissions(
        permissionIds: string[],
    ): Promise<Permission[]>;

    // Query

    list(): Promise<Permission[]>;

    search(
        options: PermissionListOptions
    ): Promise<PermissionList>;

    // Write signle

    add(
        userId: string,
        permission: Permission
    ): Promise<void>;

    update(
        userId: string,
        permissionId: string,
        newPermission: Permission
    ): Promise<void>;

    remove(
        userId: string,
        permission: Permission
    ): Promise<void>;

    // Write batch

    addMany(
        userId: string,
        permissions: readonly Permission[]
    ): Promise<void>;

    updateMany(
        userId: string,
        permissions: readonly Permission[],
        newPermissions: readonly Permission[]
    ): Promise<void>;

    removeMany(
        userId: string,
        permissions: readonly Permission[]
    ): Promise<void>;
}

export function createPermissionService(
    repository: PermissionRepository,
): PermissionService {
    return {

        // Read Single

        async getPermission(
            permissionId: string,
        ): Promise<Permission | null> {
            return repository.getPermissionById(permissionId);
        },

        // Read Batch

        async getPermissions(
            permissionIds: string[],
        ): Promise<Permission[]> {
            return repository.getPermissionsByIds(permissionIds);
        },

        // Query


        async list(): Promise<Permission[]> {
            return repository.list();
        },

        async search(
            options: PermissionListOptions
        ): Promise<PermissionList> {
            return repository.search(options);
        },

        // Write signle

        async add(
            userId: string,
            permission: Permission
        ): Promise<void> {
            return repository.add(permission);
        },

        async update(
            userId: string,
            permissionId: string,
            newPermission: Permission
        ): Promise<void> {
            return repository.update(permissionId, newPermission);
        },

        async remove(
            userId: string,
            permission: Permission
        ): Promise<void> {
            return repository.remove(permission.id);
        },

        // Write batch

        async addMany(
            userId: string,
            permissions: readonly Permission[]
        ): Promise<void> {
            return repository.addMany(permissions);
        },

        async updateMany(
            userId: string,
            permissions: readonly Permission[],
            newPermissions: readonly Permission[]
        ): Promise<void> {
            return repository.updateMany(permissions, newPermissions);
        },

        async removeMany(
            userId: string,
            permissions: readonly Permission[]
        ): Promise<void> {
            return repository.removeMany(permissions.map(p => p.id));
        }

    };
}