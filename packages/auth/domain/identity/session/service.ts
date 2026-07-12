import { SessionProvider } from "@repo/infra/supabase/auth";
import type { Session } from "./type";

export interface SessionService  {

    getSession(): Promise<Session | null>

    exchangeCodeForSession(code: string): Promise<void>

    refresh(): Promise<Session | null>

    invalidate(): Promise<void>

}


interface SessionServiceDependencies {

    sessionProvider: SessionProvider;
}

class DefaultSessionService 
implements SessionService {

    constructor(
        private readonly sessionProvider: SessionProvider,
    ) {}


    async getSession(): Promise<Session | null> {
        return await this.sessionProvider.getSession();
    }

    async exchangeCodeForSession(code: string): Promise<void> {
        return await this.sessionProvider.exchangeCodeForSession(code);
    }

    async refresh(): Promise<Session | null> {  
        return await this.sessionProvider.refreshSession();
    }

    async invalidate(): Promise<void> {
        return await this.sessionProvider.invalidateSession();
    }
}

export function createSessionService(
    dependencies: SessionServiceDependencies
): SessionService {
    return new DefaultSessionService(
        dependencies.sessionProvider,
    );
}