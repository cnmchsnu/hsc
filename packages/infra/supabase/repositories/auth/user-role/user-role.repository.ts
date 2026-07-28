 import type { SupabaseClient } from "@supabase/supabase-js";

import { UserRoleRepository } from "../../../../../auth/domain/authorization";


export class SupabaseUserRoleRepository
    implements UserRoleRepository {

    constructor(
        private readonly client: SupabaseClient
    ) { }

    // Read Single

    async getUserRoles(
        userId: string
    ): Promise<string[]> {
        const { data, error } = await this.client
            .schema("identity")
            .from("user_roles")
            .select("role_id")
            .eq("user_id", userId);

        if (error) {
            throw new Error(`Error fetching user roles for user ${userId}: ${error.message}`);
        }

        return data.map((item) => item.role_id);
    }

    // Read Batch

    async getUsersByRole(
        role: string
    ): Promise<string[]> {
        const { data, error } = await this.client
            .schema("identity")
            .from("user_roles")
            .select("user_id")
            .eq("role_id", role);

        if (error) {
            throw new Error(`Error fetching users for role ${role}: ${error.message}`);
        }

        return data.map((item) => item.user_id);
    }

    async getUsersByRoles(
        roles: readonly string[]
    ): Promise<string[]> {
        const { data, error } = await this.client
            .schema("identity")
            .from("user_roles")
            .select("user_id")
            .in("role_id", roles);

        if (error) {
            throw new Error(`Error fetching users for roles ${roles.join(", ")}: ${error.message}`);
        }

        return data.map((item) => item.user_id);
    }

    // Write Single

    async addUserRole(
        userId: string,
        role: string,
        assignedBy: string
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("user_roles")
            .insert({
                user_id: userId,
                role_id: role,
                assigned_by: assignedBy,
            });

        if (error) {
            throw new Error(`Error adding role ${role} to user ${userId}: ${error.message}`);
        }
    }

    async removeUserRole(
        userId: string,
        role: string
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("user_roles")
            .delete()
            .eq("user_id", userId)
            .eq("role_id", role);
        
        if (error) {
            throw new Error(`Error removing role ${role} from user ${userId}: ${error.message}`);
        }

    }

    // Write User -> Roles batch

    async addUserRoles(
        userId: string,
        roles: readonly string[],
        assignedBy: string
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("user_roles")
            .insert(
                roles.map((role) => ({
                    user_id: userId,
                    role_id: role,
                    assigned_by: assignedBy,
                }))
            );
            
        if (error) {
            throw new Error(`Error adding roles ${roles.join(", ")} to user ${userId}: ${error.message}`);
        }

    }

    async removeUserRoles(
        userId: string,
        roles: readonly string[],
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("user_roles")
            .delete()
            .eq("user_id", userId)
            .in("role_id", roles);

        if (error) {
            throw new Error(`Error removing roles ${roles.join(", ")} from user ${userId}: ${error.message}`);
        }

    }

    // Write Role -> Users batch

    async addRoleUsers(

        role: string,
        users: readonly string[],
        assignedBy: string
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("user_roles")
            .insert(
                users.map((userId) => ({
                    user_id: userId,
                    role_id: role,
                    assigned_by: assignedBy,
                }))
            );

        if (error) {
            throw new Error(`Error adding users ${users.join(", ")} to role ${role}: ${error.message}`);
        }

    }

    async removeRoleUsers(
        role: string,
        users: readonly string[]
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("user_roles")
            .delete()
            .eq("role_id", role)
            .in("user_id", users);

        if (error) {
            throw new Error(`Error removing users ${users.join(", ")} from role ${role}: ${error.message}`);
        }

    }
}