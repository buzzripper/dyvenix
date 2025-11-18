import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-callback',
    template: `
        <div class="flex h-screen items-center justify-center">
            <div class="text-center">
                <mat-spinner [diameter]="48"></mat-spinner>
                <p class="mt-4 text-lg">Completing sign in...</p>
                <p class="mt-2 text-sm text-gray-500">Redirecting to dashboard...</p>
            </div>
        </div>
    `,
    standalone: true,
    imports: [MatProgressSpinnerModule],
})
export class AuthCallbackComponent implements OnInit {
    constructor(
        private _authService: AuthService,
        private _route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        console.log('🔄 Callback component: Redirecting to dashboard...');
        
        // Get return URL
        const queryReturnUrl = this._route.snapshot.queryParamMap.get('returnUrl');
        const returnUrl = queryReturnUrl || this._authService.getReturnUrl();
        
        console.log('🎯 Target URL:', returnUrl);
        
        // Simple redirect - no auth check
        // The cookie is set, the browser just needs to navigate
        window.location.href = returnUrl;
    }
}
