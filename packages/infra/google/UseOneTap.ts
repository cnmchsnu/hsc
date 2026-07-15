'use client';

import { useEffect } from "react";

import { GoogleOneTap } from "./GoogleOneTap";

export interface UseOneTapOptions {

    clientId: string;

    onCredential(
        token: string,
    ): Promise<void>;

}

export function useOneTap({

    clientId,

    onCredential,

}: UseOneTapOptions) {

    useEffect(() => {

        const client = new GoogleOneTap();

        client.start({

            clientId,

            onCredential,

        });

        return () => client.cancel();

    }, [clientId, onCredential]);

}