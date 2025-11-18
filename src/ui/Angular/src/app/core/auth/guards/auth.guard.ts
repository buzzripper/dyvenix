import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);

    console.log('🔒 Auth guard: Checking authentication for:', state.url);

    // Check the authentication status
    return authService.check().pipe(
        switchMap((authenticated) => {
            console.log('🔒 Auth guard: Authentication status:', authenticated);
            
            // If the user is not authenticated...
            if (!authenticated) {
                console.log('🚫 Auth guard: Not authenticated, redirecting to BFF login');
                
                // Get the return URL
                const returnUrl = state.url === '/sign-out' ? '/' : state.url;
                
                // Redirect DIRECTLY to BFF with returnUrl as query parameter
                window.location.href = `https://localhost:63952/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`;
                
                // Return false to prevent navigation (we're redirecting externally)
                return of(false);
            }

            console.log('✅ Auth guard: Authenticated, allowing access');
            // Allow the access
            return of(true);
        })
    );
};
