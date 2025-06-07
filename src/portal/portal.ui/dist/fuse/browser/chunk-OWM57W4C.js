import {
  AuthService
} from "./chunk-MNNV5I3B.js";
import {
  I18nPluralPipe,
  Router,
  RouterLink,
  Subject,
  finalize,
  takeUntil,
  takeWhile,
  tap,
  timer,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-RD3LU5ZG.js";

// src/app/modules/auth/sign-out/sign-out.component.ts
var _c0 = () => ["/sign-in"];
function AuthSignOutComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "i18nPlural");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" Redirecting in ", \u0275\u0275pipeBind2(1, 1, ctx_r0.countdown, ctx_r0.countdownMapping), " ");
  }
}
function AuthSignOutComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " You are now being redirected! ");
  }
}
var AuthSignOutComponent = class _AuthSignOutComponent {
  /**
   * Constructor
   */
  constructor(_authService, _router) {
    this._authService = _authService;
    this._router = _router;
    this.countdown = 5;
    this.countdownMapping = {
      "=1": "# second",
      other: "# seconds"
    };
    this._unsubscribeAll = new Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    this._authService.signOut();
    timer(1e3, 1e3).pipe(finalize(() => {
      this._router.navigate(["sign-in"]);
    }), takeWhile(() => this.countdown > 0), takeUntil(this._unsubscribeAll), tap(() => this.countdown--)).subscribe();
  }
  /**
   * On destroy
   */
  ngOnDestroy() {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  static {
    this.\u0275fac = function AuthSignOutComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthSignOutComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthSignOutComponent, selectors: [["auth-sign-out"]], decls: 15, vars: 4, consts: [[1, "flex", "min-w-0", "flex-auto", "flex-col", "items-center", "sm:justify-center"], [1, "w-full", "px-4", "py-8", "sm:bg-card", "sm:w-auto", "sm:rounded-2xl", "sm:p-12", "sm:shadow"], [1, "mx-auto", "w-full", "max-w-80", "sm:mx-0", "sm:w-80"], [1, "mx-auto", "w-12"], ["src", "images/logo/logo.svg"], [1, "mt-8", "text-center", "text-4xl", "font-extrabold", "leading-tight", "tracking-tight"], [1, "mt-0.5", "flex", "justify-center", "font-medium"], [1, "text-secondary", "mt-8", "text-center", "text-md", "font-medium"], [1, "ml-1", "text-primary-500", "hover:underline", 3, "routerLink"]], template: function AuthSignOutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275element(4, "img", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 5);
        \u0275\u0275text(6, " You have signed out! ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 6);
        \u0275\u0275template(8, AuthSignOutComponent_Conditional_8_Template, 2, 4)(9, AuthSignOutComponent_Conditional_9_Template, 1, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "div", 7)(11, "span");
        \u0275\u0275text(12, "Go to");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "a", 8);
        \u0275\u0275text(14, "sign in ");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275conditional(ctx.countdown > 0 ? 8 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.countdown === 0 ? 9 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(3, _c0));
      }
    }, dependencies: [RouterLink, I18nPluralPipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthSignOutComponent, { className: "AuthSignOutComponent", filePath: "src/app/modules/auth/sign-out/sign-out.component.ts", lineNumber: 13 });
})();

// src/app/modules/auth/sign-out/sign-out.routes.ts
var sign_out_routes_default = [
  {
    path: "",
    component: AuthSignOutComponent
  }
];
export {
  sign_out_routes_default as default
};
//# sourceMappingURL=chunk-OWM57W4C.js.map
