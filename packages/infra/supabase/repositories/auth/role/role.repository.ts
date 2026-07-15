import type { SupabaseClient } from "@supabase/supabase-js";

import { RoleRepository } from "@repo/database/repositories";

import { toRole } from "./to-role";
import { Role, RoleList, RoleListOptions } from "../../../../../auth/domain/authorization";

export class SupabaseRoleRepository 
    implements RoleRepository {

    constructor(
        private readonly client: SupabaseClient
    ) {}

    private createListQuery(
        options: RoleListOptions
    ) {
        let query = this.client
            .schema("identity")
            .from("roles")
            .select("*");

        if (options.roleIds) {
            query = query.in("id", options.roleIds);
        }

        if (options.type) {
            query = query.in("type", options.type);
        }

        if (options.CreateDateBefore) {
            query = query.lte("created_at", options.CreateDateBefore.toISOString());
        }

        if (options.CreateDateAfter) {
            query = query.gte("created_at", options.CreateDateAfter.toISOString());
        }

        if (options.keyword) {
            query = query.ilike("name", `%${options.keyword}%`);
        }

        if (options.sort) {
            switch (options.sort) {
                case "newest":
                    query = query.order("created_at", { ascending: false });
                    break;
                case "oldest":
                    query = query.order("created_at", { ascending: true });
                    break;
                case "name-asc":
                    query = query.order("name", { ascending: true });
                    break;

                case "name-desc":
                    query = query.order("name", { ascending: false });
                    break;

                case "type-asc":
                    query = query.order("type", { ascending: true });
                    break;
                case "type-desc":
                    query = query.order("type", { ascending: false });
                    break;
            }
        }

        const from = (options.page - 1) * options.pageSize;
        query = query.range(from, from + options.pageSize - 1);

        return query;
    }


    // Read Single

    async findById(
        roleId: string
    ): Promise<Role> {
        const { data, error } = await this.client
            .schema("identity")
            .from("roles")
            .select("*")
            .eq("id", roleId)
            .single();

        if (error) {
            throw error;
        }

        return toRole(data);
    }

    // Read Batch

    async findByType(
        roleType: string,
    ): Promise<Role[]> {
        const { data, error } = await this.client
            .schema("identity")
            .from("roles")
            .select("*")
            .eq("type", roleType);

        if (error) {
            throw error;
        }

        return data.map(toRole);
    }

    async listByIds(
        roleIds: readonly string[],
    ): Promise<Role[]> {
        const { data, error } = await this.client
            .schema("identity")
            .from("roles")
            .select("*")
            .in("id", roleIds);

        if (error) {
            throw error;
        }

        return data.map(toRole);
    }

    async list(): Promise<Role[]> {
        const { data, error } = await this.client
            .schema("identity")
            .from("roles")
            .select("*");

        if (error) {
            throw error;
        }

        return data.map(toRole);
    }
    
    async search(
        options: RoleListOptions
    ): Promise<RoleList> {
        const query = this.createListQuery(options);

        const { data, error, count } = await query;

        if (error) {
            throw error;
        }

        return {
            items: data.map(toRole),
            total: count ?? 0,
            page: options.page,
            pageSize: options.pageSize,
        };
    }

    // Existing Single

    async exists(
        roleId: string,
    ): Promise<boolean> {
        const { data, error } = await this.client
            .schema("identity")
            .from("roles")
            .select("id", { count: "exact" })
            .eq("id", roleId)
            .single();

        if (error) {
            throw error;
        }

        return !!data;
    }

    // Existing Batch

    async listExistingRoleIds(
        roleIds: readonly string[],
    ): Promise<string[]> {
        const { data, error } = await this.client
            .schema("identity")
            .from("roles")
            .select("id")
            .in("id", roleIds);

        if (error) {
            throw error;
        }

        return data.map((row) => row.id);
    }

    // Write Single

    async create(
        role: Role
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("roles")
            .insert(role);

        if (error) {
            throw error;
        }

    }

    async update(
        roleId: string, 
        role: Role
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("roles")
            .update(role)
            .eq("id", roleId);

        if (error) {
            throw error;
        }

    }

    async delete(
        roleId: string
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("roles")
            .delete()
            .eq("id", roleId);

        if (error) {
            throw error;
        }
    }

    // Write Batch

    async createMany(
        roles: readonly Role[],
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("roles")
            .insert(roles);

        if (error) {
            throw error;
        }

    }   

    async updateMany(
        roles: readonly Role[],
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .rpc("update_roles", { roles });

        if (error) {
            throw error;
        }

    }

    async deleteMany(
        roleIds: readonly string[],
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("roles")
            .delete()
            .in("id", roleIds); 

        if (error) {
            throw error;
        }

    }

}