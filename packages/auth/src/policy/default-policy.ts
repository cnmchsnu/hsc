import type { PermissionPolicy } from "./permission-policy";
import type { PermissionKey } from "../types";

export const defaultPermissionPolicy: PermissionPolicy = {

    can(permissions, required) {

        return permissions.has(required);

    },

};