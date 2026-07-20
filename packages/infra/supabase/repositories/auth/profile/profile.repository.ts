import type { SupabaseClient } from "@supabase/supabase-js";

import type {
    Profile,
    ProfileList,
    ProfileListOptions,
} from "../../../../../auth/domain/profile";

import type {
    ProfileRepository,
} from "@repo/database/repositories";

import {
    ProfileRepositoryMapper as mapper,
} from "./to-profile";


export class SupabaseProfileRepository
    implements ProfileRepository {

    constructor(
        private readonly client: SupabaseClient,
    ) {}

    private createListQuery(
        options: ProfileListOptions,
    ) {
        let query = this.client
            .schema("identity")
            .from("user_profiles")
            .select("*");

        if (options.profileIds) {
            query = 
                query.in(
                    "id",
                    options.profileIds
                );
        }

        if (options.classification) {
            query = 
                query.eq(
                    "final_classification",
                    options.classification
                );
        }

        if (options.studentId) {
            query = 
                query.eq(
                    "student_id",
                    options.studentId
                );
        }

        if (options.class) {
            query = 
                query.eq(
                    "class",
                    options.class
                );
        }

        if (options.number) {
            query = 
                query.eq(
                    "number",
                    options.number
                );
        }

        if (options.CreateDateBefore) {
            query = 
                query.lt(
                    "created_at",
                    options.CreateDateBefore.toISOString()
                );
        }

        if (options.CreateDateAfter) {
            query = 
                query.gt(
                    "created_at",
                    options.CreateDateAfter.toISOString()
                );
        }

        if (options.lastActiveDate) {
            query = 
                query.eq(
                    "updated_at",
                    options.lastActiveDate.toISOString()
                );
        }

        if (options.keyword) {
            query = 
                query.ilike(
                    "display_name",
                    `%${options.keyword}%`
                );
        }

        if (options.sort) {
            switch (options.sort) {
                case "newest":
                    query =
                        query.order(
                            "created_at",
                            {
                                ascending: false
                            }
                        );
                    break;

                case "oldest":
                    query =
                        query.order(
                            "created_at",
                            {
                                ascending: true
                            }
                        );
                    break;

                case "name-asc":
                    query =
                        query.order(
                            "display_name",
                            {
                                ascending: true
                            }
                        );
                    break;

                case "name-desc":
                    query =
                        query.order(
                            "display_name",
                            {
                                ascending: false
                            }
                        );
                    break;

                case "class-asc":
                    query =
                        query.order(
                            "class",
                            {
                                ascending: true
                            }
                        );
                    break;

                case "class-desc":
                    query =
                        query.order(
                            "class",
                            {
                                ascending: false
                            }
                        );
                    break;

                case "studentId-asc":
                    query =
                        query.order(
                            "student_id",
                            {
                                ascending: true
                            }
                        );
                    break;
                
                case "studentId-desc":
                    query =
                        query.order(
                            "student_id",
                            {
                                ascending: false
                            }
                        );
                    break;
            }

        }

        const from = 
            (options.page - 1)
            * options.pageSize;

        query = query.range(
            from,
            from + options.pageSize - 1
        );

        return query;


    }
    // Read Single

    async findById(
        userId: string
    ): Promise<Profile | null> {
        const { data, error } = await this.client
            .schema("identity")
            .from("user_profiles")
            .select("*")
            .eq("user_id", userId)
            .maybeSingle();

        if (error) {
            throw error;
        }

        if (!data) {
            return null;
        }

        return mapper.fromRow(data);
    }

    async findByIds(
        userIds: readonly string[],
    ): Promise<Profile[]> {
        const { data, error } = await this.client
            .schema("identity")
            .from("user_profiles")
            .select("*")
            .in("user_id", userIds);

        if (error) {
            throw error;
        }

        return data.map(mapper.fromRow);
    }

    async findByClass(
        classes: readonly string[]
    ): Promise<readonly Profile[]> {
        const { data, error } = await this.client
            .schema("identity")
            .from("user_profiles")
            .select("*")
            .in("class", classes);

        if (error) {
            throw error;
        }

        return mapper.fromRows(data);
    }


    // Query

    async list(): Promise<readonly Profile[]> {
        const { data, error } = await this.client
            .schema("identity")
            .from("user_profiles")
            .select("*");

        if (error) {
            throw error;
        }

        return mapper.fromRows(data);
    }

    async search(
        options: ProfileListOptions
    ): Promise<ProfileList> {
        const query = this.createListQuery(options);

        const { data, error, count } = await query;

        if (error) {
            throw error;
        }

        return {
            items: mapper.fromRows(data),
            total: count ?? 0,
            page: options.page,
            pageSize: options.pageSize,
        };
    }

    // Existing Single

    async exists(
        userId: string,
    ): Promise<boolean> {
        const { data, error } = await this.client
            .schema("identity")
            .from("user_profiles")
            .select("user_id", { count: "exact" })
            .eq("user_id", userId)
            .maybeSingle();

        if (error) {
            throw error;
        }


        return !!data;

    }


    // Existing Batch

    async listExistingUserIds(
        userIds: readonly string[],
    ): Promise<string[]> {
        const { data, error } = await this.client
            .schema("identity")
            .from("user_profiles")
            .select("user_id")
            .in("user_id", userIds);

        if (error) {
            throw error;
        }

        return data.map((item) => item.user_id);
    }

    // Write Single

    async create(
        profile: Profile
    ): Promise<void> {

        const row = mapper.toCreateRow(profile);

        const { error } = await this.client
            .schema("identity")
            .from("user_profiles")
            .insert(row);

        if (error) {
            throw error;
        }

    }

    async update(
        profile: Profile
    ): Promise<void> {

        const row = mapper.toUpdateRow(profile);


        const { error } = await this.client
            .schema("identity")
            .from("user_profiles")
            .update(row)
            .eq("user_id", profile.id);

        if (error) {
            throw error;
        }

    }

    async delete(
        userId: string
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("user_profiles")
            .delete()
            .eq("user_id", userId);

        if (error) {
            throw error;
        }

    }

    // Write Batch
    

    async createMany(
        profiles: readonly Profile[],
    ): Promise<void> {

        const rows = mapper.toCreateRows(profiles);

        const { error } = await this.client
            .schema("identity")
            .from("user_profiles")
            .insert(rows);

        if (error) {
            throw error;
        }
    }

    async updateMany(
        profiles: readonly Profile[],
    ): Promise<void> {

        const rows = mapper.toUpdateRows(profiles);

        const { error } = await this.client
            .schema("identity")
            .rpc("update_profiles", {
                profile: rows
            });

        if (error) {
            throw error;
        }

    }

    async deleteMany(
        userIds: readonly string[],
    ): Promise<void> {
        const { error } = await this.client
            .schema("identity")
            .from("user_profiles")
            .delete()
            .in("id", userIds);

        if (error) {
            throw error;
        }

    }
    

}