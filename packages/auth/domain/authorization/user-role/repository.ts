

export interface UserRoleRepository {

    // Read Single

    getUserRoles(
        userId: string
    ): Promise<string[]>;

    // Read Batch

    getUsersByRole(
        role: string
    ): Promise<string[]>;

    getUsersByRoles(
        roles: readonly string[]
    ): Promise<string[]>;

    // Write single

    addUserRole(
        userId: string,
        role: string,
        assignedBy: string
    ): Promise<void>;

    removeUserRole(
        userId: string,
        role: string
    ): Promise<void>;

    // Write User -> Roles batch

    addUserRoles(
        userId: string,
        roles: readonly string[],
        assignedBy: string
    ): Promise<void>;

    removeUserRoles(
        userId: string,
        roles: readonly string[],
    ): Promise<void>;

    // Write Role -> Users batch

    addRoleUsers(
        role: string,
        users: readonly string[],
        assignedBy: string
    ): Promise<void>;

    removeRoleUsers(
        role: string,
        users: readonly string[]
    ): Promise<void>;

}