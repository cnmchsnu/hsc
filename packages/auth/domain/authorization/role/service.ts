import { Role, RoleList, RoleListOptions, RoleTypes } from "./type";

import { RoleRepository } from "@repo/database/repositories"

export interface RoleService {

    // Read Single

    getRole(
        roleId: string
    ): Promise<Role | null>;

    // Read Batch

    getRolesByType(
        roleType: RoleTypes,
    ): Promise<Role[]>;

    // Query
    
    list(): Promise<Role[]>;

    search(
        options: RoleListOptions
    ): Promise<RoleList>;
    

    // Existing Single

    exists(
        roleId: string,
    ): Promise<boolean>;

    // Existing Batch

    listExistingRoleIds(
        roleIds: readonly string[],
    ): Promise<string[]>;

    // Write Single

    create(
        role: Role
    ): Promise<void>;

    update(
        roleId: string, 
        role: Role
    ): Promise<void>;

    delete(
        roleId: string
    ): Promise<void>;

    // Write Batch

    createMany(
        roles: readonly Role[],
    ): Promise<void>;

    updateMany(
        roles: readonly Role[],
    ): Promise<void>;

    deleteMany(
        roleIds: readonly string[],
    ): Promise<void>;
}

export function createRoleService(
    repository: RoleRepository
): RoleService {

    return {

        // Read Single

        async getRole(
            roleId: string
        ): Promise<Role | null> {

            throw new Error("Not implemented");
        },

        // Read Batch

        async getRolesByType(
            roleType: RoleTypes,
        ): Promise<Role[]> {

            throw new Error("Not implemented");
        },

        async listRoles(): Promise<Role[]> {
            throw new Error("Not implemented");
        },

        // Existing Single

        async exists(
            roleId: string,
        ): Promise<boolean> {
            throw new Error("Not implemented");
        },

        // Existing Batch

        async listExistingRoleIds(
            roleIds: readonly string[],
        ): Promise<string[]> {
            throw new Error("Not implemented");
        },

        // Write Single

        async create(
            role: Role
        ): Promise<void> {
            throw new Error("Not implemented");
        },

        async update(
            roleId: string, 
            role: Role
        ): Promise<void> {
            throw new Error("Not implemented");
        },

        async delete(
            roleId: string
        ): Promise<void> {
            throw new Error("Not implemented");
        },

        // Write Batch

        async createMany(
            roles: readonly Role[],
        ): Promise<void> {
            throw new Error("Not implemented");
        },

        async updateMany(
            roles: readonly Role[],
        ): Promise<void> {
            throw new Error("Not implemented");
        },

        async deleteMany(
            roleIds: readonly string[],
        ): Promise<void> {
            throw new Error("Not implemented");
        }
    };
}