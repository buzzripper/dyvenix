import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandlerFn,
    HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

/**
 * Attaches the OAuth2 access token (if present) and handles 401.
 */
export const authInterceptor = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const oauth = inject(OAuthService);

    const token = oauth.getAccessToken();
    const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

    return next(authReq).pipe(
        catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                try { oauth.logOut(); } catch { }
                location.reload();
            }
            return throwError(() => error);
        })
    );
};
