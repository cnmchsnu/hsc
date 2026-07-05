import type {
    CreateProfileInput,
    UpdateProfileInput,
    UserProfile,
} from "../../../auth/src/types";
    
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

