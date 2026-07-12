import type { SupabaseClient } from "@supabase/supabase-js";

import type {
    Permission,
    PermissionList,
    PermissionListOptions,
} from "../../../../../auth/domain/authorization";

import type {
    PermissionRepository,
} from "@repo/database/repositories";

import { toPermission } from "./mapper";


export class SupabasePermissionRepository 
    implements PermissionRepository {
    constructor(
        private readonly client: SupabaseClient,
    ) { }

    private createListQuery(
        options: PermissionListOptions
    ) {
        let query = this.client
            .schema("identity")
            .from("permissions")
            .select(
                "*",

                {
                    count: "exact",
                }
            );

        if (options.permissionIds) {
            query =
                query.in(
                    "id",
                    options.permissionIds,
                );
        }

        if (options.scope) {
            query =
                query.in(
                    "scope",
                    options.scope,
                );
        }

        if (options.CreateDateBefore) {
            query =
                query.lt(
                    "created_at",
                    options.CreateDateBefore.toISOString(),
                );
        }

        if (options.CreateDateAfter) {
            query =
                query.gt(
                    "created_at",
                    options.CreateDateAfter.toISOString(),
                );
        }

        if (options.keyword) {
            query =
                query.ilike(
                    "key",
                    `%${options.keyword}%`,
                );
        }

        if (options.sort) {
            switch (options.sort) {
                case "newest":
                    query =
                        query.order(
                            "created_at",
                            {
                                ascending: false,
                            }
                        );
                    break;

                case "oldest":
                    query =
                        query.order(    
                        "created_at",
                            {
                                ascending: true,
                            }
                        );
                    break;

                case "key-asc":
                    query =
                        query.order(
                            "key",
                            {
                                ascending: true,
                            }
                        );
                    break;

                case "key-desc":
                    query =
                        query.order(
                            "key",
                            {
                                ascending: false,
                            }
                        );
                    break;  

                case "scope-asc":
                    query =
                        query.order(
                            "scope",
                            {
                                ascending: true,
                            }
                        );
                    break;

                case "scope-desc":
                    query =
                        query.order(
                            "scope",

                            {
                                ascending: false,
                            }

                        );
                    break;
            }

        }

        const from =
            (options.page - 1)
                * options.pageSize;
        query =
            query.range(
                from,
                from + options.pageSize - 1,
            );
        
        return query;
    }

    // Read Single

    async getPermissionById(
        permissionId: string,
    ): Promise<Permission | null> {
        const { data, error } =
            await this.client
                .schema("identity")
                .from("permissions")
                .select("*")
                .eq("id", permissionId)
                .single();

        if (error) {
            
            throw error;
        }

        if (!data) {
            return null;
        }

        return toPermission(data);
    }

   // Read Batch 

    async getPermissionsByIds(
        permissionIds: readonly string[]
    ): Promise<Permission[]> {
        if (permissionIds.length === 0) {
            return [];
        }

        const { data, error } =
            await this.client
                .schema("identity")
                .from("permissions")
                .select("*")
                .in("id", [...permissionIds]);

        if (error) {
            throw error;
        }

        return data.map(toPermission);
    }

    // Read Batch

    async list(): Promise<Permission[]> {
        const { data, error } =
            await this.client
                .schema("identity")
                .from("permissions")
                .select("*");

        if (error) {
            throw error;
        }

        return data.map(toPermission);
    }

    async search(
        options: PermissionListOptions
    ): Promise<PermissionList> {
        
        const query =
            this.createListQuery(options);

        const { data, count, error } =
            await query;

        if (error) {
            throw error;
        }

        return {
            permissions: data.map(toPermission),
            total: count ?? 0,
            page: options.page,
            pageSize: options.pageSize,
        };
    }

    // Write Single

    async add(
        permission: Permission
    ): Promise<void> {
        const { error } =
            await this.client
                .schema("identity")
                .from("user_permissions")
                .insert(permission);

        if (error) {
            throw error;
        }
    }

    async update(
        permission: string,
        newPermission: Permission
    ): Promise<void> {
        const { error } =
            await this.client
                .schema("identity")
                .from("permissions")
                .update(newPermission)
                .eq("permission", permission);

        if (error) {
            throw error;
        }

    }

    async remove(
        permissionId: string
    ): Promise<void> {
        const { error } =
            await this.client
                .schema("identity")
                .from("permissions")
                .delete()
                .eq("id", permissionId);

        if (error) {
            throw error;

        }
    }

    // Write Batch

    async addMany(
        permissions: readonly Permission[]
    ): Promise<void> {
        const { error } =
            await this.client
                .schema("identity")
                .from("user_permissions")
                .insert(permissions);

        if (error) {

            throw error;
        }

    }

    async updateMany(
        permissions: readonly Permission[]
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .rpc("update_profiles",{
                permissions: permissions.map((permission: Permission) =>({
                    id: permission.id,
                    key: permission.key,
                    description: permission.description,
                    scope: permission.scope                    
                }))

            })
    }

    async removeMany(
        permissionIds: readonly string[]
    ): Promise<void> {

        if (permissionIds.length === 0) return;

        const { error } = await this.client
            .schema("identity")
            .from("permissions")
            .delete()
            .in("id", [...permissionIds])

        if ( error )  {
            throw new Error(error.message)
        }
    }

}