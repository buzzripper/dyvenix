import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-V7WI5ELF.js";
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
  AuthService
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
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-RD3LU5ZG.js";

// src/app/modules/auth/sign-in/sign-in.component.ts
var _c0 = ["signInNgForm"];
var _c1 = () => ["/sign-up"];
var _c2 = () => ["/forgot-password"];
function AuthSignInComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "fuse-alert", 10);
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
function AuthSignInComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Email address is required ");
    \u0275\u0275elementEnd();
  }
}
function AuthSignInComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Please enter a valid email address ");
    \u0275\u0275elementEnd();
  }
}
function AuthSignInComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 16);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:eye");
  }
}
function AuthSignInComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 16);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:eye-slash");
  }
}
function AuthSignInComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " Sign in ");
    \u0275\u0275elementEnd();
  }
}
function AuthSignInComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 21);
  }
  if (rf & 2) {
    \u0275\u0275property("diameter", 24)("mode", "indeterminate");
  }
}
var AuthSignInComponent = class _AuthSignInComponent {
  /**
   * Constructor
   */
  constructor(_activatedRoute, _authService, _formBuilder, _router) {
    this._activatedRoute = _activatedRoute;
    this._authService = _authService;
    this._formBuilder = _formBuilder;
    this._router = _router;
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
    this.signInForm = this._formBuilder.group({
      email: [
        "hughes.brian@company.com",
        [Validators.required, Validators.email]
      ],
      password: ["admin", Validators.required],
      rememberMe: [""]
    });
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Sign in
   */
  signIn() {
    if (this.signInForm.invalid) {
      return;
    }
    this.signInForm.disable();
    this.showAlert = false;
    this._authService.signIn(this.signInForm.value).subscribe(() => {
      const redirectURL = this._activatedRoute.snapshot.queryParamMap.get("redirectURL") || "/signed-in-redirect";
      this._router.navigateByUrl(redirectURL);
    }, (response) => {
      this.signInForm.enable();
      this.signInNgForm.resetForm();
      this.alert = {
        type: "error",
        message: "Wrong email or password"
      };
      this.showAlert = true;
    });
  }
  static {
    this.\u0275fac = function AuthSignInComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthSignInComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(UntypedFormBuilder), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthSignInComponent, selectors: [["auth-sign-in"]], viewQuery: function AuthSignInComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.signInNgForm = _t.first);
      }
    }, decls: 82, vars: 24, consts: [["signInNgForm", "ngForm"], ["passwordField", ""], [1, "flex", "min-w-0", "flex-auto", "flex-col", "items-center", "sm:flex-row", "sm:justify-center", "md:items-start", "md:justify-start"], [1, "w-full", "px-4", "py-8", "sm:bg-card", "sm:w-auto", "sm:rounded-2xl", "sm:p-12", "sm:shadow", "md:flex", "md:h-full", "md:w-1/2", "md:items-center", "md:justify-end", "md:rounded-none", "md:p-16", "md:shadow-none"], [1, "mx-auto", "w-full", "max-w-80", "sm:mx-0", "sm:w-80"], [1, "w-12"], ["src", "images/logo/logo.svg"], [1, "mt-8", "text-4xl", "font-extrabold", "leading-tight", "tracking-tight"], [1, "mt-0.5", "flex", "items-baseline", "font-medium"], [1, "ml-1", "text-primary-500", "hover:underline", 3, "routerLink"], [1, "mt-8", 3, "appearance", "showIcon", "type"], [1, "mt-8", 3, "formGroup"], [1, "w-full"], ["id", "email", "matInput", "", 3, "formControlName"], ["id", "password", "matInput", "", "type", "password", 3, "formControlName"], ["mat-icon-button", "", "type", "button", "matSuffix", "", 3, "click"], [1, "icon-size-5", 3, "svgIcon"], [1, "mt-1.5", "inline-flex", "w-full", "items-center", "justify-between"], [1, "-ml-2", 3, "color", "formControlName"], [1, "text-md", "font-medium", "text-primary-500", "hover:underline", 3, "routerLink"], ["mat-flat-button", "", 1, "fuse-mat-button-large", "mt-6", "w-full", 3, "click", "color", "disabled"], [3, "diameter", "mode"], [1, "mt-8", "flex", "items-center"], [1, "mt-px", "flex-auto", "border-t"], [1, "text-secondary", "mx-2"], [1, "mt-8", "flex", "items-center", "space-x-4"], ["type", "button", "mat-stroked-button", "", 1, "flex-auto"], [1, "relative", "hidden", "h-full", "w-1/2", "flex-auto", "items-center", "justify-center", "overflow-hidden", "bg-gray-800", "p-16", "dark:border-l", "md:flex", "lg:px-28"], ["viewBox", "0 0 960 540", "width", "100%", "height", "100%", "preserveAspectRatio", "xMidYMax slice", "xmlns", "http://www.w3.org/2000/svg", 1, "absolute", "inset-0", "pointer-events-none"], ["fill", "none", "stroke", "currentColor", "stroke-width", "100", 1, "text-gray-700", "opacity-25"], ["r", "234", "cx", "196", "cy", "23"], ["r", "234", "cx", "790", "cy", "491"], ["viewBox", "0 0 220 192", "width", "220", "height", "192", "fill", "none", 1, "absolute", "-top-16", "-right-16", "text-gray-700"], ["id", "837c3e70-6c3a-44e6-8854-cc48c737b659", "x", "0", "y", "0", "width", "20", "height", "20", "patternUnits", "userSpaceOnUse"], ["x", "0", "y", "0", "width", "4", "height", "4", "fill", "currentColor"], ["width", "220", "height", "192", "fill", "url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"], [1, "relative", "z-10", "w-full", "max-w-2xl"], [1, "text-7xl", "font-bold", "leading-none", "text-gray-100"], [1, "mt-6", "text-lg", "leading-6", "tracking-tight", "text-gray-400"], [1, "flex", "flex-0", "items-center", "-space-x-1.5"], ["src", "images/avatars/female-18.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/female-11.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/male-09.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/male-16.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], [1, "ml-4", "font-medium", "tracking-tight", "text-gray-400"]], template: function AuthSignInComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "div", 5);
        \u0275\u0275element(4, "img", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 7);
        \u0275\u0275text(6, " Sign in ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 8)(8, "div");
        \u0275\u0275text(9, "Don't have an account?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "a", 9);
        \u0275\u0275text(11, "Sign up ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "fuse-alert", 10);
        \u0275\u0275text(13, " You are browsing ");
        \u0275\u0275elementStart(14, "strong");
        \u0275\u0275text(15, "Fuse Demo");
        \u0275\u0275elementEnd();
        \u0275\u0275text(16, '. Click on the "Sign in" button to access the Demo and Documentation. ');
        \u0275\u0275elementEnd();
        \u0275\u0275template(17, AuthSignInComponent_Conditional_17_Template, 2, 5, "fuse-alert", 10);
        \u0275\u0275elementStart(18, "form", 11, 0)(20, "mat-form-field", 12)(21, "mat-label");
        \u0275\u0275text(22, "Email address");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 13);
        \u0275\u0275template(24, AuthSignInComponent_Conditional_24_Template, 2, 0, "mat-error")(25, AuthSignInComponent_Conditional_25_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "mat-form-field", 12)(27, "mat-label");
        \u0275\u0275text(28, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275element(29, "input", 14, 1);
        \u0275\u0275elementStart(31, "button", 15);
        \u0275\u0275listener("click", function AuthSignInComponent_Template_button_click_31_listener() {
          \u0275\u0275restoreView(_r1);
          const passwordField_r3 = \u0275\u0275reference(30);
          return \u0275\u0275resetView(passwordField_r3.type === "password" ? passwordField_r3.type = "text" : passwordField_r3.type = "password");
        });
        \u0275\u0275template(32, AuthSignInComponent_Conditional_32_Template, 1, 1, "mat-icon", 16)(33, AuthSignInComponent_Conditional_33_Template, 1, 1, "mat-icon", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "mat-error");
        \u0275\u0275text(35, " Password is required ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(36, "div", 17)(37, "mat-checkbox", 18);
        \u0275\u0275text(38, " Remember me ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "a", 19);
        \u0275\u0275text(40, "Forgot password? ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(41, "button", 20);
        \u0275\u0275listener("click", function AuthSignInComponent_Template_button_click_41_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.signIn());
        });
        \u0275\u0275template(42, AuthSignInComponent_Conditional_42_Template, 2, 0, "span")(43, AuthSignInComponent_Conditional_43_Template, 1, 2, "mat-progress-spinner", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "div", 22);
        \u0275\u0275element(45, "div", 23);
        \u0275\u0275elementStart(46, "div", 24);
        \u0275\u0275text(47, "Or continue with");
        \u0275\u0275elementEnd();
        \u0275\u0275element(48, "div", 23);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "div", 25)(50, "button", 26);
        \u0275\u0275element(51, "mat-icon", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "button", 26);
        \u0275\u0275element(53, "mat-icon", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "button", 26);
        \u0275\u0275element(55, "mat-icon", 16);
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(56, "div", 27);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(57, "svg", 28)(58, "g", 29);
        \u0275\u0275element(59, "circle", 30)(60, "circle", 31);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(61, "svg", 32)(62, "defs")(63, "pattern", 33);
        \u0275\u0275element(64, "rect", 34);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(65, "rect", 35);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(66, "div", 36)(67, "div", 37)(68, "div");
        \u0275\u0275text(69, "Welcome to");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(70, "div");
        \u0275\u0275text(71, "our community");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(72, "div", 38);
        \u0275\u0275text(73, " Fuse helps developers to build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(74, "div", 22)(75, "div", 39);
        \u0275\u0275element(76, "img", 40)(77, "img", 41)(78, "img", 42)(79, "img", 43);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(80, "div", 44);
        \u0275\u0275text(81, " More than 17k people joined us, it's your turn ");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        const passwordField_r3 = \u0275\u0275reference(30);
        \u0275\u0275advance(10);
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(22, _c1));
        \u0275\u0275advance(2);
        \u0275\u0275property("appearance", "outline")("showIcon", false)("type", "info");
        \u0275\u0275advance(5);
        \u0275\u0275conditional(ctx.showAlert ? 17 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.signInForm);
        \u0275\u0275advance(5);
        \u0275\u0275property("formControlName", "email");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.signInForm.get("email").hasError("required") ? 24 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.signInForm.get("email").hasError("email") ? 25 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("formControlName", "password");
        \u0275\u0275advance(3);
        \u0275\u0275conditional(passwordField_r3.type === "password" ? 32 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(passwordField_r3.type === "text" ? 33 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("color", "primary")("formControlName", "rememberMe");
        \u0275\u0275advance(2);
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(23, _c2));
        \u0275\u0275advance(2);
        \u0275\u0275property("color", "primary")("disabled", ctx.signInForm.disabled);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.signInForm.disabled ? 42 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.signInForm.disabled ? 43 : -1);
        \u0275\u0275advance(8);
        \u0275\u0275property("svgIcon", "feather:facebook");
        \u0275\u0275advance(2);
        \u0275\u0275property("svgIcon", "feather:twitter");
        \u0275\u0275advance(2);
        \u0275\u0275property("svgIcon", "feather:github");
      }
    }, dependencies: [
      RouterLink,
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
      MatCheckboxModule,
      MatCheckbox,
      MatProgressSpinnerModule,
      MatProgressSpinner
    ], encapsulation: 2, data: { animation: fuseAnimations } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthSignInComponent, { className: "AuthSignInComponent", filePath: "src/app/modules/auth/sign-in/sign-in.component.ts", lineNumber: 39 });
})();

// src/app/modules/auth/sign-in/sign-in.routes.ts
var sign_in_routes_default = [
  {
    path: "",
    component: AuthSignInComponent
  }
];
export {
  sign_in_routes_default as default
};
//# sourceMappingURL=chunk-44KFGUQQ.js.map
