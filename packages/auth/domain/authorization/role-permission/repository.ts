export interface RolePermissionRepository {

    // Read Single
    getPermissionsByRole(
        role: string
    ): Promise<string[]>;

    // Read Batch

    getPermissionsByRoles(
        roles: readonly string[],
    ): Promise<string[]>;

    getRolesByPermission(
        permission: string
    ): Promise<string[]>;

    // Write single

    addRolePermission(
        role: string,
        permission: string,
        assignedBy: string
    ): Promise<void>;

    removeRolePermission(
        role: string,
        permission: string
    ): Promise<void>;
    
    // Write Role -> Permission Batch

    addRolePermissions(
        role: string,
        permissions: readonly string[],
        assignedBy: string
    ): Promise<void>;

    removeRolePermissions(
        role: string,
        permissions: readonly string[]
    ): Promise<void>;


    // Write Permission -> Role Batch
    
    addPermissionRoles(
        permission: string,
        roles: readonly string[],
        assignedBy: string
    ): Promise<void>;

    removePermissionRoles(
        permission: string,
        roles: readonly string[]
    ): Promise<void>;
}