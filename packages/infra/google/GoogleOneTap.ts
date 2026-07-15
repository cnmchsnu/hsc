// import 'google.accounts'

export interface GoogleOneTapOptions {
    clientId: string
    onCredential: (token: string) => Promise<void>
}


// declare global {
//   interface Window {
//     // 讓 TypeScript 知道 window.google 的存在與結構
//     google?: typeof google
//   }
// }



export class GoogleOneTap {

    private initialized = false;

    async start(
        options: GoogleOneTapOptions
    ): Promise<void> {

        await this.loadScript();

        if (!window.google) {
            throw new Error("Google Identity Services not loaded.");
        }

        if (!this.initialized) {


            window.google.accounts.id.initialize({


                client_id: options.clientId,


                use_fedcm_for_prompt: false,
                use_fedcm_for_button: false,


                context: "signin",


                itp_support: true,


                callback: async (response) => {

                    await options.onCredential(response.credential);

                },
            });

            this.initialized = true;

        }

        window.google.accounts.id.prompt();

    };

    cancel(): void {


        window.google?.accounts?.id?.cancel?.();
        
        
    };

    private async loadScript(): Promise<void> {

        if (window.google) return;

        await new Promise<void>((resolve, reject) => {

            const existing = document.querySelector(
                'script[src="https://accounts.google.com/gsi/client"]'
            ) as HTMLScriptElement | null;

            if (existing) {

                existing.addEventListener("load", () => resolve());

                return;

            }

            const script = document.createElement("script");

            script.src = "https://accounts.google.com/gsi/client";

            script.async = true;

            script.defer = true;

            script.onload = () => resolve();

            script.onerror = reject;

            document.head.appendChild(script);

        });

    }

}