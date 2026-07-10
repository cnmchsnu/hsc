import type { User } from "../../../auth/domain/identity";

export interface UserRepository {

    getById(
        id: string,
    ): Promise<User | null>;

    getByIds(
        ids: readonly string[],
    ): Promise<readonly User[]>;

    findByEmail(
        email: string,
    ): Promise<User | null>;

    refreshIdentity(
        id: string,
    ): Promise<User>;

}