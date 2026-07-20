import { type NextRequest } from "next/server";

import { updateSession } from "@repo/infra/supabase/client/proxy";

export async function proxy(
    request: NextRequest,
) {
    return updateSession(request);
}

export const config = {
    matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt)$).*)",
    ],
};