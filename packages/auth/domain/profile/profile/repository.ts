import { Profile, ProfileList, ProfileListOptions} from "./type";

import type { Repository } from "@repo/shared";
import { UpdateProfile } from "./update";
import { CreateProfile } from "./create";

export interface ProfileRepository
extends Repository<
    Profile,
    string,
    CreateProfile,
    UpdateProfile,
    ProfileListOptions,
    ProfileList
> {

    findByUid(
        uid: string
    ): Promise<Profile | null>;

    findByUids(
        uids: readonly string[]
    ): Promise<readonly Profile[]>;


    findByClass(
        classes: readonly string[]
    ): Promise<readonly Profile[]>;

    // Query

    list(): Promise<readonly Profile[]>;

}
