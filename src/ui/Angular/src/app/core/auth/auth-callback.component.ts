import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

/**
 * Passive callback view: completes code exchange only.
 * Do NOT start a new login here; the service decides when to do that.
 */
@Component({
    selector: 'app-auth-callback',
    template: `
    <div class="auth-callback">
      <p>Completing sign-in...</p>
    </div>
  `,
})
export class AuthCallbackComponent implements OnInit {
    constructor(private oauth: OAuthService, private router: Router) { }

    async ngOnInit(): Promise<void> {
        try {
            await this.oauth.tryLoginCodeFlow();

            if (this.oauth.hasValidAccessToken() && this.oauth.hasValidIdToken()) {
                this.router.navigateByUrl('/');
            }
            // No initCodeFlow() in this component.
        } catch (err) {
            console.error('Auth callback error:', err);
            // Stay on this page; service will handle starting login if needed.
        }
    }
}
