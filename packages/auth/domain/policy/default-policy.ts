import type { PermissionPolicy } from "./permission-policy";
import type { PermissionKey } from "../authorization/type";

export const defaultPermissionPolicy: PermissionPolicy = {

    can(permissions, required) {

        return permissions.has(required);

    },

};
