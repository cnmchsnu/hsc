import type { SupabaseClient } from "@supabase/supabase-js";

import type {
    CreateProfileInput,
    UpdateProfileInput,
    UserProfile,
} from "@repo/auth/types";

import type {
    ProfileRepository,
} from "../interfaces";

import type {
    UserProfileRow,
} from "../types/profile-row";

import {
    fromCreateProfileInput,
    fromUpdateProfileInput,
    toUserProfile,
} from "../mappers";

export class SupabaseProfileRepository
    implements ProfileRepository {

    constructor(
        private readonly client: SupabaseClient,
    ) {}

    async findByUserId(
        userId: string,
    ): Promise<UserProfile | null> {

        const identityClient =
            this.client.schema("identity");

        const {
            data,
            error,
        } = await identityClient
            .from("user_profiles")
            .select("*")
            .eq("user_id", userId)
            .maybeSingle<UserProfileRow>();

        if (error) {
            throw error;
        }

        if (!data) {
            return null;
        }

        return toUserProfile(data);
    }

    async create(
        input: CreateProfileInput,
    ): Promise<UserProfile> {

        const {
            data,
            error,
        } = await this.client
            .schema("identity")
            .from("user_profiles")
            .insert(fromCreateProfileInput(input))
            .select()
            .single<UserProfileRow>();

        if (error) {
            throw error;
        }

        return toUserProfile(data);
    }

    async update(
        userId: string,
        input: UpdateProfileInput,
    ): Promise<UserProfile> {

        const {
            data,
            error,
        } = await this.client
            .schema("identity")
            .from("user_profiles")
            .update(fromUpdateProfileInput(input))
            .eq("user_id", userId)
            .select()
            .single<UserProfileRow>();

        if (error) {
            throw error;
        }

        return toUserProfile(data);
    }
}