import { createServerClient } from "../client/server";

import { User } from "../../../auth/domain/identity";
import { UserProvider } from "./user-provider";

import { toUser } from "./mapper";

export class SupabaseUserProvider
    implements UserProvider {

    async getById(
        id: string
    ): Promise<User | null> {

        const supabase = await createServerClient();
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            throw new Error(`Error fetching user by ID ${id}: ${error.message}`);
        }
        
        if (!data) {
            return null;
        }

        return toUser(data.session?.user!);
    }
}