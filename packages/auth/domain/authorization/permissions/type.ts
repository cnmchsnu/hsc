export interface Permission {

    id: string;

    key: string;

    scope: string;

    description: string | null;
}


export interface PermissionList {

    permissions: Permission[];

    total: number;

    page: number;

    pageSize: number;

}

export type PermissionSort =
    | "newest"
    | "oldest"
    | "key-asc"
    | "key-desc"
    | "scope-asc"
    | "scope-desc";

export interface PermissionListOptions {

    page: number;

    pageSize: number;

    keyword?: string;

    permissionIds?: readonly string[];

    scope?: string[];

    CreateDateBefore?: Date;

    CreateDateAfter?: Date;

    sort?: PermissionSort;

}