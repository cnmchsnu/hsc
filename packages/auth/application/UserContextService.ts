import {
    PermissionRepository,
    ProfileRepository,
    RolePermissionRepository,
    RoleRepository,
    UserRoleRepository
} from "@repo/database/repositories";

import type { Profile } from "../domain/profile";
import type { Role, Permission } from "../domain/authorization";
import type { User, UserService } from "../domain/identity";




export interface UserContext {

    user: User;

    profile: Profile | null;

    roles: readonly Role[];

    permissions: readonly Permission[];

}

export interface UserContextService {

    getCurrentUser(
        userId: string
    ): Promise<UserContext| null>;

    // getMany(
    //     userIds: readonly string[],
    // ): Promise<readonly UserContext[]>;

}

interface UserContextDependencies {

    userService: UserService;

    profileRepository: ProfileRepository;

    userRoleRepository: UserRoleRepository;

    roleRepository: RoleRepository;

    rolePermissionRepository: RolePermissionRepository;

    permissionRepository: PermissionRepository;

}

class DefaultUserContextService
    implements UserContextService {

        constructor(

            private readonly userService: UserService,

            private readonly profileRepository: ProfileRepository,

            private readonly userRoleRepository: UserRoleRepository,

            private readonly roleRepository: RoleRepository,

            private readonly rolePermissionRepository: RolePermissionRepository,

            private readonly permissionRepository: PermissionRepository,

        ) {}

        async getCurrentUser(userId: string): Promise<UserContext| null> {

            const user = await this.userService.getUserById(userId);

            if (!user) {
                return null;
            }

            const profile = await this.profileRepository.findById(user.id);

            const rolesIds = await this.userRoleRepository.getUserRoles(user.id);

            const roles = await this.roleRepository.listByIds(rolesIds);

            const permissionsIds = await this.rolePermissionRepository.getPermissionsByRoles(rolesIds);

            const permissions = await this.permissionRepository.getPermissionsByIds(permissionsIds);

            return {
                user,
                profile,
                roles,
                permissions
            };
        }

    
}


export function createUserContextService(
    dependencies: UserContextDependencies
): UserContextService {
    return new DefaultUserContextService(
        dependencies.userService,
        dependencies.profileRepository,
        dependencies.userRoleRepository,
        dependencies.roleRepository,
        dependencies.rolePermissionRepository,
        dependencies.permissionRepository
    );
}