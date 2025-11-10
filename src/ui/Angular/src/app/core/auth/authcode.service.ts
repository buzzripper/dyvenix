import { Injectable } from '@angular/core';
import { OAuthService, OAuthEvent, OAuthErrorEvent } from 'angular-oauth2-oidc';
import { authCodeConfig } from './authcode.config';

@Injectable({ providedIn: 'root' })
export class AuthCodeService {
    private started = false;

    constructor(private oauth: OAuthService) {
        // Helpful diagnostics to spot a second trigger or token errors
        this.oauth.events.subscribe((e: OAuthEvent) => {
            // Comment out console logs after you stabilize
            console.log('[oauth-event]', e.type, e);
            if (e instanceof OAuthErrorEvent) {
                console.error('[oauth-error]', e);
            }
        });

        this.start().catch(err => console.error('Auth bootstrap failed', err));
    }

    private async start(): Promise<void> {
        if (this.started) return;
        this.started = true;

        this.oauth.configure(authCodeConfig);

        // 1) Fetch discovery
        await this.oauth.loadDiscoveryDocument();

        // 2) Detect callback strictly by path + presence of code
        const url = new URL(window.location.href);
        const isCallback =
            url.pathname.endsWith('/auth/callback') &&
            (url.searchParams.has('code') || url.hash.includes('code='));

        // 3) Complete code exchange once (if callback)
        if (isCallback) {
            console.log('[auth] callback detected, exchanging code...');
            await this.oauth.tryLoginCodeFlow();
            console.log('[auth] exchange done. hasAccessToken=', this.oauth.hasValidAccessToken(),
                'hasIdToken=', this.oauth.hasValidIdToken());
        }

        // 4) If tokens exist, stop here (no redirect)
        if (this.oauth.hasValidAccessToken() || this.oauth.hasValidIdToken()) {
            console.log('[auth] tokens present; no login redirect.');
            return;
        }

        // 5) Kick off login ONLY when NOT on the callback route
        if (!isCallback) {
            console.log('[auth] no tokens; starting login once...');
            // Do not await; this navigates to /authorize
            this.oauth.initCodeFlow();
        } else {
            console.warn('[auth] on callback without tokens; NOT starting login here to avoid loops.');
            // If you ever land here, something else is likely triggering login (guard/legacy service)
        }
    }
}
