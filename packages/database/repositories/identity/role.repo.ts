import type { Role, RoleList, RoleListOptions, RoleTypes } from "../../../auth/domain/authorization/role";


export interface RoleRepository {

    // Read Single

    findById(
        roleId: string
    ): Promise<Role | null>;

    // Read Batch

    findByType(
        roleType: RoleTypes,
    ): Promise<Role[]>;

    listByIds(
        roleIds: readonly string[],
    ): Promise<Role[]>;

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