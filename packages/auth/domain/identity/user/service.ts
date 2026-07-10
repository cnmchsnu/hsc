import { User } from "./type";

import { UserRepository } from "@repo/database/repositories";

export interface UserService {

    // Read Single

    getUserByEmail(
        email: string,
    ): Promise<User | null>;

    getUserById(
        id: string,
    ): Promise<User | null>;

    // Read Batch

    getUsersByEmails(
        emails: readonly string[],
    ): Promise<User[]>;

    getUsersByIds(
        ids: readonly string[],
    ): Promise<User[]>;

    listUsers(): Promise<User[]>;

}

export function createUserService(
    repository: UserRepository
): UserService {
    return {
        // Read Single

        async getUserByEmail(   
            email: string,
        ): Promise<User | null> {
            throw new Error("Not implemented");
        },

        async getUserById(
            id: string,
        ): Promise<User | null> {
            throw new Error("Not implemented");
        },

        // Read Batch

        async getUsersByEmails(
            emails: readonly string[],
        ): Promise<User[]> {
            throw new Error("Not implemented");
        },

        async getUsersByIds(
            ids: readonly string[],
        ): Promise<User[]> {
            throw new Error("Not implemented");
        },

        async listUsers(): Promise<User[]> {
            throw new Error("Not implemented");
        }

    };
}