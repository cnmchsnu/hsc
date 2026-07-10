export interface Role {

    id: string;

    name: string;

    scope: RoleTypes;

    description: string | null;
    
}

export type RoleTypes = 
    | "ADMIN"
    | "SHOP"
    | "SHOP_CONSOLE"
    | "EVENT_CONSOLE";

export interface RoleList {

    items: Role[];

    total: number;

    page: number;

    pageSize: number;

}

export type RoleSort =
    | "newest"
    | "oldest"
    | "name-asc"
    | "name-desc"
    | "type-asc"
    | "type-desc";


export interface RoleListOptions {

    page: number;

    pageSize: number;

    keyword?: string;

    roleIds?: readonly string[];

    type?: RoleTypes[];

    CreateDateBefore?: Date;

    CreateDateAfter?: Date;

    sort?: RoleSort;

}