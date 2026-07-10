import { Profile, ProfileList, ProfileListOptions} from "../../../auth/domain/profile";

export interface ProfileRepository {

    // Read Single

    findById(
        userId: string
    ): Promise<Profile | null>;

    // Read Batch

    findByIds(
        userIds: readonly string[],
    ): Promise<Profile[]>;

    findByClass(
        classes: readonly string[]
    ): Promise<Profile[]>;

    // Query

    list(): Promise<Profile[]>;

    search(
        options: ProfileListOptions
    ): Promise<ProfileList>;

    // Existing Single

    exists(
        userId: string,
    ): Promise<boolean>;

    // Existing Batch

    listExistingUserIds(
        userIds: readonly string[],
    ): Promise<string[]>;

    // Write Single

    create(
        profile: Profile
    ): Promise<void>;

    update(
        profile: Profile
    ): Promise<void>;

    delete(
        userId: string
    ): Promise<void>;

    // Write Batch

    createMany(
        profiles: readonly Profile[],
    ): Promise<void>;

    updateMany(
        profiles: readonly Profile[],
    ): Promise<void>;

    deleteMany(
        userIds: readonly string[],
    ): Promise<void>;
}
