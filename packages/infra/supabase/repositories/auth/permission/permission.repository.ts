import type { SupabaseClient } from "@supabase/supabase-js";

import type {
    Permission,
    PermissionList,
    PermissionListOptions,
} from "../../../../../auth/domain/authorization";

import type {
    CreatePermission,
    UpdatePermission,
} from "../../../../../auth/application/authorization/permissions";

import type {
    PermissionRepository,
} from "@repo/database/repositories";

import { PermissionRepositoryMapper as mapper } from "./mapper";


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

        return mapper.fromRow(data);
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

        return [...mapper.fromRows(data)];
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

        return [...mapper.fromRows(data)];
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
            permissions: [...mapper.fromRows(data)],
            total: count ?? 0,
            page: options.page,
            pageSize: options.pageSize,
        };
    }

    // Write Single

    async create(
        permission: CreatePermission
    ): Promise<void> {
        const row = mapper.toCreateRow(permission);

        const { error } =
            await this.client
                .schema("identity")
                .from("permissions")
                .insert(row)
                .select("*")
                .single();

        if (error) {
            throw error;
        }
    }

    async update(
        permission: UpdatePermission
    ): Promise<void> {
        const row = mapper.toUpdateRow(permission);

        const { error } =
            await this.client
                .schema("identity")
                .from("permissions")
                .update(row)
                .eq("id", permission.id)
                .select("*")
                .single();

        if (error) {
            throw error;
        }
    }

    async delete(
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

    async createMany(
        permissions: readonly CreatePermission[]
    ): Promise<void> {
        const rows = mapper.toCreateRows(permissions);

        const { error } =
            await this.client
                .schema("identity")
                .from("permissions")
                .insert(rows)
                .select("*");

        if (error) {
            throw error;
        }
    }

    async updateMany(
        permissions: readonly UpdatePermission[]
    ): Promise<void> {
        if (permissions.length === 0) {
            return;
        }

        const rows = mapper.toUpdateRows(permissions);

        for (let index = 0; index < permissions.length; index += 1) {
            const permission = permissions[index];
            const row = rows[index];

            const { error } = await this.client
                .schema("identity")
                .from("permissions")
                .update(row)
                .eq("id", permission.id)
                .select("*")
                .single();

            if (error) {
                throw error;
            }
        }

    }

    async deleteMany(
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