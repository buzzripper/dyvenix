import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

// angular-oauth2-oidc
import { provideOAuthClient, OAuthStorage } from 'angular-oauth2-oidc';

// your auth pieces
import { provideAuth } from './app/core/auth/auth.provider';
import { authInterceptor } from './app/core/auth/auth.interceptor';

import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRoutes),
        provideAnimations(),

        // OAuth services MUST be registered before anything that injects OAuthService
        provideOAuthClient(),
        { provide: OAuthStorage, useValue: sessionStorage },

        // HTTP with bearer injection
        provideHttpClient(withInterceptors([authInterceptor])),

        // Auth providers (this will initialize AuthCodeService — see auth.provider.ts)
        ...provideAuth(),
    ],
}).catch(err => console.error(err));
