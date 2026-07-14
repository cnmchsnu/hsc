"server-only";

import { createServerClient } from '@repo/infra/supabase/client/server';

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
            

import { createAuthorizationService, type AuthorizationService } from "../application/AuthorizationService";
import { createAuthenticationReadService, type AuthenticationReadService } from "../application/AuthenticationReadService";
import { createCurrentUserService } from "../application/CurrentUserService";
import { createProfileSyncService } from "../application/ProfileSyncService";
import { createLoginFlowService, type LoginFlowService } from "../application/LoginFlowService";
import { createSessionService, createUserService } from "../domain/identity";
import { createUserContextService } from "../application/UserContextService";
import { createProfileInitializationService } from "../application/ProfileInitalizationService";
import { createAutoClassificationService } from "../application/AutoClassificationService";



export interface AuthContainer {

    authenticationReadService: AuthenticationReadService;

    authorizationService: AuthorizationService;

}


export async function createAuthContainer(): Promise<AuthContainer> {

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

    const userContextService =
        createUserContextService({
            userService,
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
            sessionService,
            userContextService
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
            sessionService,
            userContextService
        });

    const profileInitializationService =
        createProfileInitializationService({
            autoClassificationService,
            profileRepository
        });

    const loginFlowService =
        createLoginFlowService({
            sessionService,
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

    

    return {
        
        authenticationReadService,

        authorizationService,

    };
}
