import {
  ActivatedRoute,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-RD3LU5ZG.js";

// src/app/modules/admin/example/example.component.ts
var ExampleComponent = class _ExampleComponent {
  constructor(route) {
    this.route = route;
    this.route.queryParamMap.subscribe((params) => {
      const msg = params.get("msg");
      if (!msg)
        this.message = "Hello!";
      else {
        this.message = decodeURIComponent(msg);
      }
    });
  }
  static {
    this.\u0275fac = function ExampleComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ExampleComponent)(\u0275\u0275directiveInject(ActivatedRoute));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExampleComponent, selectors: [["example"]], decls: 4, vars: 1, consts: [[1, "flex", "min-w-0", "flex-auto", "flex-col"], [1, "flex-auto", "p-6", "sm:p-10"], [1, "h-400", "max-h-400", "min-h-400", "rounded-2xl", "border-2", "border-dashed", "border-gray-300"]], template: function ExampleComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275text(3);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.message, " ");
      }
    }, encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExampleComponent, { className: "ExampleComponent", filePath: "src/app/modules/admin/example/example.component.ts", lineNumber: 10 });
})();

// src/app/modules/admin/example/example.routes.ts
var example_routes_default = [
  {
    path: "",
    component: ExampleComponent
  }
];
export {
  example_routes_default as default
};
//# sourceMappingURL=chunk-PLZLO376.js.map
