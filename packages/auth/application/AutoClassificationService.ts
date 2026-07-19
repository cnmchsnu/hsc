import { UserService } from "../domain/identity";
import { ProfileRepository } from "@repo/database/repositories";


export interface AutoClassificationService {

    Determine(): Promise<string>;

}

interface AutoClassificationServiceDependencies {

    userService: UserService;


}

class DefaultAutoClassificationService
    implements AutoClassificationService {

        constructor(
            private readonly userService: UserService,
        ) {}

        private matchEmail(
            email: string,
            pattern: RegExp
        ):  boolean {
            return pattern.test(email);
        }


        async Determine(): Promise<string> {

            const user = await this.userService.get();

            if (!user) {
                throw new Error("No user is currently logged in.");
            }

            const userEmail = user.email;

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
        dependencies.userService,
    );
}