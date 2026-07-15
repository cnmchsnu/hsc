import { UserContextService } from "./UserContextService";
import { SessionService } from "../domain/identity";


export interface AutoClassificationService {

    Determine(): Promise<string>;

}

interface AutoClassificationServiceDependencies {

    sessionService: SessionService;

    userContextService: UserContextService;

}

class DefaultAutoClassificationService
    implements AutoClassificationService {

        constructor(
            private readonly sessionService: SessionService,

            private readonly userContextService: UserContextService,
        ) {}

        private matchEmail(
            email: string,
            pattern: RegExp
        ):  boolean {
            return pattern.test(email);
        }


        async Determine(): Promise<string> {

            const session = await this.sessionService.getSession();

            if (!session) {
                throw new Error("No active session found.");
            }

            const userContext = await this.userContextService.getCurrentUser(session.userId);

            if (!userContext) {
                throw new Error("User context not found for the current session.");
            }

            const userEmail = userContext.user.email;

            if (this.matchEmail(userEmail, /^(\d{6}|\d{8})@gs\.hs\.ntnu\.edu\.tw$/)) {
                return "student";
            }

            if (this.matchEmail(userEmail, /^t+\d*@gs\.hs\.ntnu\.edu\.tw$/)) {
                return "teacher";
            }

            if (this.matchEmail(userEmail, /@gs\.hs\.ntnu\.edu\.tw$/)) {
                return "internal";
            }

            return "external";
        }
    }

export function createAutoClassificationService(
    dependencies: AutoClassificationServiceDependencies
): AutoClassificationService {
    return new DefaultAutoClassificationService(
        dependencies.sessionService,
        dependencies.userContextService,
    );
}