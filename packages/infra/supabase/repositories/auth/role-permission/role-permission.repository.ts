import { SupabaseClient } from "@supabase/supabase-js";
import { RolePermissionRepository } from "../../../../../auth/domain/authorization";

export class SupabaseRolePermissionRepository 
implements RolePermissionRepository {

    constructor(
        private readonly client: SupabaseClient
    ) { }

    // Read Single

    async getPermissionsByRole(
        role: string
    ): Promise<string[]> {
        const { data, error } = await this.client
            .schema("identity")
            .from("role_permissions")
            .select("permission_id")
            .eq("role_id", role);

        if (error) {
            throw new Error(`Error fetching permissions for role ${role}: ${error.message}`);
        }

        return data.map((item) => item.permission_id);
    }

    // Read Batch

    async getPermissionsByRoles(
        roles: readonly string[],
    ): Promise<string[]> {
        const { data, error } = await this.client
            .schema("identity")
            .from("role_permissions")
            .select("permission_id")
            .in("role_id", roles);

        if (error) {
            throw new Error(`Error fetching permissions for roles ${roles.join(", ")}: ${error.message}`);
        }

        return data.map((item) => item.permission_id);
    }

    async getRolesByPermission(
        permission: string
    ): Promise<string[]> {
        const { data, error } = await this.client
            .schema("identity")
            .from("role_permissions")
            .select("role_id")
            .eq("permission_id", permission);
        
        if (error) {
            throw new Error(`Error fetching roles for permission ${permission}: ${error.message}`);
        }

        return data.map((item) => item.role_id);
    }

    // Write Single

    async addRolePermission(
        role: string,
        permission: string,
        assignedBy: string
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("role_permissions")
            .insert({
                role_id: role,
                permission_id: permission,
                assigned_by: assignedBy
            });
            
        if (error) {
            throw new Error(`Error adding permission ${permission} to role ${role}: ${error.message}`);
        }

    }

    async removeRolePermission(
        role: string,
        permission: string
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("role_permissions")
            .delete()
            .eq("role_id", role)
            .eq("permission_id", permission);

        if (error) {
            throw new Error(`Error removing permission ${permission} from role ${role}: ${error.message}`);
        }
    }

    // Write Role -> Permission Batch

    async addRolePermissions(
        role: string,
        permissions: readonly string[], 
        assignedBy: string
    ): Promise<void> {
        const records = permissions.map(permission => ({
            role_id: role,
            permission_id: permission,
            assigned_by: assignedBy
        }));
        const { error } = await this.client
            .schema("identity")
            .from("role_permissions")
            .insert(records);
            
        if (error) {
            throw new Error(`Error adding permissions ${permissions.join(", ")} to role ${role}: ${error.message}`);
        }

    }

    async removeRolePermissions(
        role: string,
        permissions: readonly string[]
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("role_permissions")
            .delete()
            .eq("role_id", role)
            .in("permission_id", permissions);
                
        if (error) {
            throw new Error(`Error removing permissions ${permissions.join(", ")} from role ${role}: ${error.message}`);
        }   

    }

    // Write Permission -> Role Batch

    async addPermissionRoles(

        permission: string,
        roles: readonly string[],
        assignedBy: string
    ): Promise<void> {
        const records = roles.map(role => ({
            role_id: role,
            permission_id: permission,
            assigned_by: assignedBy
        }));
        const { error } = await this.client
            .schema("identity")
            .from("role_permissions")
            .insert(records);

        if (error) {
            throw new Error(`Error adding roles ${roles.join(", ")} to permission ${permission}: ${error.message}`);
        }
        
    }

    async removePermissionRoles(
        permission: string,
        roles: readonly string[]
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("role_permissions")
            .delete()
            .eq("permission_id", permission)
            .in("role_id", roles);
        
        if (error) {
            throw new Error(`Error removing roles ${roles.join(", ")} from permission ${permission}: ${error.message}`);
        }

    }

}