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

// src/app/modules/auth/sign-up/sign-up.component.ts
var _c0 = ["signUpNgForm"];
var _c1 = () => ["/sign-in"];
var _c2 = () => ["./"];
function AuthSignUpComponent_Conditional_12_Template(rf, ctx) {
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
function AuthSignUpComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Full name is required ");
    \u0275\u0275elementEnd();
  }
}
function AuthSignUpComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Email address is required ");
    \u0275\u0275elementEnd();
  }
}
function AuthSignUpComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Please enter a valid email address ");
    \u0275\u0275elementEnd();
  }
}
function AuthSignUpComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 17);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:eye");
  }
}
function AuthSignUpComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 17);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:eye-slash");
  }
}
function AuthSignUpComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " Create your free account ");
    \u0275\u0275elementEnd();
  }
}
function AuthSignUpComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 22);
  }
  if (rf & 2) {
    \u0275\u0275property("diameter", 24)("mode", "indeterminate");
  }
}
var AuthSignUpComponent = class _AuthSignUpComponent {
  /**
   * Constructor
   */
  constructor(_authService, _formBuilder, _router) {
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
    this.signUpForm = this._formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      company: [""],
      agreements: ["", Validators.requiredTrue]
    });
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Sign up
   */
  signUp() {
    if (this.signUpForm.invalid) {
      return;
    }
    this.signUpForm.disable();
    this.showAlert = false;
    this._authService.signUp(this.signUpForm.value).subscribe((response) => {
      this._router.navigateByUrl("/confirmation-required");
    }, (response) => {
      this.signUpForm.enable();
      this.signUpNgForm.resetForm();
      this.alert = {
        type: "error",
        message: "Something went wrong, please try again."
      };
      this.showAlert = true;
    });
  }
  static {
    this.\u0275fac = function AuthSignUpComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthSignUpComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(UntypedFormBuilder), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthSignUpComponent, selectors: [["auth-sign-up"]], viewQuery: function AuthSignUpComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.signUpNgForm = _t.first);
      }
    }, decls: 79, vars: 23, consts: [["signUpNgForm", "ngForm"], ["passwordField", ""], [1, "flex", "min-w-0", "flex-auto", "flex-col", "items-center", "sm:flex-row", "sm:justify-center", "md:items-start", "md:justify-start"], [1, "w-full", "px-4", "py-8", "sm:bg-card", "sm:w-auto", "sm:rounded-2xl", "sm:p-12", "sm:shadow", "md:flex", "md:h-full", "md:w-1/2", "md:items-center", "md:justify-end", "md:rounded-none", "md:p-16", "md:shadow-none"], [1, "mx-auto", "w-full", "max-w-80", "sm:mx-0", "sm:w-80"], [1, "w-12"], ["src", "images/logo/logo.svg"], [1, "mt-8", "text-4xl", "font-extrabold", "leading-tight", "tracking-tight"], [1, "mt-0.5", "flex", "items-baseline", "font-medium"], [1, "ml-1", "text-primary-500", "hover:underline", 3, "routerLink"], [1, "mt-8", 3, "appearance", "showIcon", "type"], [1, "mt-8", 3, "formGroup"], [1, "w-full"], ["id", "name", "matInput", "", 3, "formControlName"], ["id", "email", "matInput", "", 3, "formControlName"], ["id", "password", "matInput", "", "type", "password", 3, "formControlName"], ["mat-icon-button", "", "type", "button", "matSuffix", "", 3, "click"], [1, "icon-size-5", 3, "svgIcon"], ["id", "company-confirm", "matInput", "", 3, "formControlName"], [1, "mt-1.5", "inline-flex", "w-full", "items-end"], [1, "-ml-2", 3, "color", "formControlName"], ["mat-flat-button", "", 1, "fuse-mat-button-large", "mt-6", "w-full", 3, "click", "color", "disabled"], [3, "diameter", "mode"], [1, "relative", "hidden", "h-full", "w-1/2", "flex-auto", "items-center", "justify-center", "overflow-hidden", "bg-gray-800", "p-16", "dark:border-l", "md:flex", "lg:px-28"], ["viewBox", "0 0 960 540", "width", "100%", "height", "100%", "preserveAspectRatio", "xMidYMax slice", "xmlns", "http://www.w3.org/2000/svg", 1, "absolute", "inset-0", "pointer-events-none"], ["fill", "none", "stroke", "currentColor", "stroke-width", "100", 1, "text-gray-700", "opacity-25"], ["r", "234", "cx", "196", "cy", "23"], ["r", "234", "cx", "790", "cy", "491"], ["viewBox", "0 0 220 192", "width", "220", "height", "192", "fill", "none", 1, "absolute", "-top-16", "-right-16", "text-gray-700"], ["id", "837c3e70-6c3a-44e6-8854-cc48c737b659", "x", "0", "y", "0", "width", "20", "height", "20", "patternUnits", "userSpaceOnUse"], ["x", "0", "y", "0", "width", "4", "height", "4", "fill", "currentColor"], ["width", "220", "height", "192", "fill", "url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"], [1, "relative", "z-10", "w-full", "max-w-2xl"], [1, "text-7xl", "font-bold", "leading-none", "text-gray-100"], [1, "mt-6", "text-lg", "leading-6", "tracking-tight", "text-gray-400"], [1, "mt-8", "flex", "items-center"], [1, "flex", "flex-0", "items-center", "-space-x-1.5"], ["src", "images/avatars/female-18.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/female-11.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/male-09.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/male-16.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], [1, "ml-4", "font-medium", "tracking-tight", "text-gray-400"]], template: function AuthSignUpComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "div", 5);
        \u0275\u0275element(4, "img", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 7);
        \u0275\u0275text(6, " Sign up ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 8)(8, "div");
        \u0275\u0275text(9, "Already have an account?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "a", 9);
        \u0275\u0275text(11, "Sign in ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(12, AuthSignUpComponent_Conditional_12_Template, 2, 5, "fuse-alert", 10);
        \u0275\u0275elementStart(13, "form", 11, 0)(15, "mat-form-field", 12)(16, "mat-label");
        \u0275\u0275text(17, "Full name");
        \u0275\u0275elementEnd();
        \u0275\u0275element(18, "input", 13);
        \u0275\u0275template(19, AuthSignUpComponent_Conditional_19_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "mat-form-field", 12)(21, "mat-label");
        \u0275\u0275text(22, "Email address");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 14);
        \u0275\u0275template(24, AuthSignUpComponent_Conditional_24_Template, 2, 0, "mat-error")(25, AuthSignUpComponent_Conditional_25_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "mat-form-field", 12)(27, "mat-label");
        \u0275\u0275text(28, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275element(29, "input", 15, 1);
        \u0275\u0275elementStart(31, "button", 16);
        \u0275\u0275listener("click", function AuthSignUpComponent_Template_button_click_31_listener() {
          \u0275\u0275restoreView(_r1);
          const passwordField_r3 = \u0275\u0275reference(30);
          return \u0275\u0275resetView(passwordField_r3.type === "password" ? passwordField_r3.type = "text" : passwordField_r3.type = "password");
        });
        \u0275\u0275template(32, AuthSignUpComponent_Conditional_32_Template, 1, 1, "mat-icon", 17)(33, AuthSignUpComponent_Conditional_33_Template, 1, 1, "mat-icon", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "mat-error");
        \u0275\u0275text(35, " Password is required ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(36, "mat-form-field", 12)(37, "mat-label");
        \u0275\u0275text(38, "Company");
        \u0275\u0275elementEnd();
        \u0275\u0275element(39, "input", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "div", 19)(41, "mat-checkbox", 20)(42, "span");
        \u0275\u0275text(43, "I agree with");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "a", 9);
        \u0275\u0275text(45, "Terms ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "span");
        \u0275\u0275text(47, "and");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "a", 9);
        \u0275\u0275text(49, "Privacy Policy ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(50, "button", 21);
        \u0275\u0275listener("click", function AuthSignUpComponent_Template_button_click_50_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.signUp());
        });
        \u0275\u0275template(51, AuthSignUpComponent_Conditional_51_Template, 2, 0, "span")(52, AuthSignUpComponent_Conditional_52_Template, 1, 2, "mat-progress-spinner", 22);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(53, "div", 23);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(54, "svg", 24)(55, "g", 25);
        \u0275\u0275element(56, "circle", 26)(57, "circle", 27);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(58, "svg", 28)(59, "defs")(60, "pattern", 29);
        \u0275\u0275element(61, "rect", 30);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(62, "rect", 31);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(63, "div", 32)(64, "div", 33)(65, "div");
        \u0275\u0275text(66, "Welcome to");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "div");
        \u0275\u0275text(68, "our community");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(69, "div", 34);
        \u0275\u0275text(70, " Fuse helps developers to build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "div", 35)(72, "div", 36);
        \u0275\u0275element(73, "img", 37)(74, "img", 38)(75, "img", 39)(76, "img", 40);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(77, "div", 41);
        \u0275\u0275text(78, " More than 17k people joined us, it's your turn ");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        const passwordField_r3 = \u0275\u0275reference(30);
        \u0275\u0275advance(10);
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(20, _c1));
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.showAlert ? 12 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.signUpForm);
        \u0275\u0275advance(5);
        \u0275\u0275property("formControlName", "name");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.signUpForm.get("name").hasError("required") ? 19 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("formControlName", "email");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.signUpForm.get("email").hasError("required") ? 24 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.signUpForm.get("email").hasError("email") ? 25 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("formControlName", "password");
        \u0275\u0275advance(3);
        \u0275\u0275conditional(passwordField_r3.type === "password" ? 32 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(passwordField_r3.type === "text" ? 33 : -1);
        \u0275\u0275advance(6);
        \u0275\u0275property("formControlName", "company");
        \u0275\u0275advance(2);
        \u0275\u0275property("color", "primary")("formControlName", "agreements");
        \u0275\u0275advance(3);
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(21, _c2));
        \u0275\u0275advance(4);
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(22, _c2));
        \u0275\u0275advance(2);
        \u0275\u0275property("color", "primary")("disabled", ctx.signUpForm.disabled);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.signUpForm.disabled ? 51 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.signUpForm.disabled ? 52 : -1);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthSignUpComponent, { className: "AuthSignUpComponent", filePath: "src/app/modules/auth/sign-up/sign-up.component.ts", lineNumber: 39 });
})();

// src/app/modules/auth/sign-up/sign-up.routes.ts
var sign_up_routes_default = [
  {
    path: "",
    component: AuthSignUpComponent
  }
];
export {
  sign_up_routes_default as default
};
//# sourceMappingURL=chunk-2YFNKYHK.js.map
