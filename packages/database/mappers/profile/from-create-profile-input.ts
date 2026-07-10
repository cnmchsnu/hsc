import type {
    CreateProfileInput,
} from "../../../auth/application/profile";


export function fromCreateProfileInput(
    input: CreateProfileInput,
) {
    return {
        user_id: input.userId,

        display_name: input.displayName,

        avatar_url: input.avatarUrl,

        student_id: input.studentId,

        auto_classification:
            input.autoClassification,
    };
}