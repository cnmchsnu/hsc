import {
    PermissionRepository,
    RolePermissionRepository,
    RoleRepository,
    UserRoleRepository
} from "../domain/authorization";

import { ProfileRepository } from "../domain/profile";

import type { Profile } from "../domain/profile";
import type { Role, Permission } from "../domain/authorization";




export interface UserAuthorizationContext {

    profile: Profile | null;

    roles: readonly Role[];

    permissions: readonly Permission[];

}

export interface UserAuthorizationContextService {

    get(
        userId: string
    ): Promise<UserAuthorizationContext| null>;

    // getMany(
    //     userIds: readonly string[],
    // ): Promise<readonly UserAuthorizationContext[]>;

}

interface UserAuthorizationContextDependencies {

    profileRepository: ProfileRepository;

    userRoleRepository: UserRoleRepository;

    roleRepository: RoleRepository;

    rolePermissionRepository: RolePermissionRepository;

    permissionRepository: PermissionRepository;

}

class DefaultUserAuthorizationContextService
    implements UserAuthorizationContextService {

        constructor(

            private readonly profileRepository: ProfileRepository,

            private readonly userRoleRepository: UserRoleRepository,

            private readonly roleRepository: RoleRepository,

            private readonly rolePermissionRepository: RolePermissionRepository,

            private readonly permissionRepository: PermissionRepository,

        ) {}

        async get(userId: string): Promise<UserAuthorizationContext | null> {



            const profile = await this.profileRepository.findByUid(userId);

            const rolesIds = await this.userRoleRepository.getUserRoles(userId);

            const roles = await this.roleRepository.listByIds(rolesIds);

            const permissionsIds = await this.rolePermissionRepository.getPermissionsByRoles(rolesIds);

            const permissions = await this.permissionRepository.getPermissionsByIds(permissionsIds);

            return {
                profile,
                roles,
                permissions
            };
        }

    
}


export function createUserAuthorizationContextService(
    dependencies: UserAuthorizationContextDependencies
): UserAuthorizationContextService {
    return new DefaultUserAuthorizationContextService(
        dependencies.profileRepository,
        dependencies.userRoleRepository,
        dependencies.roleRepository,
        dependencies.rolePermissionRepository,
        dependencies.permissionRepository
    );
}