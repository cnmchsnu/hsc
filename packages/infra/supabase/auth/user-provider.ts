import type { User } from "../../../auth/domain/identity";

export interface UserProvider {

    get(): Promise<User | null>;

}