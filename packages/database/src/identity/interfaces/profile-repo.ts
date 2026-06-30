import type {
    CreateProfileInput,
    UpdateProfileInput,
    UserProfile,
} from "@repo/auth/types";
    
export interface ProfileRepository {
    findByUserId(
        userId: string,
    ): Promise<UserProfile | null>;

    create(
        input: CreateProfileInput,
    ): Promise<UserProfile>;

    update(
        userId: string,
        input: UpdateProfileInput,
    ): Promise<UserProfile>;


}

