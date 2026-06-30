export interface CurrentUser {

    id: string;

    email: string;

    displayName: string;

    avatarUrl: string | null;

    classification: string;

    roles: ReadonlySet<string>;

    permissions: ReadonlySet<string>;
    
}

