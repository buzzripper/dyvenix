import {
  fuseAnimations
} from "./chunk-MRHFANNG.js";
import {
  RouterLink,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtext
} from "./chunk-RD3LU5ZG.js";

// src/app/modules/auth/confirmation-required/confirmation-required.component.ts
var _c0 = () => ["/sign-in"];
var AuthConfirmationRequiredComponent = class _AuthConfirmationRequiredComponent {
  /**
   * Constructor
   */
  constructor() {
  }
  static {
    this.\u0275fac = function AuthConfirmationRequiredComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthConfirmationRequiredComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthConfirmationRequiredComponent, selectors: [["auth-confirmation-required"]], decls: 40, vars: 2, consts: [[1, "flex", "min-w-0", "flex-auto", "flex-col", "items-center", "sm:flex-row", "sm:justify-center", "md:items-start", "md:justify-start"], [1, "w-full", "px-4", "py-8", "sm:bg-card", "sm:w-auto", "sm:rounded-2xl", "sm:p-12", "sm:shadow", "md:flex", "md:h-full", "md:w-1/2", "md:items-center", "md:justify-end", "md:rounded-none", "md:p-16", "md:shadow-none"], [1, "mx-auto", "w-full", "max-w-80", "sm:mx-0", "sm:w-80"], [1, "w-12"], ["src", "images/logo/logo.svg"], [1, "mt-8", "text-4xl", "font-extrabold", "leading-tight", "tracking-tight"], [1, "mt-4"], [1, "text-secondary", "mt-8", "text-md", "font-medium"], [1, "ml-1", "text-primary-500", "hover:underline", 3, "routerLink"], [1, "relative", "hidden", "h-full", "w-1/2", "flex-auto", "items-center", "justify-center", "overflow-hidden", "bg-gray-800", "p-16", "dark:border-l", "md:flex", "lg:px-28"], ["viewBox", "0 0 960 540", "width", "100%", "height", "100%", "preserveAspectRatio", "xMidYMax slice", "xmlns", "http://www.w3.org/2000/svg", 1, "absolute", "inset-0", "pointer-events-none"], ["fill", "none", "stroke", "currentColor", "stroke-width", "100", 1, "text-gray-700", "opacity-25"], ["r", "234", "cx", "196", "cy", "23"], ["r", "234", "cx", "790", "cy", "491"], ["viewBox", "0 0 220 192", "width", "220", "height", "192", "fill", "none", 1, "absolute", "-top-16", "-right-16", "text-gray-700"], ["id", "837c3e70-6c3a-44e6-8854-cc48c737b659", "x", "0", "y", "0", "width", "20", "height", "20", "patternUnits", "userSpaceOnUse"], ["x", "0", "y", "0", "width", "4", "height", "4", "fill", "currentColor"], ["width", "220", "height", "192", "fill", "url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"], [1, "relative", "z-10", "w-full", "max-w-2xl"], [1, "text-7xl", "font-bold", "leading-none", "text-gray-100"], [1, "mt-6", "text-lg", "leading-6", "tracking-tight", "text-gray-400"], [1, "mt-8", "flex", "items-center"], [1, "flex", "flex-0", "items-center", "-space-x-1.5"], ["src", "images/avatars/female-18.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/female-11.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/male-09.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], ["src", "images/avatars/male-16.jpg", 1, "h-10", "w-10", "flex-0", "rounded-full", "object-cover", "ring-4", "ring-gray-800", "ring-offset-1", "ring-offset-gray-800"], [1, "ml-4", "font-medium", "tracking-tight", "text-gray-400"]], template: function AuthConfirmationRequiredComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275element(4, "img", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 5);
        \u0275\u0275text(6, " Confirmation required ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 6);
        \u0275\u0275text(8, " A confirmation mail with instructions has been sent to your email address. Follow those instructions to confirm your email address and activate your account. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 7)(10, "span");
        \u0275\u0275text(11, "Return to");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "a", 8);
        \u0275\u0275text(13, "sign in ");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(14, "div", 9);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(15, "svg", 10)(16, "g", 11);
        \u0275\u0275element(17, "circle", 12)(18, "circle", 13);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "svg", 14)(20, "defs")(21, "pattern", 15);
        \u0275\u0275element(22, "rect", 16);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(23, "rect", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(24, "div", 18)(25, "div", 19)(26, "div");
        \u0275\u0275text(27, "Welcome to");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "div");
        \u0275\u0275text(29, "our community");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "div", 20);
        \u0275\u0275text(31, " Fuse helps developers to build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "div", 21)(33, "div", 22);
        \u0275\u0275element(34, "img", 23)(35, "img", 24)(36, "img", 25)(37, "img", 26);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "div", 27);
        \u0275\u0275text(39, " More than 17k people joined us, it's your turn ");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(1, _c0));
      }
    }, dependencies: [RouterLink], encapsulation: 2, data: { animation: fuseAnimations } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthConfirmationRequiredComponent, { className: "AuthConfirmationRequiredComponent", filePath: "src/app/modules/auth/confirmation-required/confirmation-required.component.ts", lineNumber: 12 });
})();

// src/app/modules/auth/confirmation-required/confirmation-required.routes.ts
var confirmation_required_routes_default = [
  {
    path: "",
    component: AuthConfirmationRequiredComponent
  }
];
export {
  confirmation_required_routes_default as default
};
//# sourceMappingURL=chunk-E4WB7B7D.js.map
