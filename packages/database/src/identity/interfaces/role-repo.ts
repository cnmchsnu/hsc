export interface RoleRepository {
    getRoles(
        userId: string,
    ): Promise<string[]>;
}