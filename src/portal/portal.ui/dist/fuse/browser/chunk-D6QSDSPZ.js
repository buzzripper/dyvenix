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
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-RD3LU5ZG.js";

// src/@fuse/validators/validators.ts
var FuseValidators = class {
  /**
   * Check for empty (optional fields) values
   *
   * @param value
   */
  static isEmptyInputValue(value) {
    return value == null || value.length === 0;
  }
  /**
   * Must match validator
   *
   * @param controlPath A dot-delimited string values that define the path to the control.
   * @param matchingControlPath A dot-delimited string values that define the path to the matching control.
   */
  static mustMatch(controlPath, matchingControlPath) {
    return (formGroup) => {
      const control = formGroup.get(controlPath);
      const matchingControl = formGroup.get(matchingControlPath);
      if (!control || !matchingControl) {
        return null;
      }
      if (matchingControl.hasError("mustMatch")) {
        delete matchingControl.errors.mustMatch;
        matchingControl.updateValueAndValidity();
      }
      if (this.isEmptyInputValue(matchingControl.value) || control.value === matchingControl.value) {
        return null;
      }
      const errors = { mustMatch: true };
      matchingControl.setErrors(errors);
      return errors;
    };
  }
};

// src/app/modules/auth/reset-password/reset-password.component.ts
var _c0 = ["resetPasswordNgForm"];
var _c1 = () => ["/sign-in"];
function AuthResetPasswordComponent_Conditional_9_Template(rf, ctx) {
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
function AuthResetPasswordComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 15);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:eye");
  }
}
function AuthResetPasswordComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 15);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:eye-slash");
  }
}
function AuthResetPasswordComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 15);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:eye");
  }
}
function AuthResetPasswordComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 15);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:eye-slash");
  }
}
function AuthResetPasswordComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Password confirmation is required ");
    \u0275\u0275elementEnd();
  }
}
function AuthResetPasswordComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Passwords must match ");
    \u0275\u0275elementEnd();
  }
}
function AuthResetPasswordComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " Reset your password ");
    \u0275\u0275elementEnd();
  }
}
function AuthResetPasswordComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 18);
  }
  if (rf & 2) {
    \u0275\u0275property("diameter", 24)("mode", "indeterminate");
  }
}
var AuthResetPasswordComponent = class _AuthResetPasswordComponent {
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
    this.resetPasswordForm = this._formBuilder.group({
      password: ["", Validators.required],
      passwordConfirm: ["", Validators.required]
    }, {
      validators: FuseValidators.mustMatch("password", "passwordConfirm")
    });
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Reset password
   */
  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.resetPasswordForm.disable();
    this.showAlert = false;
    this._authService.resetPassword(this.resetPasswordForm.get("password").value).pipe(finalize(() => {
      this.resetPasswordForm.enable();
      this.resetPasswordNgForm.resetForm();
      this.showAlert = true;
    })).subscribe((response) => {
      this.alert = {
        type: "success",
        message: "Your password has been reset."
      };
    }, (response) => {
      this.alert = {
        type: "error",
        message: "Something went wrong, please try again."
      };
    });
  }
  static {
    this.\u0275fac = function AuthResetPasswordComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthResetPasswordComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(UntypedFormBuilder));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthResetPasswordComponent, selectors: [["auth-reset-password"]], viewQuery: function AuthResetPasswordComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.resetPasswordNgForm = _t.first);
      }
    }, decls: 66, vars: 16, consts: [["resetPasswordNgForm", "ngForm"], ["passwordField", ""], ["passwordConfirmField", ""], [1, "flex", "min-w-0", "flex-auto", "flex-col", "items-center", "sm:flex-row", "sm:justify-center", "md:items-start", "md:justify-start"], [1, "w-full", "px-4", "py-8", "sm:bg-card", "sm:w-auto", "sm:rounded-2xl", "sm:p-12", "sm:shadow", "md:flex", "md:h-full", "md:w-1/2", "md:items-center", "md:justify-end", "md:rounded-none", "md:p-16", "md:shadow-none"], [1, "mx-auto", "w-full", "max-w-80", "sm:mx-0", "sm:w-80"], [1, "w-12"], ["src", "images/logo/logo.svg"], [1, "mt-8", "text-4xl", "font-extrabold", "leading-tight", "tracking-tight"], [1, "mt-0.5", "font-medium"], [1, "mt-8", 3, "appearance", "showIcon", "type"], [1, "mt-8", 3, "formGroup"], [1, "w-full"], ["id", "password", "matInput", "", "type", "password", 3, "formControlName"], ["mat-icon-button", "", "type", "button", "matSuffix", "", 3, "click"], [1, "icon-size-5", 3, "svgIcon"], ["id", "password-confirm", "matInput", "", "type", "password", 3, "formControlName"], ["mat-flat-button", "", 1, "fuse-mat-button-large", "mt-3", "w-full", 3, "click", "color", "disabled"], [3, "diameter", "mode"], [1, "text-secondary", "mt-8", "text-md", "font-medium"], [1, "ml-1", "text-primary-500", "hover:underline", 3, "routerLink"], [1, "relative", "hidden", "h-full", "w-1/2", "flex-auto", "items-center", "justify-center", "overflow-hidden", "bg-gray-800", "p-16", "dark:border-l", "md:flex", "lg:px-28"], ["viewBox", "0 0 960 540", "width", "100%", "height", "100%", "preserveAspectRatio", "xMidYMax slice", "xmlns", "http://www.w3.org/2000/svg", 1, "absolute", "inset-0", "pointer-events-none"], ["fill", "none", "stroke", "currentColor", "stroke-width", "100", 1, "text-gray-700", "opacity-25"], ["r", "234", "cx", "196", "cy", "23"], ["r", "234", "cx", "790", "cy", "491"], ["viewBox", "0 0 220 192", "width", "220", "height", "192", "fill", "none", 1, "absolute", "-top-16", "-right-16", "text-gray-700"], ["id", "837c3e70-6c3a-44e6-8854-cc48c737b659", "x", "0", "y", "0", "width", "20", "height", "20", "patternUnits", "userSpaceOnUse"], ["x", "0", "y", "0", "width", "4", "height", "4", "fill", "currentColor"], ["width", "220", "height", "192", "fill", "url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"], [1, "relative", "z-10", "w-full", "max-w-2xl"], [1, "text-7xl", "font-bold", "leading-none", "text-gray-100"], [1, "mt-6", "text-lg", "leading-6", "tracking-tight", "text-gray-400"], [1, "mt-8", "flex", "items-center"], [1, "flex", "flex-0", "items-center", "-space-x-1.5"], ["src", "images/avatars/female-18.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/female-11.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/male-09.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/male-16.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], [1, "ml-4", "font-medium", "tracking-tight", "text-gray-400"]], template: function AuthResetPasswordComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "div", 5)(3, "div", 6);
        \u0275\u0275element(4, "img", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 8);
        \u0275\u0275text(6, " Reset your password ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 9);
        \u0275\u0275text(8, " Create a new password for your account ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, AuthResetPasswordComponent_Conditional_9_Template, 2, 5, "fuse-alert", 10);
        \u0275\u0275elementStart(10, "form", 11, 0)(12, "mat-form-field", 12)(13, "mat-label");
        \u0275\u0275text(14, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 13, 1);
        \u0275\u0275elementStart(17, "button", 14);
        \u0275\u0275listener("click", function AuthResetPasswordComponent_Template_button_click_17_listener() {
          \u0275\u0275restoreView(_r1);
          const passwordField_r3 = \u0275\u0275reference(16);
          return \u0275\u0275resetView(passwordField_r3.type === "password" ? passwordField_r3.type = "text" : passwordField_r3.type = "password");
        });
        \u0275\u0275template(18, AuthResetPasswordComponent_Conditional_18_Template, 1, 1, "mat-icon", 15)(19, AuthResetPasswordComponent_Conditional_19_Template, 1, 1, "mat-icon", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "mat-error");
        \u0275\u0275text(21, " Password is required ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "mat-form-field", 12)(23, "mat-label");
        \u0275\u0275text(24, "Password (Confirm)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(25, "input", 16, 2);
        \u0275\u0275elementStart(27, "button", 14);
        \u0275\u0275listener("click", function AuthResetPasswordComponent_Template_button_click_27_listener() {
          \u0275\u0275restoreView(_r1);
          const passwordConfirmField_r4 = \u0275\u0275reference(26);
          return \u0275\u0275resetView(passwordConfirmField_r4.type === "password" ? passwordConfirmField_r4.type = "text" : passwordConfirmField_r4.type = "password");
        });
        \u0275\u0275template(28, AuthResetPasswordComponent_Conditional_28_Template, 1, 1, "mat-icon", 15)(29, AuthResetPasswordComponent_Conditional_29_Template, 1, 1, "mat-icon", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275template(30, AuthResetPasswordComponent_Conditional_30_Template, 2, 0, "mat-error")(31, AuthResetPasswordComponent_Conditional_31_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "button", 17);
        \u0275\u0275listener("click", function AuthResetPasswordComponent_Template_button_click_32_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.resetPassword());
        });
        \u0275\u0275template(33, AuthResetPasswordComponent_Conditional_33_Template, 2, 0, "span")(34, AuthResetPasswordComponent_Conditional_34_Template, 1, 2, "mat-progress-spinner", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "div", 19)(36, "span");
        \u0275\u0275text(37, "Return to");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "a", 20);
        \u0275\u0275text(39, "sign in ");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(40, "div", 21);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(41, "svg", 22)(42, "g", 23);
        \u0275\u0275element(43, "circle", 24)(44, "circle", 25);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(45, "svg", 26)(46, "defs")(47, "pattern", 27);
        \u0275\u0275element(48, "rect", 28);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(49, "rect", 29);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(50, "div", 30)(51, "div", 31)(52, "div");
        \u0275\u0275text(53, "Welcome to");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "div");
        \u0275\u0275text(55, "our community");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(56, "div", 32);
        \u0275\u0275text(57, " Fuse helps developers to build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "div", 33)(59, "div", 34);
        \u0275\u0275element(60, "img", 35)(61, "img", 36)(62, "img", 37)(63, "img", 38);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "div", 39);
        \u0275\u0275text(65, " More than 17k people joined us, it's your turn ");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        const passwordField_r3 = \u0275\u0275reference(16);
        const passwordConfirmField_r4 = \u0275\u0275reference(26);
        \u0275\u0275advance(9);
        \u0275\u0275conditional(ctx.showAlert ? 9 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.resetPasswordForm);
        \u0275\u0275advance(5);
        \u0275\u0275property("formControlName", "password");
        \u0275\u0275advance(3);
        \u0275\u0275conditional(passwordField_r3.type === "password" ? 18 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(passwordField_r3.type === "text" ? 19 : -1);
        \u0275\u0275advance(6);
        \u0275\u0275property("formControlName", "passwordConfirm");
        \u0275\u0275advance(3);
        \u0275\u0275conditional(passwordConfirmField_r4.type === "password" ? 28 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(passwordConfirmField_r4.type === "text" ? 29 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.resetPasswordForm.get("passwordConfirm").hasError("required") ? 30 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.resetPasswordForm.get("passwordConfirm").hasError("mustMatch") ? 31 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("color", "primary")("disabled", ctx.resetPasswordForm.disabled);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.resetPasswordForm.disabled ? 33 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.resetPasswordForm.disabled ? 34 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(15, _c1));
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthResetPasswordComponent, { className: "AuthResetPasswordComponent", filePath: "src/app/modules/auth/reset-password/reset-password.component.ts", lineNumber: 39 });
})();

// src/app/modules/auth/reset-password/reset-password.routes.ts
var reset_password_routes_default = [
  {
    path: "",
    component: AuthResetPasswordComponent
  }
];
export {
  reset_password_routes_default as default
};
//# sourceMappingURL=chunk-D6QSDSPZ.js.map
