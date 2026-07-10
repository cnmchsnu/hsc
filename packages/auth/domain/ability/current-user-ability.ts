import type { Ability } from "./ability";
import type { CurrentUser } from "../current-user/type";

export function createCurrentUserAbility(
    currentUser: CurrentUser,
): Ability {

    return {

        can(
            permission,
        ) {

            return currentUser.authorization.permissions.has(
                permission,
            );

        },

    };

}
