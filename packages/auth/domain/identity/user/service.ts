import type { User } from "./type";

import { UserProvider } from "@repo/infra/supabase/auth";

export interface UserService {

    getUserById(id: string,): Promise<User | null>;

}

interface UserServiceDependencies {

    userProvider: UserProvider;
}

class DefaultUserService
    implements UserService {

    constructor(
        private readonly userProvider: UserProvider,
    ) {}

    async getUserById(
        id: string,
    ): Promise<User | null> {
        return await this.userProvider.getById(id);
    }

}

export function createUserService(
    dependencies: UserServiceDependencies
): UserService {
    return new DefaultUserService(
        dependencies.userProvider,
    );
}

