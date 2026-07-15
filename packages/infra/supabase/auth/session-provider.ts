import type { Session } from "../../../auth/domain/identity";

export interface SessionProvider {

    getSession(): Promise<Session | null>;

    exchangeCodeForSession(code: string): Promise<void>;

    refreshSession(): Promise<Session | null>;

    invalidateSession(): Promise<void>;

}