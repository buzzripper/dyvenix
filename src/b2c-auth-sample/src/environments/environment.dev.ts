export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: 'f23aee71-9ccb-49ef-9d7d-f3c4f12c7177',
      responseType: 'code'
    }
  },
  apiConfig: {
    scopes: ['https://pdtenant1.onmicrosoft.com/helloapi/demo.read'],
    uri: 'https://pdtenant1hello.azurewebsites.net/hello'
  },
  b2cPolicies: {
    names: {
      signUpSignIn: "B2C_1_si",
      resetPassword: "B2C_1_PWD_RESET",
      editProfile: "b2c_1_edit_profile"
    },
    authorities: {
      signUpSignIn: {
        authority: 'https://pdtenant1.b2clogin.com/pdtenant1.onmicrosoft.com/B2C_1_si'
      },
      resetPassword: {
        authority: 'https://pdtenant1.b2clogin.com/pdtenant1.onmicrosoft.com/B2C_1_PWD_RESET'
      },
      editProfile: {
        authority: "https://pdtenant1.b2clogin.com/pdtenant1.onmicrosoft.com/b2c_1_edit_profile"
      }
    },
    authorityDomain: "pdtenant1.b2clogin.com"
  }
};
