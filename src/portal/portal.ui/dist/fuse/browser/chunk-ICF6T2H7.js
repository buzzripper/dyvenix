import {
  MatAnchor,
  MatButtonModule,
  MatIcon,
  MatIconModule
} from "./chunk-MBEWGW4P.js";
import {
  RouterLink,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵtext
} from "./chunk-RD3LU5ZG.js";

// src/app/modules/landing/home/home.component.ts
var LandingHomeComponent = class _LandingHomeComponent {
  /**
   * Constructor
   */
  constructor() {
  }
  static {
    this.\u0275fac = function LandingHomeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LandingHomeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LandingHomeComponent, selectors: [["landing-home"]], decls: 15, vars: 3, consts: [[1, "flex", "h-full", "w-full", "flex-col", "items-center", "justify-center"], [1, "w-full", "max-w-3xl"], [1, "prose", "prose-sm", "mx-auto", "max-w-none"], ["src", "images/logo/logo.svg", "alt", "Logo image", 1, "w-20"], ["mat-flat-button", "", 1, "mt-8", 3, "color", "routerLink"], [1, "ml-2", "icon-size-5", 3, "svgIcon"]], template: function LandingHomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275element(3, "img", 3);
        \u0275\u0275elementStart(4, "h1");
        \u0275\u0275text(5, "Landing Module");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7, " This can be the landing or the welcome page of your application. If you have an SSR (Server Side Rendering) setup, or if you don't need to have Search engine visibility and optimizations, you can even use this page as your primary landing page. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p");
        \u0275\u0275text(9, ` This is a separate "module", it has its own directory and routing setup and also it's completely separated from the actual application. This is also a simple example of a multiple applications setup that uses the same codebase. You can have different entry points and essentially have different applications within the same codebase. `);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div")(11, "a", 4)(12, "span");
        \u0275\u0275text(13, "Launch the App");
        \u0275\u0275elementEnd();
        \u0275\u0275element(14, "mat-icon", 5);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("color", "primary")("routerLink", "/dashboards/project");
        \u0275\u0275advance(3);
        \u0275\u0275property("svgIcon", "heroicons_mini:arrow-long-right");
      }
    }, dependencies: [MatButtonModule, MatAnchor, RouterLink, MatIconModule, MatIcon], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LandingHomeComponent, { className: "LandingHomeComponent", filePath: "src/app/modules/landing/home/home.component.ts", lineNumber: 12 });
})();

// src/app/modules/landing/home/home.routes.ts
var home_routes_default = [
  {
    path: "",
    component: LandingHomeComponent
  }
];
export {
  home_routes_default as default
};
//# sourceMappingURL=chunk-ICF6T2H7.js.map
