import type { User } from "./type";

import { UserProvider } from "@repo/infra/supabase/auth";

export interface UserService {

    get(): Promise<User | null>;

}

interface UserServiceDependencies {

    userProvider: UserProvider;
}

class DefaultUserService
    implements UserService {

    constructor(
        private readonly userProvider: UserProvider,
    ) {}

    async get(): Promise<User | null> {
        return await this.userProvider.get();
    }

}

export function createUserService(
    dependencies: UserServiceDependencies
): UserService {
    return new DefaultUserService(
        dependencies.userProvider,
    );
}

