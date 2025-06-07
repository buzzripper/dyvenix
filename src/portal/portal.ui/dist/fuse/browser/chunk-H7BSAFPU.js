import {
  FuseAlertComponent,
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-NCX24LGI.js";
import {
  DefaultValueAccessor,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatSuffix,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  ɵNgNoValidate
} from "./chunk-QBGRN5J4.js";
import {
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule
} from "./chunk-MBEWGW4P.js";
import {
  fuseAnimations
} from "./chunk-MRHFANNG.js";
import {
  AuthService,
  UserService
} from "./chunk-MNNV5I3B.js";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-RD3LU5ZG.js";

// src/app/modules/auth/unlock-session/unlock-session.component.ts
var _c0 = ["unlockSessionNgForm"];
var _c1 = () => ["/sign-out"];
function AuthUnlockSessionComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "fuse-alert", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("appearance", "outline")("showIcon", false)("type", ctx_r1.alert.type)("@shake", ctx_r1.alert.type === "error");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.alert.message, " ");
  }
}
function AuthUnlockSessionComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 15);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:eye");
  }
}
function AuthUnlockSessionComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 15);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:eye-slash");
  }
}
function AuthUnlockSessionComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " Unlock your session ");
    \u0275\u0275elementEnd();
  }
}
function AuthUnlockSessionComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 17);
  }
  if (rf & 2) {
    \u0275\u0275property("diameter", 24)("mode", "indeterminate");
  }
}
var AuthUnlockSessionComponent = class _AuthUnlockSessionComponent {
  /**
   * Constructor
   */
  constructor(_activatedRoute, _authService, _formBuilder, _router, _userService) {
    this._activatedRoute = _activatedRoute;
    this._authService = _authService;
    this._formBuilder = _formBuilder;
    this._router = _router;
    this._userService = _userService;
    this.alert = {
      type: "success",
      message: ""
    };
    this.showAlert = false;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    this._userService.user$.subscribe((user) => {
      this.name = user.name;
      this._email = user.email;
    });
    this.unlockSessionForm = this._formBuilder.group({
      name: [
        {
          value: this.name,
          disabled: true
        }
      ],
      password: ["", Validators.required]
    });
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Unlock
   */
  unlock() {
    if (this.unlockSessionForm.invalid) {
      return;
    }
    this.unlockSessionForm.disable();
    this.showAlert = false;
    this._authService.unlockSession({
      email: this._email ?? "",
      password: this.unlockSessionForm.get("password").value
    }).subscribe(() => {
      const redirectURL = this._activatedRoute.snapshot.queryParamMap.get("redirectURL") || "/signed-in-redirect";
      this._router.navigateByUrl(redirectURL);
    }, (response) => {
      this.unlockSessionForm.enable();
      this.unlockSessionNgForm.resetForm({
        name: {
          value: this.name,
          disabled: true
        }
      });
      this.alert = {
        type: "error",
        message: "Invalid password"
      };
      this.showAlert = true;
    });
  }
  static {
    this.\u0275fac = function AuthUnlockSessionComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthUnlockSessionComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(UntypedFormBuilder), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(UserService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthUnlockSessionComponent, selectors: [["auth-unlock-session"]], viewQuery: function AuthUnlockSessionComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.unlockSessionNgForm = _t.first);
      }
    }, decls: 60, vars: 13, consts: [["unlockSessionNgForm", "ngForm"], ["passwordField", ""], [1, "flex", "min-w-0", "flex-auto", "flex-col", "items-center", "sm:flex-row", "sm:justify-center", "md:items-start", "md:justify-start"], [1, "w-full", "px-4", "py-8", "sm:bg-card", "sm:w-auto", "sm:rounded-2xl", "sm:p-12", "sm:shadow", "md:flex", "md:h-full", "md:w-1/2", "md:items-center", "md:justify-end", "md:rounded-none", "md:p-16", "md:shadow-none"], [1, "mx-auto", "w-full", "max-w-80", "sm:mx-0", "sm:w-80"], [1, "w-12"], ["src", "images/logo/logo.svg"], [1, "mt-8", "text-4xl", "font-extrabold", "leading-tight", "tracking-tight"], [1, "mt-0.5", "font-medium"], [1, "mt-8", 3, "appearance", "showIcon", "type"], [1, "mt-8", 3, "formGroup"], [1, "w-full"], ["id", "name", "matInput", "", 3, "formControlName"], ["id", "password", "matInput", "", "type", "password", 3, "formControlName"], ["mat-icon-button", "", "type", "button", "matSuffix", "", 3, "click"], [1, "icon-size-5", 3, "svgIcon"], ["mat-flat-button", "", 1, "fuse-mat-button-large", "mt-3", "w-full", 3, "click", "color", "disabled"], [3, "diameter", "mode"], [1, "text-secondary", "mt-8", "text-md", "font-medium"], [1, "ml-1", "text-primary-500", "hover:underline", 3, "routerLink"], [1, "relative", "hidden", "h-full", "w-1/2", "flex-auto", "items-center", "justify-center", "overflow-hidden", "bg-gray-800", "p-16", "dark:border-l", "md:flex", "lg:px-28"], ["viewBox", "0 0 960 540", "width", "100%", "height", "100%", "preserveAspectRatio", "xMidYMax slice", "xmlns", "http://www.w3.org/2000/svg", 1, "absolute", "inset-0", "pointer-events-none"], ["fill", "none", "stroke", "currentColor", "stroke-width", "100", 1, "text-gray-700", "opacity-25"], ["r", "234", "cx", "196", "cy", "23"], ["r", "234", "cx", "790", "cy", "491"], ["viewBox", "0 0 220 192", "width", "220", "height", "192", "fill", "none", 1, "absolute", "-top-16", "-right-16", "text-gray-700"], ["id", "837c3e70-6c3a-44e6-8854-cc48c737b659", "x", "0", "y", "0", "width", "20", "height", "20", "patternUnits", "userSpaceOnUse"], ["x", "0", "y", "0", "width", "4", "height", "4", "fill", "currentColor"], ["width", "220", "height", "192", "fill", "url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"], [1, "relative", "z-10", "w-full", "max-w-2xl"], [1, "text-7xl", "font-bold", "leading-none", "text-gray-100"], [1, "mt-6", "text-lg", "leading-6", "tracking-tight", "text-gray-400"], [1, "mt-8", "flex", "items-center"], [1, "flex", "flex-0", "items-center", "-space-x-1.5"], ["src", "images/avatars/female-18.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/female-11.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/male-09.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/male-16.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], [1, "ml-4", "font-medium", "tracking-tight", "text-gray-400"]], template: function AuthUnlockSessionComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "div", 5);
        \u0275\u0275element(4, "img", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 7);
        \u0275\u0275text(6, " Unlock your session ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 8);
        \u0275\u0275text(8, " Your session is locked due to inactivity ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, AuthUnlockSessionComponent_Conditional_9_Template, 2, 5, "fuse-alert", 9);
        \u0275\u0275elementStart(10, "form", 10, 0)(12, "mat-form-field", 11)(13, "mat-label");
        \u0275\u0275text(14, "Full name");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "mat-form-field", 11)(17, "mat-label");
        \u0275\u0275text(18, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 13, 1);
        \u0275\u0275elementStart(21, "button", 14);
        \u0275\u0275listener("click", function AuthUnlockSessionComponent_Template_button_click_21_listener() {
          \u0275\u0275restoreView(_r1);
          const passwordField_r3 = \u0275\u0275reference(20);
          return \u0275\u0275resetView(passwordField_r3.type === "password" ? passwordField_r3.type = "text" : passwordField_r3.type = "password");
        });
        \u0275\u0275template(22, AuthUnlockSessionComponent_Conditional_22_Template, 1, 1, "mat-icon", 15)(23, AuthUnlockSessionComponent_Conditional_23_Template, 1, 1, "mat-icon", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "mat-error");
        \u0275\u0275text(25, " Password is required ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "button", 16);
        \u0275\u0275listener("click", function AuthUnlockSessionComponent_Template_button_click_26_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.unlock());
        });
        \u0275\u0275template(27, AuthUnlockSessionComponent_Conditional_27_Template, 2, 0, "span")(28, AuthUnlockSessionComponent_Conditional_28_Template, 1, 2, "mat-progress-spinner", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "div", 18)(30, "span");
        \u0275\u0275text(31, "I'm not");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "a", 19);
        \u0275\u0275text(33);
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(34, "div", 20);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(35, "svg", 21)(36, "g", 22);
        \u0275\u0275element(37, "circle", 23)(38, "circle", 24);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(39, "svg", 25)(40, "defs")(41, "pattern", 26);
        \u0275\u0275element(42, "rect", 27);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(43, "rect", 28);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(44, "div", 29)(45, "div", 30)(46, "div");
        \u0275\u0275text(47, "Welcome to");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "div");
        \u0275\u0275text(49, "our community");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(50, "div", 31);
        \u0275\u0275text(51, " Fuse helps developers to build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "div", 32)(53, "div", 33);
        \u0275\u0275element(54, "img", 34)(55, "img", 35)(56, "img", 36)(57, "img", 37);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "div", 38);
        \u0275\u0275text(59, " More than 17k people joined us, it's your turn ");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        const passwordField_r3 = \u0275\u0275reference(20);
        \u0275\u0275advance(9);
        \u0275\u0275conditional(ctx.showAlert ? 9 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.unlockSessionForm);
        \u0275\u0275advance(5);
        \u0275\u0275property("formControlName", "name");
        \u0275\u0275advance(4);
        \u0275\u0275property("formControlName", "password");
        \u0275\u0275advance(3);
        \u0275\u0275conditional(passwordField_r3.type === "password" ? 22 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(passwordField_r3.type === "text" ? 23 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275property("color", "primary")("disabled", ctx.unlockSessionForm.disabled);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.unlockSessionForm.disabled ? 27 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.unlockSessionForm.disabled ? 28 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(12, _c1));
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.name);
      }
    }, dependencies: [
      FuseAlertComponent,
      FormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      ReactiveFormsModule,
      FormGroupDirective,
      FormControlName,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatError,
      MatSuffix,
      MatInputModule,
      MatInput,
      MatButtonModule,
      MatButton,
      MatIconButton,
      MatIconModule,
      MatIcon,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      RouterLink
    ], encapsulation: 2, data: { animation: fuseAnimations } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthUnlockSessionComponent, { className: "AuthUnlockSessionComponent", filePath: "src/app/modules/auth/unlock-session/unlock-session.component.ts", lineNumber: 38 });
})();

// src/app/modules/auth/unlock-session/unlock-session.routes.ts
var unlock_session_routes_default = [
  {
    path: "",
    component: AuthUnlockSessionComponent
  }
];
export {
  unlock_session_routes_default as default
};
//# sourceMappingURL=chunk-H7BSAFPU.js.map
