import Link from "next/link";


import { getCurrentUser } from "@repo/auth/server";

export async function UserAvatar() {
  const currentUser = await getCurrentUser();

  return (
    <Link
              href="/profile"
              className="h-10 w-10 md:h-10 md:w-10 rounded-full overflow-hidden cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              { !currentUser?.userContext?.profile?.avatarUrl ? (
                <span className="material-symbols-outlined text-primary text-[30px]">
                account_circle
                </span>
              ) : (
                <img src={currentUser.userContext.profile?.avatarUrl!} width={48} height={48} />
              )
              }
            </Link>

    );
}