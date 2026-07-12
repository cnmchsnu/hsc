import type { User } from "../../../auth/domain/identity";

export interface UserProvider {

    getById(
        id: string,
    ): Promise<User | null>;

}