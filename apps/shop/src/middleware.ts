import { type NextRequest } from "next/server";

import { updateSession } from "@repo/database/middleware";

export async function middleware(
    request: NextRequest,
) {
    console.log("====== MIDDLEWARE ENV TEST ======");
    console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    return updateSession(request);
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};