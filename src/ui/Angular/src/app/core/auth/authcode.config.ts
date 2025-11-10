import { AuthConfig } from 'angular-oauth2-oidc';

const isHttps =
    typeof window !== 'undefined' && window.location.origin.startsWith('https://');
const isLocalhost =
    typeof window !== 'undefined' && window.location.hostname === 'localhost';

export const authCodeConfig: AuthConfig = {
    issuer:
        'https://dyvenix.ciamlogin.com/1c3cdcca-ba60-4ad2-9892-626f5d92bc09/v2.0',

    // must exactly match SPA redirect URIs registered in Entra
    redirectUri: window.location.origin + '/auth/callback',

    // Angular SPA app registration
    clientId: 'baff14d8-4373-496a-841b-625f5942d89b',

    // Authorization Code (PKCE handled by the lib for this flow)
    responseType: 'code',

    // OIDC + your API scopes
    scope: [
        'openid',
        'profile',
        'email',
        'offline_access',
        'api://dc02d6fb-755a-41b3-9bb7-ffa3acb35271/Orders.Modify',
        'api://dc02d6fb-755a-41b3-9bb7-ffa3acb35271/Files.Read',
    ].join(' '),

    // allow http on localhost only
    requireHttps: isHttps || !isLocalhost ? true : false,

    // easier bring-up; tighten later
    showDebugInformation: true,
    strictDiscoveryDocumentValidation: false,
    skipIssuerCheck: true,

    clearHashAfterLogin: true,
};
