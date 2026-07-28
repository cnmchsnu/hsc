import { Role, RoleList, RoleListOptions, RoleTypes } from "./type";

import { RoleRepository } from "./repository";

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
            return repository.findById(roleId);
        },

        // Read Batch

        async getRolesByType(
            roleType: RoleTypes,
        ): Promise<Role[]> {
            return repository.findByType(roleType);
        },

        async list(): Promise<Role[]> {
            return repository.list();
        },

        async search(
            options: RoleListOptions
        ): Promise<RoleList> {
            return repository.search(options);
        },

        // Existing Single

        async exists(
            roleId: string,
        ): Promise<boolean> {
            return repository.exists(roleId);
        },

        // Existing Batch

        async listExistingRoleIds(
            roleIds: readonly string[],
        ): Promise<string[]> {
            return repository.listExistingRoleIds(roleIds);
        },

        // Write Single

        async create(
            role: Role
        ): Promise<void> {
            return repository.create(role);
        },

        async update(
            roleId: string, 
            role: Role
        ): Promise<void> {
            return repository.update(roleId, role);
        },

        async delete(
            roleId: string
        ): Promise<void> {
            return repository.delete(roleId);
        },

        // Write Batch

        async createMany(
            roles: readonly Role[],
        ): Promise<void> {
            return repository.createMany(roles);
        },

        async updateMany(
            roles: readonly Role[],
        ): Promise<void> {
            return repository.updateMany(roles);
        },

        async deleteMany(
            roleIds: readonly string[],
        ): Promise<void> {
            return repository.deleteMany(roleIds);
        }
    };
}