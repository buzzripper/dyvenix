import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

export function MSALInstanceFactory() {
  return new PublicClientApplication({
    auth: {
      clientId: environment.azureB2C.clientId,
      authority: environment.azureB2C.authority,
      redirectUri: environment.azureB2C.redirectUri,
      postLogoutRedirectUri: environment.azureB2C.postLogoutRedirectUri
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false
    }
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MsalModule.forRoot(MSALInstanceFactory, {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: environment.azureB2C.scope.split(' ')
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }