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
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  ɵNgNoValidate
} from "./chunk-QBGRN5J4.js";
import {
  MatButton,
  MatButtonModule
} from "./chunk-MBEWGW4P.js";
import {
  fuseAnimations
} from "./chunk-MRHFANNG.js";
import {
  AuthService
} from "./chunk-MNNV5I3B.js";
import {
  RouterLink,
  finalize,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-RD3LU5ZG.js";

// src/app/modules/auth/forgot-password/forgot-password.component.ts
var _c0 = ["forgotPasswordNgForm"];
var _c1 = () => ["/sign-in"];
function AuthForgotPasswordComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "fuse-alert", 8);
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
function AuthForgotPasswordComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Email address is required ");
    \u0275\u0275elementEnd();
  }
}
function AuthForgotPasswordComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Please enter a valid email address ");
    \u0275\u0275elementEnd();
  }
}
function AuthForgotPasswordComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " Send reset link ");
    \u0275\u0275elementEnd();
  }
}
function AuthForgotPasswordComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 13);
  }
  if (rf & 2) {
    \u0275\u0275property("diameter", 24)("mode", "indeterminate");
  }
}
var AuthForgotPasswordComponent = class _AuthForgotPasswordComponent {
  /**
   * Constructor
   */
  constructor(_authService, _formBuilder) {
    this._authService = _authService;
    this._formBuilder = _formBuilder;
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
    this.forgotPasswordForm = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Send the reset link
   */
  sendResetLink() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.forgotPasswordForm.disable();
    this.showAlert = false;
    this._authService.forgotPassword(this.forgotPasswordForm.get("email").value).pipe(finalize(() => {
      this.forgotPasswordForm.enable();
      this.forgotPasswordNgForm.resetForm();
      this.showAlert = true;
    })).subscribe((response) => {
      this.alert = {
        type: "success",
        message: "Password reset sent! You'll receive an email if you are registered on our system."
      };
    }, (response) => {
      this.alert = {
        type: "error",
        message: "Email does not found! Are you sure you are already a member?"
      };
    });
  }
  static {
    this.\u0275fac = function AuthForgotPasswordComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthForgotPasswordComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(UntypedFormBuilder));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthForgotPasswordComponent, selectors: [["auth-forgot-password"]], viewQuery: function AuthForgotPasswordComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.forgotPasswordNgForm = _t.first);
      }
    }, decls: 52, vars: 11, consts: [["forgotPasswordNgForm", "ngForm"], [1, "flex", "min-w-0", "flex-auto", "flex-col", "items-center", "sm:flex-row", "sm:justify-center", "md:items-start", "md:justify-start"], [1, "w-full", "px-4", "py-8", "sm:bg-card", "sm:w-auto", "sm:rounded-2xl", "sm:p-12", "sm:shadow", "md:flex", "md:h-full", "md:w-1/2", "md:items-center", "md:justify-end", "md:rounded-none", "md:p-16", "md:shadow-none"], [1, "mx-auto", "w-full", "max-w-80", "sm:mx-0", "sm:w-80"], [1, "w-12"], ["src", "images/logo/logo.svg"], [1, "mt-8", "text-4xl", "font-extrabold", "leading-tight", "tracking-tight"], [1, "mt-0.5", "font-medium"], [1, "mt-8", 3, "appearance", "showIcon", "type"], [1, "mt-8", 3, "formGroup"], [1, "w-full"], ["id", "email", "matInput", "", 3, "formControlName"], ["mat-flat-button", "", 1, "fuse-mat-button-large", "mt-3", "w-full", 3, "click", "color", "disabled"], [3, "diameter", "mode"], [1, "text-secondary", "mt-8", "text-md", "font-medium"], [1, "ml-1", "text-primary-500", "hover:underline", 3, "routerLink"], [1, "relative", "hidden", "h-full", "w-1/2", "flex-auto", "items-center", "justify-center", "overflow-hidden", "bg-gray-800", "p-16", "dark:border-l", "md:flex", "lg:px-28"], ["viewBox", "0 0 960 540", "width", "100%", "height", "100%", "preserveAspectRatio", "xMidYMax slice", "xmlns", "http://www.w3.org/2000/svg", 1, "absolute", "inset-0", "pointer-events-none"], ["fill", "none", "stroke", "currentColor", "stroke-width", "100", 1, "text-gray-700", "opacity-25"], ["r", "234", "cx", "196", "cy", "23"], ["r", "234", "cx", "790", "cy", "491"], ["viewBox", "0 0 220 192", "width", "220", "height", "192", "fill", "none", 1, "absolute", "-top-16", "-right-16", "text-gray-700"], ["id", "837c3e70-6c3a-44e6-8854-cc48c737b659", "x", "0", "y", "0", "width", "20", "height", "20", "patternUnits", "userSpaceOnUse"], ["x", "0", "y", "0", "width", "4", "height", "4", "fill", "currentColor"], ["width", "220", "height", "192", "fill", "url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"], [1, "relative", "z-10", "w-full", "max-w-2xl"], [1, "text-7xl", "font-bold", "leading-none", "text-gray-100"], [1, "mt-6", "text-lg", "leading-6", "tracking-tight", "text-gray-400"], [1, "mt-8", "flex", "items-center"], [1, "flex", "flex-0", "items-center", "-space-x-1.5"], ["src", "images/avatars/female-18.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/female-11.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/male-09.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/male-16.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], [1, "ml-4", "font-medium", "tracking-tight", "text-gray-400"]], template: function AuthForgotPasswordComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4);
        \u0275\u0275element(4, "img", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 6);
        \u0275\u0275text(6, " Forgot password? ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 7);
        \u0275\u0275text(8, " Fill the form to reset your password ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, AuthForgotPasswordComponent_Conditional_9_Template, 2, 5, "fuse-alert", 8);
        \u0275\u0275elementStart(10, "form", 9, 0)(12, "mat-form-field", 10)(13, "mat-label");
        \u0275\u0275text(14, "Email address");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 11);
        \u0275\u0275template(16, AuthForgotPasswordComponent_Conditional_16_Template, 2, 0, "mat-error")(17, AuthForgotPasswordComponent_Conditional_17_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "button", 12);
        \u0275\u0275listener("click", function AuthForgotPasswordComponent_Template_button_click_18_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.sendResetLink());
        });
        \u0275\u0275template(19, AuthForgotPasswordComponent_Conditional_19_Template, 2, 0, "span")(20, AuthForgotPasswordComponent_Conditional_20_Template, 1, 2, "mat-progress-spinner", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "div", 14)(22, "span");
        \u0275\u0275text(23, "Return to");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "a", 15);
        \u0275\u0275text(25, "sign in ");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(26, "div", 16);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(27, "svg", 17)(28, "g", 18);
        \u0275\u0275element(29, "circle", 19)(30, "circle", 20);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(31, "svg", 21)(32, "defs")(33, "pattern", 22);
        \u0275\u0275element(34, "rect", 23);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(35, "rect", 24);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(36, "div", 25)(37, "div", 26)(38, "div");
        \u0275\u0275text(39, "Welcome to");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "div");
        \u0275\u0275text(41, "our community");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(42, "div", 27);
        \u0275\u0275text(43, " Fuse helps developers to build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "div", 28)(45, "div", 29);
        \u0275\u0275element(46, "img", 30)(47, "img", 31)(48, "img", 32)(49, "img", 33);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "div", 34);
        \u0275\u0275text(51, " More than 17k people joined us, it's your turn ");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275conditional(ctx.showAlert ? 9 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.forgotPasswordForm);
        \u0275\u0275advance(5);
        \u0275\u0275property("formControlName", "email");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.forgotPasswordForm.get("email").hasError("required") ? 16 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.forgotPasswordForm.get("email").hasError("email") ? 17 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("color", "primary")("disabled", ctx.forgotPasswordForm.disabled);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.forgotPasswordForm.disabled ? 19 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.forgotPasswordForm.disabled ? 20 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(10, _c1));
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
      MatInputModule,
      MatInput,
      MatButtonModule,
      MatButton,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      RouterLink
    ], encapsulation: 2, data: { animation: fuseAnimations } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthForgotPasswordComponent, { className: "AuthForgotPasswordComponent", filePath: "src/app/modules/auth/forgot-password/forgot-password.component.ts", lineNumber: 36 });
})();

// src/app/modules/auth/forgot-password/forgot-password.routes.ts
var forgot_password_routes_default = [
  {
    path: "",
    component: AuthForgotPasswordComponent
  }
];
export {
  forgot_password_routes_default as default
};
//# sourceMappingURL=chunk-6HCFE2BJ.js.map
