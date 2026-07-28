
import type { Permission, PermissionList, PermissionListOptions } from "./type";

import type { CreatePermission, UpdatePermission } from "../../../application/authorization/permissions";

import type { PermissionRepository } from "./repository";

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

    create(
        userId: string,
        permission: CreatePermission
    ): Promise<void>;

    update(
        userId: string,
        newPermission: UpdatePermission
    ): Promise<void>;

    delete(
        userId: string,
        permissionId: string
    ): Promise<void>;

    // Write batch

    createMany(
        userId: string,
        permissions: readonly CreatePermission[]
    ): Promise<void>;

    updateMany(
        userId: string,
        permissions: readonly UpdatePermission[]
    ): Promise<void>;

    deleteMany(
        userId: string,
        permissionIds: readonly string[]
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

        async create(
            userId: string,
            permission: CreatePermission
        ): Promise<void> {
            return repository.create(permission);
        },

        async update(
            userId: string,
            newPermission: UpdatePermission
        ): Promise<void> {
            return repository.update(newPermission);
        },

        async delete(
            userId: string,
            permissionId: string
        ): Promise<void> {
            return repository.delete(permissionId);
        },

        // Write batch

        async createMany(
            userId: string,
            permissions: readonly CreatePermission[]
        ): Promise<void> {
            return repository.createMany(permissions);
        },

        async updateMany(
            userId: string,
            permissions: readonly UpdatePermission[]
        ): Promise<void> {
            return repository.updateMany(permissions);
        },

        async deleteMany(
            userId: string,
            permissionIds: readonly string[]
        ): Promise<void> {
            return repository.deleteMany(permissionIds);
        }

    };
}