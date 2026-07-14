'use client';

import { useRouter } from "next/navigation";

import { useOneTap } from "@repo/infra/google";

import { signInWithGoogleOneTap } from "@repo/auth/server/browser";


export function GoogleOneTap() {

    const router = useRouter();

    useOneTap({

        clientId:
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,

        async onCredential(token) {

            await signInWithGoogleOneTap(

                "google",

                token,

            );

            router.refresh();

        },

    });

    return null;

}