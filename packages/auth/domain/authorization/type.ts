export type PermissionKey = string;

export interface Role {
    id: string;
    name: string;
    type: string;
}

export interface Authorization {
    roles: ReadonlySet<string>;
    permissions: ReadonlySet<PermissionKey>;
}
