"server-only";

import { createServerClient } from '@repo/infra/supabase/client/server';
import { cache } from 'react';

import {
    SupabaseSessionProvider,
    SupabaseUserProvider
} from "@repo/infra/supabase/auth";

import {
    SupabaseProfileRepository,
    SupabaseRoleRepository,
    SupabasePermissionRepository,
    SupabaseRolePermissionRepository,
    SupabaseUserRoleRepository
} from "@repo/infra/supabase/repositories";

import type {
    AuthorizationService,
    AuthenticationReadService,
    ProfileCommandService
} from "../application";

import {
    createAuthorizationService,
    createAuthenticationReadService,
    createProfileCommandService,
    createCurrentUserService,
    createProfileSyncService,
    createLoginFlowService,
    createUserAuthorizationContextService,
    createProfileInitializationService,
    createAutoClassificationService,
} from "../application/";

import { createSessionService, createUserService } from "../domain/identity";

export interface AuthContainer {

    authenticationReadService: AuthenticationReadService;

    authorizationService: AuthorizationService;

    profileCommandService: ProfileCommandService;

}


export const createAuthContainer = cache(async (): Promise<AuthContainer> => {

    const client = 
        await createServerClient();

    const profileRepository =
        new SupabaseProfileRepository(client);
        
    const roleRepository =
        new SupabaseRoleRepository(client);

    const permissionRepository =
        new SupabasePermissionRepository(client);

    const rolePermissionRepository =
        new SupabaseRolePermissionRepository(client);

    const userRoleRepository =
        new SupabaseUserRoleRepository(client);

    const sessionProvider =
        new SupabaseSessionProvider();

    const userProvider =
        new SupabaseUserProvider();
    
    const userService = createUserService({
        userProvider
    });

    const userAuthorizationContextService =
        createUserAuthorizationContextService({
            profileRepository,
            roleRepository,
            permissionRepository,
            rolePermissionRepository,
            userRoleRepository
        });

    const sessionService =
        createSessionService({
            sessionProvider
        });

    const currentUserService =
        createCurrentUserService({
            userService,
            profileRepository,
            userAuthorizationContextService
        });

    const authorizationService =
        createAuthorizationService({
            currentUserService
        });

    const profileSyncService =
        createProfileSyncService({
            userService,
            profileRepository
        });

    const autoClassificationService =
        createAutoClassificationService({
            userService,
        });

    const profileInitializationService =
        createProfileInitializationService({
            autoClassificationService,
            profileRepository
        });

    const loginFlowService =
        createLoginFlowService({
            userService,
            profileSyncService,
            profileInitializationService,
            profileRepository
        });

    const authenticationReadService =
        createAuthenticationReadService({
            sessionService,
            currentUserService,
            loginFlowService
        });
    
    const profileCommandService =
        createProfileCommandService({
            currentUserService,
            profileRepository
        });
    

    return {
        
        authenticationReadService,

        authorizationService,

        profileCommandService

    };
});
