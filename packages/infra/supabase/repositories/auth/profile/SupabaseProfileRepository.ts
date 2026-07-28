import type { SupabaseClient } from "@supabase/supabase-js";

import type {
    Profile,
    CreateProfile,
    UpdateProfile,
    ProfileList,
    ProfileListOptions,
    ProfileRepository,
    ProfileSort
} from "../../../../../auth/domain/profile";

import { ProfileRepositoryMapper as mapper } from "./to-profile";
import { SupabaseRepositoryBase } from "../../base/SupabaseRepositoryBase";


export class SupabaseProfileRepository
    extends SupabaseRepositoryBase<
    Profile,
    string,
    CreateProfile,
    UpdateProfile,
    ProfileListOptions,
    ProfileList,
    any
    >
    implements ProfileRepository {

    constructor(
        protected readonly client: SupabaseClient,
    ) {
        super(client);
    }

    protected readonly schema = "identity";

    protected readonly table = "user_profiles";

    protected readonly createRpc = "create_user_profiles";

    protected readonly updateRpc = "update_user_profiles";

    protected readonly mapper = mapper;

    private sortMap = {

        "newest": {
            column: "effective_from",
                ascending: false,
        },

        "oldest": {
            column: "effective_from",
            ascending: true,
        },

        "name-asc": {
            column: "display_name",
            ascending: true,
        },

        "name-desc": {
            column: "display_name",
            ascending: false,
        },

        "class-asc": {
            column: "class",
            ascending: true,
        },

        "class-desc": {
            column: "class",
            ascending: false,
        },

        "studentId-asc": {
            column: "student_id",
            ascending: true,
        },

        "studentId-desc": {
            column: "student_id",
            ascending: false,
        },

    } satisfies Record<
        ProfileSort,
        {
            column: string;
            ascending: boolean;
        }
    >;

    protected override buildQuery(
        options: ProfileListOptions,
    ) {
        let query = 
            super.buildQuery(options);

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
            const sort = this.sortMap[options.sort];
            if (sort) {
                query = query.order(sort.column, { ascending: sort.ascending });
            }
        }

        return query;


    }

    async findByUid(
        uid: string
    ): Promise<Profile | null> {
        const { data, error } = await this.client
            .schema("identity")
            .from("user_profiles")
            .select("*")
            .eq("user_id", uid)
            .single();

        if (error) {
            throw error;
        }

        if (!data) {
            return null;
        }

        return mapper.fromRow(data);
    }

    async findByUids(
        uids: readonly string[]
    ): Promise<readonly Profile[]> {
        const { data, error } = await this.client
            .schema("identity")
            .from("user_profiles")
            .select("*")
            .in("user_id", uids);

        if (error) {
            throw error;
        }

        return mapper.fromRows(data);

    }


    async findByClass(
        classes: readonly string[]
    ): Promise<readonly Profile[]> {
        const { data, error } = await this.client
            .schema("identity")
            .from("user_profiles")
            .select("*")
            .eq("final_classification", "INTERNAL.STUDENT")
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
    

}