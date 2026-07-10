
import type { Permission, PermissionList, PermissionListOptions,  } from "./type";
import { PermissionRepository } from "@repo/database/repositories";

export interface PermissionService {

    // Read

    hasPermission(
        userId: string,
        permission: string,
    ): Promise<boolean>;

    // Read Batch

    getPermissions(
        userId: string,
    ): Promise<string[]>;

    // Query

    list(): Promise<string[]>;

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

        // Read

        async hasPermission(
            userId: string,
            permission: string,
        ): Promise<boolean> {
            throw new Error('Not implemented');
        },

        async getPermissions(
            userId: string,
        ): Promise<string[]> {
            throw new Error('Not implemented');
        },

        async listPermissions(): Promise<string[]> {
            throw new Error('Not implemented');
        },

        // Write signle

        async add(
            userId: string,
            permission: Permission
        ): Promise<void> {
            throw new Error('Not implemented');
        },

        async update(
            userId: string,
            permission: Permission,
            newPermission: Permission
        ): Promise<void> {
            throw new Error('Not implemented');
        },

        async remove(
            userId: string,
            permission: Permission
        ): Promise<void> {
            throw new Error('Not implemented');
        },

        // Write batch

        async addMany(
            userId: string,
            permissions: readonly Permission[]
        ): Promise<void> {
            throw new Error('Not implemented');
        },

        async updateMany(
            userId: string,
            permissions: readonly Permission[],
            newPermissions: readonly Permission[]
        ): Promise<void> {
            throw new Error('Not implemented');
        },

        async removeMany(
            userId: string,
            permissions: readonly Permission[]
        ): Promise<void> {
            throw new Error('Not implemented');
        }

    };
}