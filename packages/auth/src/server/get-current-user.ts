import { createAuthContainer } from "../container";

export async function getCurrentUser() {
    const { client, currentUserService } =
        await createAuthContainer();

    const {
        data,
        error,
    } = await client.auth.getUser();

    if (error) {
        throw error;
    }

    if (!data.user) {
        return null;
    }

    return currentUserService.get(data.user);
}