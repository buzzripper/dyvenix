import {
  FuseUtilsService
} from "./chunk-QBGRN5J4.js";
import {
  MatButtonModule,
  MatCommonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  coerceBooleanProperty
} from "./chunk-MBEWGW4P.js";
import {
  fuseAnimations
} from "./chunk-MRHFANNG.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  InjectionToken,
  Input,
  NgModule,
  NgTemplateOutlet,
  ReplaySubject,
  Subject,
  ViewChild,
  ViewEncapsulation,
  filter,
  inject,
  numberAttribute,
  setClassMetadata,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵviewQuery
} from "./chunk-RD3LU5ZG.js";

// node_modules/@angular/material/fesm2022/progress-spinner.mjs
var _c0 = ["determinateSpinner"];
function MatProgressSpinner_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 11);
    \u0275\u0275element(1, "circle", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("viewBox", ctx_r0._viewBox());
    \u0275\u0275advance();
    \u0275\u0275styleProp("stroke-dasharray", ctx_r0._strokeCircumference(), "px")("stroke-dashoffset", ctx_r0._strokeCircumference() / 2, "px")("stroke-width", ctx_r0._circleStrokeWidth(), "%");
    \u0275\u0275attribute("r", ctx_r0._circleRadius());
  }
}
var MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS = new InjectionToken("mat-progress-spinner-default-options", {
  providedIn: "root",
  factory: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY
});
function MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY() {
  return {
    diameter: BASE_SIZE
  };
}
var BASE_SIZE = 100;
var BASE_STROKE_WIDTH = 10;
var MatProgressSpinner = class _MatProgressSpinner {
  _elementRef = inject(ElementRef);
  /** Whether the _mat-animation-noopable class should be applied, disabling animations.  */
  _noopAnimations;
  // TODO: should be typed as `ThemePalette` but internal apps pass in arbitrary strings.
  /**
   * Theme color of the progress spinner. This API is supported in M2 themes only, it
   * has no effect in M3 themes.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.io/guide/theming#using-component-color-variants.
   */
  get color() {
    return this._color || this._defaultColor;
  }
  set color(value) {
    this._color = value;
  }
  _color;
  _defaultColor = "primary";
  /** The element of the determinate spinner. */
  _determinateCircle;
  constructor() {
    const animationMode = inject(ANIMATION_MODULE_TYPE, {
      optional: true
    });
    const defaults = inject(MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS);
    this._noopAnimations = animationMode === "NoopAnimations" && !!defaults && !defaults._forceAnimations;
    this.mode = this._elementRef.nativeElement.nodeName.toLowerCase() === "mat-spinner" ? "indeterminate" : "determinate";
    if (defaults) {
      if (defaults.color) {
        this.color = this._defaultColor = defaults.color;
      }
      if (defaults.diameter) {
        this.diameter = defaults.diameter;
      }
      if (defaults.strokeWidth) {
        this.strokeWidth = defaults.strokeWidth;
      }
    }
  }
  /**
   * Mode of the progress bar.
   *
   * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
   * 'determinate'.
   * Mirrored to mode attribute.
   */
  mode;
  /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
  get value() {
    return this.mode === "determinate" ? this._value : 0;
  }
  set value(v) {
    this._value = Math.max(0, Math.min(100, v || 0));
  }
  _value = 0;
  /** The diameter of the progress spinner (will set width and height of svg). */
  get diameter() {
    return this._diameter;
  }
  set diameter(size) {
    this._diameter = size || 0;
  }
  _diameter = BASE_SIZE;
  /** Stroke width of the progress spinner. */
  get strokeWidth() {
    return this._strokeWidth ?? this.diameter / 10;
  }
  set strokeWidth(value) {
    this._strokeWidth = value || 0;
  }
  _strokeWidth;
  /** The radius of the spinner, adjusted for stroke width. */
  _circleRadius() {
    return (this.diameter - BASE_STROKE_WIDTH) / 2;
  }
  /** The view box of the spinner's svg element. */
  _viewBox() {
    const viewBox = this._circleRadius() * 2 + this.strokeWidth;
    return `0 0 ${viewBox} ${viewBox}`;
  }
  /** The stroke circumference of the svg circle. */
  _strokeCircumference() {
    return 2 * Math.PI * this._circleRadius();
  }
  /** The dash offset of the svg circle. */
  _strokeDashOffset() {
    if (this.mode === "determinate") {
      return this._strokeCircumference() * (100 - this._value) / 100;
    }
    return null;
  }
  /** Stroke width of the circle in percent. */
  _circleStrokeWidth() {
    return this.strokeWidth / this.diameter * 100;
  }
  static \u0275fac = function MatProgressSpinner_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatProgressSpinner)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatProgressSpinner,
    selectors: [["mat-progress-spinner"], ["mat-spinner"]],
    viewQuery: function MatProgressSpinner_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._determinateCircle = _t.first);
      }
    },
    hostAttrs: ["role", "progressbar", "tabindex", "-1", 1, "mat-mdc-progress-spinner", "mdc-circular-progress"],
    hostVars: 18,
    hostBindings: function MatProgressSpinner_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-valuemin", 0)("aria-valuemax", 100)("aria-valuenow", ctx.mode === "determinate" ? ctx.value : null)("mode", ctx.mode);
        \u0275\u0275classMap("mat-" + ctx.color);
        \u0275\u0275styleProp("width", ctx.diameter, "px")("height", ctx.diameter, "px")("--mdc-circular-progress-size", ctx.diameter + "px")("--mdc-circular-progress-active-indicator-width", ctx.diameter + "px");
        \u0275\u0275classProp("_mat-animation-noopable", ctx._noopAnimations)("mdc-circular-progress--indeterminate", ctx.mode === "indeterminate");
      }
    },
    inputs: {
      color: "color",
      mode: "mode",
      value: [2, "value", "value", numberAttribute],
      diameter: [2, "diameter", "diameter", numberAttribute],
      strokeWidth: [2, "strokeWidth", "strokeWidth", numberAttribute]
    },
    exportAs: ["matProgressSpinner"],
    features: [\u0275\u0275InputTransformsFeature],
    decls: 14,
    vars: 11,
    consts: [["circle", ""], ["determinateSpinner", ""], ["aria-hidden", "true", 1, "mdc-circular-progress__determinate-container"], ["xmlns", "http://www.w3.org/2000/svg", "focusable", "false", 1, "mdc-circular-progress__determinate-circle-graphic"], ["cx", "50%", "cy", "50%", 1, "mdc-circular-progress__determinate-circle"], ["aria-hidden", "true", 1, "mdc-circular-progress__indeterminate-container"], [1, "mdc-circular-progress__spinner-layer"], [1, "mdc-circular-progress__circle-clipper", "mdc-circular-progress__circle-left"], [3, "ngTemplateOutlet"], [1, "mdc-circular-progress__gap-patch"], [1, "mdc-circular-progress__circle-clipper", "mdc-circular-progress__circle-right"], ["xmlns", "http://www.w3.org/2000/svg", "focusable", "false", 1, "mdc-circular-progress__indeterminate-circle-graphic"], ["cx", "50%", "cy", "50%"]],
    template: function MatProgressSpinner_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MatProgressSpinner_ng_template_0_Template, 2, 8, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementStart(2, "div", 2, 1);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(4, "svg", 3);
        \u0275\u0275element(5, "circle", 4);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(6, "div", 5)(7, "div", 6)(8, "div", 7);
        \u0275\u0275elementContainer(9, 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "div", 9);
        \u0275\u0275elementContainer(11, 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 10);
        \u0275\u0275elementContainer(13, 8);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        const circle_r2 = \u0275\u0275reference(1);
        \u0275\u0275advance(4);
        \u0275\u0275attribute("viewBox", ctx._viewBox());
        \u0275\u0275advance();
        \u0275\u0275styleProp("stroke-dasharray", ctx._strokeCircumference(), "px")("stroke-dashoffset", ctx._strokeDashOffset(), "px")("stroke-width", ctx._circleStrokeWidth(), "%");
        \u0275\u0275attribute("r", ctx._circleRadius());
        \u0275\u0275advance(4);
        \u0275\u0275property("ngTemplateOutlet", circle_r2);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngTemplateOutlet", circle_r2);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngTemplateOutlet", circle_r2);
      }
    },
    dependencies: [NgTemplateOutlet],
    styles: [".mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0;position:relative;direction:ltr;transition:opacity 250ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-spinner circle{stroke-width:var(--mdc-circular-progress-active-indicator-width, 4px)}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1;animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mdc-circular-progress-active-indicator-color, var(--mat-sys-primary))}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressSpinner, [{
    type: Component,
    args: [{
      selector: "mat-progress-spinner, mat-spinner",
      exportAs: "matProgressSpinner",
      host: {
        "role": "progressbar",
        "class": "mat-mdc-progress-spinner mdc-circular-progress",
        // set tab index to -1 so screen readers will read the aria-label
        // Note: there is a known issue with JAWS that does not read progressbar aria labels on FireFox
        "tabindex": "-1",
        "[class]": '"mat-" + color',
        "[class._mat-animation-noopable]": `_noopAnimations`,
        "[class.mdc-circular-progress--indeterminate]": 'mode === "indeterminate"',
        "[style.width.px]": "diameter",
        "[style.height.px]": "diameter",
        "[style.--mdc-circular-progress-size]": 'diameter + "px"',
        "[style.--mdc-circular-progress-active-indicator-width]": 'diameter + "px"',
        "[attr.aria-valuemin]": "0",
        "[attr.aria-valuemax]": "100",
        "[attr.aria-valuenow]": 'mode === "determinate" ? value : null',
        "[attr.mode]": "mode"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NgTemplateOutlet],
      template: '<ng-template #circle>\n  <svg [attr.viewBox]="_viewBox()" class="mdc-circular-progress__indeterminate-circle-graphic"\n       xmlns="http://www.w3.org/2000/svg" focusable="false">\n    <circle [attr.r]="_circleRadius()"\n            [style.stroke-dasharray.px]="_strokeCircumference()"\n            [style.stroke-dashoffset.px]="_strokeCircumference() / 2"\n            [style.stroke-width.%]="_circleStrokeWidth()"\n            cx="50%" cy="50%"/>\n  </svg>\n</ng-template>\n\n<!--\n  All children need to be hidden for screen readers in order to support ChromeVox.\n  More context in the issue: https://github.com/angular/components/issues/22165.\n-->\n<div class="mdc-circular-progress__determinate-container" aria-hidden="true" #determinateSpinner>\n  <svg [attr.viewBox]="_viewBox()" class="mdc-circular-progress__determinate-circle-graphic"\n       xmlns="http://www.w3.org/2000/svg" focusable="false">\n    <circle [attr.r]="_circleRadius()"\n            [style.stroke-dasharray.px]="_strokeCircumference()"\n            [style.stroke-dashoffset.px]="_strokeDashOffset()"\n            [style.stroke-width.%]="_circleStrokeWidth()"\n            class="mdc-circular-progress__determinate-circle"\n            cx="50%" cy="50%"/>\n  </svg>\n</div>\n<!--TODO: figure out why there are 3 separate svgs-->\n<div class="mdc-circular-progress__indeterminate-container" aria-hidden="true">\n  <div class="mdc-circular-progress__spinner-layer">\n    <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">\n      <ng-container [ngTemplateOutlet]="circle"></ng-container>\n    </div>\n    <div class="mdc-circular-progress__gap-patch">\n      <ng-container [ngTemplateOutlet]="circle"></ng-container>\n    </div>\n    <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">\n      <ng-container [ngTemplateOutlet]="circle"></ng-container>\n    </div>\n  </div>\n</div>\n',
      styles: [".mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0;position:relative;direction:ltr;transition:opacity 250ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-spinner circle{stroke-width:var(--mdc-circular-progress-active-indicator-width, 4px)}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1;animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mdc-circular-progress-active-indicator-color, var(--mat-sys-primary))}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}"]
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    _determinateCircle: [{
      type: ViewChild,
      args: ["determinateSpinner"]
    }],
    mode: [{
      type: Input
    }],
    value: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    diameter: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    strokeWidth: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }]
  });
})();
var MatSpinner = MatProgressSpinner;
var MatProgressSpinnerModule = class _MatProgressSpinnerModule {
  static \u0275fac = function MatProgressSpinnerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatProgressSpinnerModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatProgressSpinnerModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressSpinnerModule, [{
    type: NgModule,
    args: [{
      imports: [MatProgressSpinner, MatSpinner],
      exports: [MatProgressSpinner, MatSpinner, MatCommonModule]
    }]
  }], null, null);
})();

// src/@fuse/components/alert/alert.service.ts
var FuseAlertService = class _FuseAlertService {
  constructor() {
    this._onDismiss = new ReplaySubject(1);
    this._onShow = new ReplaySubject(1);
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  /**
   * Getter for onDismiss
   */
  get onDismiss() {
    return this._onDismiss.asObservable();
  }
  /**
   * Getter for onShow
   */
  get onShow() {
    return this._onShow.asObservable();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Dismiss the alert
   *
   * @param name
   */
  dismiss(name) {
    if (!name) {
      return;
    }
    this._onDismiss.next(name);
  }
  /**
   * Show the dismissed alert
   *
   * @param name
   */
  show(name) {
    if (!name) {
      return;
    }
    this._onShow.next(name);
  }
  static {
    this.\u0275fac = function FuseAlertService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FuseAlertService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FuseAlertService, factory: _FuseAlertService.\u0275fac, providedIn: "root" });
  }
};

// src/@fuse/components/alert/alert.component.ts
var _c02 = [[["", "fuseAlertTitle", ""]], "*", [["", "fuseAlertIcon", ""]]];
var _c1 = ["[fuseAlertTitle]", "*", "[fuseAlertIcon]"];
function FuseAlertComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 1);
  }
}
function FuseAlertComponent_Conditional_0_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 7);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:check-circle");
  }
}
function FuseAlertComponent_Conditional_0_Conditional_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 7);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:check-circle");
  }
}
function FuseAlertComponent_Conditional_0_Conditional_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 7);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:x-circle");
  }
}
function FuseAlertComponent_Conditional_0_Conditional_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 7);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:check-circle");
  }
}
function FuseAlertComponent_Conditional_0_Conditional_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 7);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:information-circle");
  }
}
function FuseAlertComponent_Conditional_0_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 7);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:check-circle");
  }
}
function FuseAlertComponent_Conditional_0_Conditional_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 7);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:exclamation-triangle");
  }
}
function FuseAlertComponent_Conditional_0_Conditional_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 7);
  }
  if (rf & 2) {
    \u0275\u0275property("svgIcon", "heroicons_solid:x-circle");
  }
}
function FuseAlertComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 8);
    \u0275\u0275projection(2, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 9);
    \u0275\u0275template(4, FuseAlertComponent_Conditional_0_Conditional_2_Conditional_4_Template, 1, 1, "mat-icon", 7)(5, FuseAlertComponent_Conditional_0_Conditional_2_Conditional_5_Template, 1, 1, "mat-icon", 7)(6, FuseAlertComponent_Conditional_0_Conditional_2_Conditional_6_Template, 1, 1, "mat-icon", 7)(7, FuseAlertComponent_Conditional_0_Conditional_2_Conditional_7_Template, 1, 1, "mat-icon", 7)(8, FuseAlertComponent_Conditional_0_Conditional_2_Conditional_8_Template, 1, 1, "mat-icon", 7)(9, FuseAlertComponent_Conditional_0_Conditional_2_Conditional_9_Template, 1, 1, "mat-icon", 7)(10, FuseAlertComponent_Conditional_0_Conditional_2_Conditional_10_Template, 1, 1, "mat-icon", 7)(11, FuseAlertComponent_Conditional_0_Conditional_2_Conditional_11_Template, 1, 1, "mat-icon", 7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.type === "primary" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.type === "accent" ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.type === "warn" ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.type === "basic" ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.type === "info" ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.type === "success" ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.type === "warning" ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.type === "error" ? 11 : -1);
  }
}
function FuseAlertComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275template(1, FuseAlertComponent_Conditional_0_Conditional_1_Template, 1, 0, "div", 1)(2, FuseAlertComponent_Conditional_0_Conditional_2_Template, 12, 8, "div", 2);
    \u0275\u0275elementStart(3, "div", 3)(4, "div", 4);
    \u0275\u0275projection(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 5);
    \u0275\u0275projection(7, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 6);
    \u0275\u0275listener("click", function FuseAlertComponent_Conditional_0_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismiss());
    });
    \u0275\u0275element(9, "mat-icon", 7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("@fadeIn", !ctx_r1.dismissed)("@fadeOut", !ctx_r1.dismissed);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.appearance === "border" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showIcon ? 2 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275property("svgIcon", "heroicons_solid:x-mark");
  }
}
var FuseAlertComponent = class _FuseAlertComponent {
  constructor() {
    this._changeDetectorRef = inject(ChangeDetectorRef);
    this._fuseAlertService = inject(FuseAlertService);
    this._fuseUtilsService = inject(FuseUtilsService);
    this.appearance = "soft";
    this.dismissed = false;
    this.dismissible = false;
    this.name = this._fuseUtilsService.randomId();
    this.showIcon = true;
    this.type = "primary";
    this.dismissedChanged = new EventEmitter();
    this._unsubscribeAll = new Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  /**
   * Host binding for component classes
   */
  get classList() {
    return {
      "fuse-alert-appearance-border": this.appearance === "border",
      "fuse-alert-appearance-fill": this.appearance === "fill",
      "fuse-alert-appearance-outline": this.appearance === "outline",
      "fuse-alert-appearance-soft": this.appearance === "soft",
      "fuse-alert-dismissed": this.dismissed,
      "fuse-alert-dismissible": this.dismissible,
      "fuse-alert-show-icon": this.showIcon,
      "fuse-alert-type-primary": this.type === "primary",
      "fuse-alert-type-accent": this.type === "accent",
      "fuse-alert-type-warn": this.type === "warn",
      "fuse-alert-type-basic": this.type === "basic",
      "fuse-alert-type-info": this.type === "info",
      "fuse-alert-type-success": this.type === "success",
      "fuse-alert-type-warning": this.type === "warning",
      "fuse-alert-type-error": this.type === "error"
    };
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes) {
    if ("dismissed" in changes) {
      this.dismissed = coerceBooleanProperty(changes.dismissed.currentValue);
      this._toggleDismiss(this.dismissed);
    }
    if ("dismissible" in changes) {
      this.dismissible = coerceBooleanProperty(changes.dismissible.currentValue);
    }
    if ("showIcon" in changes) {
      this.showIcon = coerceBooleanProperty(changes.showIcon.currentValue);
    }
  }
  /**
   * On init
   */
  ngOnInit() {
    this._fuseAlertService.onDismiss.pipe(filter((name) => this.name === name), takeUntil(this._unsubscribeAll)).subscribe(() => {
      this.dismiss();
    });
    this._fuseAlertService.onShow.pipe(filter((name) => this.name === name), takeUntil(this._unsubscribeAll)).subscribe(() => {
      this.show();
    });
  }
  /**
   * On destroy
   */
  ngOnDestroy() {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Dismiss the alert
   */
  dismiss() {
    if (this.dismissed) {
      return;
    }
    this._toggleDismiss(true);
  }
  /**
   * Show the dismissed alert
   */
  show() {
    if (!this.dismissed) {
      return;
    }
    this._toggleDismiss(false);
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Dismiss/show the alert
   *
   * @param dismissed
   * @private
   */
  _toggleDismiss(dismissed) {
    if (!this.dismissible) {
      return;
    }
    this.dismissed = dismissed;
    this.dismissedChanged.next(this.dismissed);
    this._changeDetectorRef.markForCheck();
  }
  static {
    this.\u0275fac = function FuseAlertComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FuseAlertComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FuseAlertComponent, selectors: [["fuse-alert"]], hostVars: 2, hostBindings: function FuseAlertComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classMap(ctx.classList);
      }
    }, inputs: { appearance: "appearance", dismissed: "dismissed", dismissible: "dismissible", name: "name", showIcon: "showIcon", type: "type" }, outputs: { dismissedChanged: "dismissedChanged" }, exportAs: ["fuseAlert"], features: [\u0275\u0275NgOnChangesFeature], ngContentSelectors: _c1, decls: 1, vars: 1, consts: [[1, "fuse-alert-container"], [1, "fuse-alert-border"], [1, "fuse-alert-icon"], [1, "fuse-alert-content"], [1, "fuse-alert-title"], [1, "fuse-alert-message"], ["mat-icon-button", "", 1, "fuse-alert-dismiss-button", 3, "click"], [3, "svgIcon"], [1, "fuse-alert-custom-icon"], [1, "fuse-alert-default-icon"]], template: function FuseAlertComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c02);
        \u0275\u0275template(0, FuseAlertComponent_Conditional_0_Template, 10, 5, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(!ctx.dismissible || ctx.dismissible && !ctx.dismissed ? 0 : -1);
      }
    }, dependencies: [MatIconModule, MatIcon, MatButtonModule, MatIconButton], styles: ["/* src/@fuse/components/alert/alert.component.scss */\nfuse-alert {\n  display: block;\n}\nfuse-alert .fuse-alert-container {\n  position: relative;\n  display: flex;\n  padding: 16px;\n  font-size: 14px;\n  line-height: 1;\n}\nfuse-alert .fuse-alert-container .mat-icon {\n  color: currentColor !important;\n}\nfuse-alert .fuse-alert-container .fuse-alert-icon {\n  display: flex;\n  align-items: flex-start;\n}\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-custom-icon,\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-default-icon {\n  display: none;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n}\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-custom-icon:not(:empty),\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-default-icon:not(:empty) {\n  display: flex;\n  margin-right: 12px;\n}\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-default-icon .mat-icon {\n  width: 1.25rem;\n  height: 1.25rem;\n  min-width: 1.25rem;\n  min-height: 1.25rem;\n  font-size: 1.25rem;\n  line-height: 1.25rem;\n}\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-default-icon .mat-icon svg {\n  width: 1.25rem;\n  height: 1.25rem;\n}\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-custom-icon {\n  display: none;\n}\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-custom-icon:not(:empty) {\n  display: flex;\n}\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-custom-icon:not(:empty) + .fuse-alert-default-icon {\n  display: none;\n}\nfuse-alert .fuse-alert-container .fuse-alert-content {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  line-height: 1;\n}\nfuse-alert .fuse-alert-container .fuse-alert-content .fuse-alert-title {\n  display: none;\n  font-weight: 600;\n  line-height: 20px;\n}\nfuse-alert .fuse-alert-container .fuse-alert-content .fuse-alert-title:not(:empty) {\n  display: block;\n}\nfuse-alert .fuse-alert-container .fuse-alert-content .fuse-alert-title:not(:empty) + .fuse-alert-message:not(:empty) {\n  margin-top: 4px;\n}\nfuse-alert .fuse-alert-container .fuse-alert-content .fuse-alert-message {\n  display: none;\n  line-height: 20px;\n}\nfuse-alert .fuse-alert-container .fuse-alert-content .fuse-alert-message:not(:empty) {\n  display: block;\n}\nfuse-alert .fuse-alert-container .fuse-alert-dismiss-button {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  width: 32px !important;\n  min-width: 32px !important;\n  height: 32px !important;\n  min-height: 32px !important;\n  line-height: 32px !important;\n}\nfuse-alert .fuse-alert-container .fuse-alert-dismiss-button .mat-icon {\n  width: 1rem;\n  height: 1rem;\n  min-width: 1rem;\n  min-height: 1rem;\n  font-size: 1rem;\n  line-height: 1rem;\n}\nfuse-alert .fuse-alert-container .fuse-alert-dismiss-button .mat-icon svg {\n  width: 1rem;\n  height: 1rem;\n}\nfuse-alert.fuse-alert-dismissible .fuse-alert-container .fuse-alert-content {\n  margin-right: 32px;\n}\nfuse-alert:not(.fuse-alert-dismissible) .fuse-alert-container .fuse-alert-dismiss-button {\n  display: none !important;\n}\nfuse-alert.fuse-alert-appearance-border {\n}\nfuse-alert.fuse-alert-appearance-border .fuse-alert-container {\n  position: relative;\n  overflow: hidden;\n  border-radius: 6px;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-bg-card-rgb), var(--tw-bg-opacity));\n  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow, 0 0 #0000),\n    var(--tw-ring-shadow, 0 0 #0000),\n    var(--tw-shadow);\n}\nfuse-alert.fuse-alert-appearance-border .fuse-alert-container .fuse-alert-border {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 4px;\n}\nfuse-alert.fuse-alert-appearance-border .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(71 85 105 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-rgb), var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-rgb), var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-400-rgb), var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-400-rgb), var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(203 213 225 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-rgb), var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-rgb), var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-400-rgb), var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-400-rgb), var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(203 213 225 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-rgb), var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-rgb), var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-400-rgb), var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-400-rgb), var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(203 213 225 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(71 85 105 / var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(71 85 105 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(148 163 184 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(203 213 225 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(29 78 216 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(96 165 250 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(96 165 250 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(203 213 225 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(34 197 94 / var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(34 197 94 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(74 222 128 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(74 222 128 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(203 213 225 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(245 158 11 / var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(245 158 11 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(251 191 36 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(251 191 36 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(203 213 225 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(220 38 38 / var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(185 28 28 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(248 113 113 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(248 113 113 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(203 213 225 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill {\n}\nfuse-alert.fuse-alert-appearance-fill .fuse-alert-container {\n  border-radius: 6px;\n}\nfuse-alert.fuse-alert-appearance-fill .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-primary .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-600-rgb), var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-primary .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-primary .fuse-alert-container .fuse-alert-title {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-primary .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-100-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-primary .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-200-rgb), var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-800-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-accent .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-600-rgb), var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-accent .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-accent .fuse-alert-container .fuse-alert-title {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-accent .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-100-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-accent .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-200-rgb), var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-800-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warn .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-600-rgb), var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warn .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warn .fuse-alert-container .fuse-alert-title {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warn .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-100-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warn .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-200-rgb), var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-800-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-basic .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(71 85 105 / var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-basic .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-basic .fuse-alert-container .fuse-alert-title {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-basic .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(241 245 249 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-basic .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(226 232 240 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-info .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-info .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-info .fuse-alert-container .fuse-alert-title {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-info .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(219 234 254 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-info .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(191 219 254 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(30 64 175 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-success .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(22 163 74 / var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-success .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-success .fuse-alert-container .fuse-alert-title {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-success .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(220 252 231 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-success .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(187 247 208 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warning .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(245 158 11 / var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warning .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warning .fuse-alert-container .fuse-alert-title {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warning .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(254 243 199 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warning .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(253 230 138 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(146 64 14 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-error .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(220 38 38 / var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-error .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-error .fuse-alert-container .fuse-alert-title {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-error .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(254 226 226 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-error .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(254 202 202 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(153 27 27 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline {\n}\nfuse-alert.fuse-alert-appearance-outline .fuse-alert-container {\n  border-radius: 6px;\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-50-rgb), var(--tw-bg-opacity, 1));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow),\n    var(--tw-ring-shadow),\n    var(--tw-shadow, 0 0 #0000);\n  --tw-ring-inset: inset;\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgba(var(--fuse-primary-400-rgb), var(--tw-ring-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-600-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-900-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-700-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-200-rgb), var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-800-rgb), var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-600-rgb), var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-200-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-100-rgb), var(--tw-bg-opacity, 1));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow),\n    var(--tw-ring-shadow),\n    var(--tw-shadow, 0 0 #0000);\n  --tw-ring-inset: inset;\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgba(var(--fuse-accent-400-rgb), var(--tw-ring-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-600-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-900-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-700-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-200-rgb), var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-800-rgb), var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-600-rgb), var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-200-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-50-rgb), var(--tw-bg-opacity, 1));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow),\n    var(--tw-ring-shadow),\n    var(--tw-shadow, 0 0 #0000);\n  --tw-ring-inset: inset;\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgba(var(--fuse-warn-400-rgb), var(--tw-ring-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-600-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-900-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-700-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-200-rgb), var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-800-rgb), var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-600-rgb), var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-200-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(241 245 249 / var(--tw-bg-opacity, 1));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow),\n    var(--tw-ring-shadow),\n    var(--tw-shadow, 0 0 #0000);\n  --tw-ring-inset: inset;\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(148 163 184 / var(--tw-ring-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(71 85 105 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(15 23 42 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(51 65 85 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(226 232 240 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(71 85 105 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(226 232 240 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow),\n    var(--tw-ring-shadow),\n    var(--tw-shadow, 0 0 #0000);\n  --tw-ring-inset: inset;\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(96 165 250 / var(--tw-ring-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(37 99 235 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(30 58 138 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(29 78 216 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(191 219 254 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(30 64 175 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(191 219 254 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(240 253 244 / var(--tw-bg-opacity, 1));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow),\n    var(--tw-ring-shadow),\n    var(--tw-shadow, 0 0 #0000);\n  --tw-ring-inset: inset;\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(74 222 128 / var(--tw-ring-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(22 163 74 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(20 83 45 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(21 128 61 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(187 247 208 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(22 101 52 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(22 163 74 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(187 247 208 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 251 235 / var(--tw-bg-opacity, 1));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow),\n    var(--tw-ring-shadow),\n    var(--tw-shadow, 0 0 #0000);\n  --tw-ring-inset: inset;\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(251 191 36 / var(--tw-ring-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(217 119 6 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(120 53 15 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(180 83 9 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(253 230 138 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(146 64 14 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(217 119 6 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(253 230 138 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(254 242 242 / var(--tw-bg-opacity, 1));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow),\n    var(--tw-ring-shadow),\n    var(--tw-shadow, 0 0 #0000);\n  --tw-ring-inset: inset;\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(248 113 113 / var(--tw-ring-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(220 38 38 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(127 29 29 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(185 28 28 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(254 202 202 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(153 27 27 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(220 38 38 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(254 202 202 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft {\n}\nfuse-alert.fuse-alert-appearance-soft .fuse-alert-container {\n  border-radius: 6px;\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-50-rgb), var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-600-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-900-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-700-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-200-rgb), var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-800-rgb), var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-600-rgb), var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-200-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-100-rgb), var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-600-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-900-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-700-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-200-rgb), var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-800-rgb), var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-600-rgb), var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-200-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-50-rgb), var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-600-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-900-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-700-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-200-rgb), var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-800-rgb), var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-600-rgb), var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-200-rgb), var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(241 245 249 / var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(71 85 105 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(15 23 42 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(51 65 85 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(226 232 240 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(71 85 105 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(226 232 240 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(37 99 235 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(30 58 138 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(29 78 216 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(191 219 254 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(30 64 175 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(191 219 254 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(240 253 244 / var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(22 163 74 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(20 83 45 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(21 128 61 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(187 247 208 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(22 101 52 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(22 163 74 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(187 247 208 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 251 235 / var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(217 119 6 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(120 53 15 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(180 83 9 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(253 230 138 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(146 64 14 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(217 119 6 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(253 230 138 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(254 242 242 / var(--tw-bg-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(220 38 38 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container .fuse-alert-title,\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(127 29 29 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(185 28 28 / var(--tw-text-opacity, 1));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(254 202 202 / var(--tw-bg-opacity, 1));\n  --tw-text-opacity: 1;\n  color: rgb(153 27 27 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(220 38 38 / var(--tw-bg-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container .fuse-alert-title,\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(254 202 202 / var(--tw-text-opacity, 1));\n}\n/*# sourceMappingURL=alert.component.css.map */\n"], encapsulation: 2, data: { animation: fuseAnimations }, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FuseAlertComponent, { className: "FuseAlertComponent", filePath: "src/@fuse/components/alert/alert.component.ts", lineNumber: 39 });
})();

export {
  MatProgressSpinner,
  MatProgressSpinnerModule,
  FuseAlertComponent
};
//# sourceMappingURL=chunk-NCX24LGI.js.map
