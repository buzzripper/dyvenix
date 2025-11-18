import { LogLevel, PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
    config: {
        authority: 'https://localhost:63952',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'angular-spa', // This isn't used in BFF pattern but required by the library
        scope: 'openid profile email',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: false,
        renewTimeBeforeTokenExpiresInSeconds: 30,
        logLevel: LogLevel.Debug,
        historyCleanupOff: true,
        // Custom configuration for BFF pattern
        customParamsAuthRequest: {},
        customParamsRefreshTokenRequest: {},
        customParamsEndSessionRequest: {},
        // Disable token validation since tokens are kept on the server
        disableIdTokenValidation: true,
        // Use cookie-based authentication
        secureRoutes: ['https://localhost:63952'],
    },
};
