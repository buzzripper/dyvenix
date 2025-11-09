import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeConfig: AuthConfig = {
    issuer: 'https://login.microsoftonline.com/1c3cdcca-ba60-4ad2-9892-626f5d92bc09/v2.0', // TODO: Replace with your Azure AD tenant
    redirectUri: window.location.origin + '/auth/callback', // Must match Azure AD app registration
    clientId: 'dc02d6fb-755a-41b3-9bb7-ffa3acb35271', // TODO: Replace with your client ID
    responseType: 'code',
    scope: 'openid profile email api://dc02d6fb-755a-41b3-9bb7-ffa3acb35271/Orders.Modify api://dc02d6fb-755a-41b3-9bb7-ffa3acb35271/Files.Read', // TODO: Replace with your API scope(s)
    showDebugInformation: true,
    usePkce: true,
    requireHttps: true,
};
