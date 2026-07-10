import type { SupabaseClient } from "@supabase/supabase-js";

import { User } from "../../../../../auth/domain/identity";
import { UserRepository } from "@repo/database/repositories";

import { toUser } from "./to-user";

export class SupabaseUserRepository
    implements UserRepository {

    constructor(
        private readonly cilent: SupabaseClient,
    ) {}

    async getById(
        id: string
    ): Promise<User | null> {
        const { data, error } = await this.cilent
            .schema("auth")
            .from("users")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            throw new Error(`Error fetching user by ID ${id}: ${error.message}`);
        }
        
        if (!data) {
            return null;
        }

        return toUser(data);
    }

    async getByIds(
        ids: readonly string[]
    ): Promise<readonly User[]> {

        const { data, error } = await this.cilent
            .schema("auth")
            .from("users")
            .select("*")
            .in("id", ids);

        if (error) {
            throw new Error(`Error fetching users by IDs ${ids.join(", ")}: ${error.message}`);
        }

        return data.map(toUser);
        
    }

    async findByEmail(
        email: string
    ): Promise<User | null> {
        const { data, error } = await this.cilent
            .schema("auth")
            .from("users")
            .select("*")
            .eq("email", email)
            .single();  

        if (error) {
            throw new Error(`Error fetching user by email ${email}: ${error.message}`);
        }

        if (!data) {
            return null;
        }

        return toUser(data);
    }

    async refreshIdentity(
        id: string
    ): Promise<User> {
        const { data, error } = await this.cilent
            .schema("auth")
            .from("users")
            .select("*")
            .eq("id", id)
            .single();
        
        if (error) {
            throw new Error(`Error refreshing identity for user ID ${id}: ${error.message}`);
        }

        if (!data) {
            throw new Error(`User with ID ${id} not found for identity refresh.`);
        }

        return toUser(data);
    }
}