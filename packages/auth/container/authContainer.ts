import "server-only";

import { createServerClient } from '@repo/infra/supabase/client';

import {
    SupabaseAuthenticationProvider,
    SupabaseSessionProvider
} from "@repo/infra/supabase/auth";

import {
    SupabaseUserRepository,
    SupabaseProfileRepository,
    SupabaseRoleRepository,
    SupabasePermissionRepository,
    SupabaseRolePermissionRepository,
    SupabaseUserRoleRepository
} from "@repo/infra/supabase/repositories";
            

import { createAuthorizationService, type AuthorizationService } from "../application/AuthorizationService";
import { createAuthenticationService, type AuthenticationService } from "../application/AuthenticationService";
import { createCurrentUserService, type CurrentUserService } from "../application/CurrentUserService";
import { createProfileSyncService } from "../application/ProfileSyncService";
import { createLoginFlowService } from "../application/LoginFlowService";
import { createSessionService } from "../domain/identity";
import { createUserContextService } from "../application/UserContextService";
import { createProfileInitializationService } from "../application/ProfileInitalizationService";
import { createAutoClassificationService } from "../application/AutoClassificationService";



export interface AuthContainer {

    authenticationService: AuthenticationService;

    authorizationService: AuthorizationService;

}


export async function createAuthContainer(): Promise<AuthContainer> {

    const client = 
        await createServerClient();

    const userRepository =
        new SupabaseUserRepository(client);

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
    
    const authenticationProvider
        = new SupabaseAuthenticationProvider();

    const userContextService =
        createUserContextService({
            userRepository,
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
            userRepository,
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
            userRepository,
            profileSyncService,
            profileInitializationService
        });

    const authenticationService =
        createAuthenticationService({
            provider: authenticationProvider,
            sessionService,
            currentUserService,
            loginFlowService
        });


    

    return {
        
        authenticationService,

        authorizationService
        
    };
}
