import type { Ability } from "./ability";
import type { CurrentUser } from "../types";

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