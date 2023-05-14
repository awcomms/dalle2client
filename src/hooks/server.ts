import { SvelteKitAuth } from "@auth/sveltekit";
import AzureADB2C from "@auth/core/providers/azure-ad-b2c"
import { AZUREADB2C_ID, AZUREADB2C_SECRET } from "$env/static/private";

export const handle = SvelteKitAuth({
    providers: [AzureADB2C({clientId: AZUREADB2C_ID, clientSecret: AZUREADB2C_SECRET})]
})