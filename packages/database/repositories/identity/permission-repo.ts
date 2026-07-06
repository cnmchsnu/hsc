export interface PermissionRepository {
    getPermissions(
        userId: string,
    ): Promise<string[]>;
}