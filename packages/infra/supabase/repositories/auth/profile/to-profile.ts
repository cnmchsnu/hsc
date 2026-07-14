import { UserProfileRow } from "@repo/database/entities";

import { Profile } from "../../../../../auth/domain/profile";

import { CreateProfile, UpdateProfile } from "../../../../../auth/application/profile";

import { RepositoryMapper } from "../../shared/repository-mapper";

export const ProfileRepositoryMapper: RepositoryMapper<
    Profile,
    UserProfileRow,
    CreateProfile,
    UpdateProfile
> = {

    fromRow(
        row: UserProfileRow,
    ): Profile {

        return {

            id: row.user_id,

            displayName: row.display_name!,

            studentId: row.student_id,

            class: row.class,

            number: row.number,

            avatarUrl: row.avatar_url,

            autoClassification: row.auto_classification,

            manualOverride: row.manual_override,

            finalClassification: row.final_classification,

            status: row.status,

            version: row.version,

        };
    },

    fromRows(
        rows: readonly UserProfileRow[],
    ): readonly Profile[] {

        return rows.map(this.fromRow);
    },

    toCreateRow(
        dto: CreateProfile,
    ): Partial<UserProfileRow> {

        return {

            user_id: dto.id,

            display_name: dto.displayName,

            student_id: dto.studentId ?? null,

            class: dto.class ?? null,

            number: dto.number ?? null,

            avatar_url: dto.avatarUrl ?? null,

            auto_classification: dto.autoClassification,

            manual_override: dto.manualOverride ?? null,

            status: dto.status,

        };
    },

    toCreateRows(
        dto: readonly CreateProfile[],
    ) {

        return dto.map(this.toCreateRow);
    },

    toUpdateRow(
        dto: UpdateProfile,
    ): Partial<UserProfileRow> {

        return {

            user_id: dto.id,

            display_name: dto.displayName,

            student_id: dto.studentId,

            class: dto.class,

            number: dto.number,

            avatar_url: dto.avatarUrl,

            manual_override: dto.manualOverride,

            status: dto.status,

        };
    },

    toUpdateRows(
        dto: readonly UpdateProfile[],
    ) {

        return dto.map(this.toUpdateRow);
    },
}