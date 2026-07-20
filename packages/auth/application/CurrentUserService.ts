import { UserAuthorizationContext, UserAuthorizationContextService } from './UserAuthorizationContextService';
import { UserService } from "../domain/identity";
import { Profile } from '../domain/profile';
import { ProfileRepository } from '../../database/repositories/identity';




export interface CurrentUserProfile extends Profile {
    email: string;
}

export type CurrentUserAuthorizationContext = UserAuthorizationContext;




export interface CurrentUserService {

    getCurrentUserProfile(): Promise<CurrentUserProfile | null>;

    getCurrentUserAuthorizationContext(): Promise<CurrentUserAuthorizationContext | null>;

    require(): Promise<void>;

}




interface CurrentUserServiceDependencies {

    userService: UserService;

    profileRepository: ProfileRepository;

    userAuthorizationContextService: UserAuthorizationContextService;


}

class DefaultCurrentUserService
    implements CurrentUserService {

        constructor(
            private readonly userService: UserService,
            private readonly profileRepository: ProfileRepository,
            private readonly userAuthorizationContextService: UserAuthorizationContextService,
        ) {}

        async getCurrentUserProfile(): Promise<CurrentUserProfile | null> {
            const user = await this.userService.get();

            if (!user) {
                return null;
            }

            const profile = await this.profileRepository.findById(user.id);

            if (!profile) {
                return null;
            }

            return {
                ...profile,
                email: user.email
            };
        }

        async getCurrentUserAuthorizationContext(): Promise<CurrentUserAuthorizationContext | null> {
            const user = await this.userService.get();

            if (!user) {
                return null;
            }

            const userContext =
                await this.userAuthorizationContextService
                .get(user.id);

            if (!userContext) {
                return null;
            }

            return userContext
        }

        async require(): Promise<void> {

            const currentUser = await this.getCurrentUserProfile();

            if (!currentUser) {
                throw new Error("User is not authenticated");
            }

        }
    
}


export function createCurrentUserService(
    dependencies: CurrentUserServiceDependencies
): CurrentUserService {
    return new DefaultCurrentUserService(
        dependencies.userService,
        dependencies.profileRepository,
        dependencies.userAuthorizationContextService
    );
}