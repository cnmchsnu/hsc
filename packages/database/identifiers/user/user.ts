export interface UserIdentifier {

        // Resolve Single
        
        resolveIdByEmail(
            email: string,
        ): Promise<string | null>;

        // Resolve Batch
    
        resolveIdsByEmails(
            emails: readonly string[],
        ): Promise<readonly string[] | null>;

}