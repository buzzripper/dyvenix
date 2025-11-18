import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);
    private _router = inject(Router);
    private readonly BFF_URL = environment.bffUrl; // Empty string - uses proxy
    private readonly RETURN_URL_KEY = 'auth_return_url';

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for authenticated status
     */
    get authenticated(): boolean {
        return this._authenticated;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in - Redirects to BFF login endpoint
     *
     * @param returnUrl - Optional return URL after successful login (Angular route)
     */
    signIn(returnUrl: string = '/'): void {
        // Store the Angular return URL in session storage
        sessionStorage.setItem(this.RETURN_URL_KEY, returnUrl);

        // Redirect DIRECTLY to BFF login endpoint (not through proxy)
        const loginUrl = `https://localhost:63952/auth/login`;
        window.location.href = loginUrl;
    }

    /**
     * Get the stored return URL after authentication
     */
    getReturnUrl(): string {
        const returnUrl = sessionStorage.getItem(this.RETURN_URL_KEY) || '/dashboards/project';
        // Clear it after retrieving
        sessionStorage.removeItem(this.RETURN_URL_KEY);
        return returnUrl;
    }

    /**
     * Sign out - Redirects to BFF logout endpoint
     */
    signOut(): Observable<any> {
        // Clear local state
        this._authenticated = false;
        this._userService.user = null;

        // Clear any stored return URL
        sessionStorage.removeItem(this.RETURN_URL_KEY);

        // Redirect DIRECTLY to BFF logout endpoint (not through proxy)
        window.location.href = `https://localhost:63952/auth/logout`;

        return of(true);
    }

    /**
     * Check the authentication status by calling BFF user endpoint
     */
    check(): Observable<boolean> {
        // If we already checked and are authenticated, return true
        if (this._authenticated) {
            console.log('✅ Auth check: Already authenticated (cached)');
            return of(true);
        }

        console.log('🔍 Auth check: Calling BFF /auth/user endpoint (through proxy)...');

        // Call BFF user endpoint to check session (through proxy)
        return this._httpClient
            .get<any>(`/auth/user`, { 
                withCredentials: true 
            })
            .pipe(
                tap((response) => {
                    console.log('✅ Auth check: Received user data:', response);
                    
                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = this.mapUserFromClaims(response);
                    
                    console.log('✅ Auth check: Authentication successful, user:', this._userService.user);
                }),
                map(() => true),
                catchError((error) => {
                    console.error('❌ Auth check: Failed to get user data');
                    console.error('❌ Error status:', error.status);
                    console.error('❌ Error details:', error);
                    
                    // User is not authenticated
                    this._authenticated = false;
                    return of(false);
                })
            );
    }

    /**
     * Forgot password - Not supported in OIDC flow
     * Users should use Azure Entra ID password reset
     */
    forgotPassword(email: string): Observable<any> {
        console.warn('Forgot password not supported with OIDC authentication. Use Azure Entra ID password reset.');
        return throwError(() => new Error('Forgot password not supported with OIDC authentication.'));
    }

    /**
     * Reset password - Not supported in OIDC flow
     * Users should use Azure Entra ID password reset
     */
    resetPassword(password: string): Observable<any> {
        console.warn('Reset password not supported with OIDC authentication. Use Azure Entra ID password reset.');
        return throwError(() => new Error('Reset password not supported with OIDC authentication.'));
    }

    /**
     * Sign up - Not supported in OIDC flow
     * Users should sign up through Azure Entra ID
     */
    signUp(user: {
        name: string;
        email: string;
        password: string;
        company: string;
    }): Observable<any> {
        console.warn('Sign up not supported with OIDC authentication. Users must be invited through Azure Entra ID.');
        return throwError(() => new Error('Sign up not supported with OIDC authentication.'));
    }

    /**
     * Unlock session - Not supported in OIDC flow
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        console.warn('Unlock session not supported with OIDC authentication. Please sign in again.');
        return throwError(() => new Error('Unlock session not supported with OIDC authentication.'));
    }

    /**
     * Map user claims from BFF to user object
     * 
     * @param claims - Claims from BFF
     */
    private mapUserFromClaims(claims: any): any {
        return {
            id: claims.sub || claims.oid || '',
            name: claims.name || '',
            email: claims.email || claims.preferred_username || '',
            avatar: claims.picture || 'assets/images/avatars/brian-hughes.jpg',
            status: 'online',
        };
    }

    /**
     * Get current user info from BFF
     */
    getUserInfo(): Observable<any> {
        return this._httpClient
            .get<any>(`/auth/user`, { 
                withCredentials: true 
            })
            .pipe(
                tap((response) => {
                    this._userService.user = this.mapUserFromClaims(response);
                }),
                catchError(() => of(null))
            );
    }
}
