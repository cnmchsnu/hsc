import type { Session } from "../../../auth/domain/identity";

export interface SessionProvider {

    getSession(): Promise<Session | null>;

    refreshSession(): Promise<Session | null>;

    invalidateSession(): Promise<void>;

}