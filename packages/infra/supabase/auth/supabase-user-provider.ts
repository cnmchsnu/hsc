import { createServerClient } from "../client/server";

import { User } from "../../../auth/domain/identity";
import { UserProvider } from "./user-provider";

import { toUser } from "./mapper";

export class SupabaseUserProvider
    implements UserProvider {

    async get(): Promise<User | null> {

        const supabase = await createServerClient();

        const { data, error } = await supabase.auth.getUser();

        if (error) {
            throw new Error(`Error fetching user: ${error.message}`);
        }
        
        if (!data) {
            return null;
        }

        return toUser(data.user);
    }
}