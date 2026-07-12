

import { createBrowserClient } from "../client/browser";

export interface AuthenticationProvider {

    signInWithGoogle(redirectTo?: string): Promise<void>;

    signOut(): Promise<void>;

    refreshSession(): Promise<void>;

    revokeSession(): Promise<void>;

}



export class SupabaseAuthenticationProvider
    implements AuthenticationProvider {


    async signInWithGoogle(
        redirectTo?: string
    ): Promise<void> {

        const origin = typeof window !== 'undefined' ? window.location.origin : ''

        const supabase =
            await createBrowserClient();

        const { data, error } =
            await supabase.auth.signInWithOAuth({

                provider: "google",

                options: {

                    redirectTo:
                        `${origin}/auth/callback`,

                },

            });


        if (error) {

            throw error;

        }

    }

    async signOut(): Promise<void> {

        const supabase =
            await createBrowserClient();

        const { error } =
            await supabase.auth.signOut();

        if (error) {

            throw error;

        }

    }

    async refreshSession(): Promise<void> {

        const supabase =
            await createBrowserClient();

        const { error } =
            await supabase.auth.refreshSession();

        if (error) {

            throw error;

        }

    }

    async revokeSession(): Promise<void> {

        const supabase =
            await createBrowserClient();

        const { error } =
            await supabase.auth.signOut({

                scope: "global",

            });

        if (error) {

            throw error;

        }

    }

}