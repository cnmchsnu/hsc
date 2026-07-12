import { CurrentUserService } from "./CurrentUserService";
import type { UserContext } from "./UserContextService"; 

export interface AuthorizationService {

    can(
        permission: string,
    ): Promise<boolean>;

    require(
        permission: string,
    ): void;

    canAny(
        permissions: readonly string[],
    ): boolean;

    requireAny(
        permissions: readonly string[],
    ): Promise<void>;

    canAll(
        permissions: readonly string[],
    ): Promise<boolean>;

    requireAll(
        permissions: readonly string[],
    ): Promise<void>;

}

interface AuthorizationServiceDependencies {

    currentUserService: CurrentUserService;

}


class DefaultAuthorizationService
implements AuthorizationService {

    constructor(
        private readonly currentUserService: CurrentUserService,
    ) {}

    async can(
        permission: string,
    ): Promise<boolean> {
        const currentUser = await this.currentUserService.get();
        return currentUser?.userContext.permissions.some(p => p.key === permission) ?? false;
    }

    require(
        permission: string,
    ): void {
       if (!(this.can(permission))) {
            throw new Error(`User does not have required permission: ${permission}`);
        }
    }

    canAny(
        permissions: readonly string[],
    ): boolean {
        return permissions.some(permission => this.can(permission));
    }

    async requireAny(
        permissions: readonly string[],
    ): Promise<void> {
        if (!await this.canAny(permissions)) {
            throw new Error(`User does not have any of the required permissions: ${permissions.join(", ")}`);
        }

    }

    async canAll(
        permissions: readonly string[],
    ): Promise<boolean> {
        return permissions.every(permission => this.can(permission));
    }

    async requireAll(
        permissions: readonly string[],
    ): Promise<void> {
        if (!await this.canAll(permissions)) {
            throw new Error(`User does not have all of the required permissions: ${permissions.join(", ")}`);
        }
    }
}


export function createAuthorizationService(
    dependencies: AuthorizationServiceDependencies
): AuthorizationService {
    return new DefaultAuthorizationService(
        dependencies.currentUserService,
    );
}