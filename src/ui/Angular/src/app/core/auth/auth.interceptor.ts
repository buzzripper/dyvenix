import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandlerFn,
    HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const authInterceptor = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    // Clone the request object
    let newReq = req.clone();

    // For BFF pattern with proxy, ensure credentials are included for /auth requests
    if (req.url.startsWith('/auth')) {
        newReq = req.clone({
            withCredentials: true,
        });
    }

    // Response
    return next(newReq).pipe(
        catchError((error) => {
            // Catch "401 Unauthorized" responses
            if (error instanceof HttpErrorResponse && error.status === 401) {
                // Redirect DIRECTLY to BFF login (not through proxy) to avoid cookie issues
                const returnUrl = window.location.pathname + window.location.search;
                sessionStorage.setItem('auth_return_url', returnUrl);
                window.location.href = `https://localhost:63952/auth/login`;
            }

            return throwError(() => error);
        })
    );
};
