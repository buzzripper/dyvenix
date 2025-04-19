export const environment = {
  production: false,
  azureB2C: {
    clientId: '<your-client-id>',
    authority: 'https://<your-tenant-name>.b2clogin.com/<your-tenant-name>.onmicrosoft.com/B2C_1_signupsignin',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
    scope: 'openid profile offline_access',
    responseType: 'code'
  }
};