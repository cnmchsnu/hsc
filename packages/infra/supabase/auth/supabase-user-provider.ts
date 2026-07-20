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
            
            if (error.message === "Auth session missing!") {
                return null; // 未登入是正常的，優雅地回傳 null
            }

            throw new Error(`Error fetching user: ${error.message}`);
        }
        
        if (!data) {
            return null;
        }

        return toUser(data.user);
    }
}