import { UserContext, UserContextService } from './UserContextService';
import { Session, SessionService } from "../domain/identity";



export interface CurrentUser {

    session: Session;
    
     userContext: UserContext;

}



export interface CurrentUserService {

    get(): Promise<CurrentUser | null>;

    require(): Promise<void>;

}




interface CurrentUserServiceDependencies {

    sessionService: SessionService;

    userContextService: UserContextService;


}

class DefaultCurrentUserService
    implements CurrentUserService {

        constructor(
            private readonly sessionService: SessionService,
            private readonly userContextService: UserContextService,
        ) {}

        async get(): Promise<CurrentUser | null> {
            const session =
                await this.sessionService
                .getSession();

            if (!session) {
                return null;
            }

            const userContext =
                await this.userContextService
                .getCurrentUser(session.userId);

            if (!userContext) {
                return null;
            }

            return {
                session,
                userContext
            };
        }

        async require(): Promise<void> {

            const currentUser = await this.get();

            if (!currentUser) {
                throw new Error("User is not authenticated");
            }

        }
    
}


export function createCurrentUserService(
    dependencies: CurrentUserServiceDependencies
): CurrentUserService {
    return new DefaultCurrentUserService(
        dependencies.sessionService,
        dependencies.userContextService
    );
}