import Link from "next/link";

import { CurrentUserProfile } from "../../../../../../packages/auth/application";

import { CircleUserRound } from 'lucide-react';

export async function UserAvatar({currentUserProfile}: {currentUserProfile: CurrentUserProfile | null}) {

  return (
    <Link
              href="/profile"
              className="h-10 w-10 md:h-10 md:w-10 rounded-full overflow-hidden cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              { !currentUserProfile?.avatarUrl ? (
                <CircleUserRound className="text-primary text-[24px]" />
              ) : (
                <img src={currentUserProfile.avatarUrl!} width={48} height={48} />
              )
              }
            </Link>

    );
}