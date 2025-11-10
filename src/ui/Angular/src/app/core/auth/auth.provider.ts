import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    EnvironmentProviders,
    Provider,
    provideEnvironmentInitializer,
    inject,
} from '@angular/core';
import { authInterceptor } from 'app/core/auth/auth.interceptor';

// IMPORTANT: do NOT import or initialize any legacy AuthService here.
// import { AuthService } from 'app/core/auth/auth.service';

import { AuthCodeService } from 'app/core/auth/authcode.service';

export const provideAuth = (): Array<Provider | EnvironmentProviders> => {
    return [
        // Interceptor is already also registered in main.ts; keep one or the other.
        // If you keep it here, remove it from main.ts. Otherwise, leave this line out.
        // provideHttpClient(withInterceptors([authInterceptor])),

        // ✅ Initialize ONLY our PKCE service at startup (single place)
        provideEnvironmentInitializer(() => inject(AuthCodeService)),
    ];
};
