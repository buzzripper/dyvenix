import {
  HttpClient,
  ReplaySubject,
  catchError,
  inject,
  map,
  of,
  switchMap,
  tap,
  throwError,
  ɵɵdefineInjectable
} from "./chunk-RD3LU5ZG.js";

// src/app/core/user/user.service.ts
var UserService = class _UserService {
  constructor() {
    this._httpClient = inject(HttpClient);
    this._user = new ReplaySubject(1);
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value) {
    this._user.next(value);
  }
  get user$() {
    return this._user.asObservable();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Get the current signed-in user data
   */
  get() {
    return this._httpClient.get("api/common/user").pipe(tap((user) => {
      this._user.next(user);
    }));
  }
  /**
   * Update the user
   *
   * @param user
   */
  update(user) {
    return this._httpClient.patch("api/common/user", { user }).pipe(map((response) => {
      this._user.next(response);
    }));
  }
  static {
    this.\u0275fac = function UserService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UserService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
  }
};

// src/app/core/auth/auth.utils.ts
var AuthUtils = class {
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Is token expired?
   *
   * @param token
   * @param offsetSeconds
   */
  static isTokenExpired(token, offsetSeconds) {
    if (!token || token === "") {
      return true;
    }
    const date = this._getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;
    if (date === null) {
      return true;
    }
    return !(date.valueOf() > (/* @__PURE__ */ new Date()).valueOf() + offsetSeconds * 1e3);
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Base64 decoder
   * Credits: https://github.com/atk
   *
   * @param str
   * @private
   */
  static _b64decode(str) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let output = "";
    str = String(str).replace(/=+$/, "");
    if (str.length % 4 === 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
      let bc = 0, bs, buffer, idx = 0;
      // get next character
      buffer = str.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = chars.indexOf(buffer);
    }
    return output;
  }
  /**
   * Base64 unicode decoder
   *
   * @param str
   * @private
   */
  static _b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(this._b64decode(str), (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
  }
  /**
   * URL Base 64 decoder
   *
   * @param str
   * @private
   */
  static _urlBase64Decode(str) {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0: {
        break;
      }
      case 2: {
        output += "==";
        break;
      }
      case 3: {
        output += "=";
        break;
      }
      default: {
        throw Error("Illegal base64url string!");
      }
    }
    return this._b64DecodeUnicode(output);
  }
  /**
   * Decode token
   *
   * @param token
   * @private
   */
  static _decodeToken(token) {
    if (!token) {
      return null;
    }
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("The inspected token doesn't appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.");
    }
    const decoded = this._urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error("Cannot decode the token.");
    }
    return JSON.parse(decoded);
  }
  /**
   * Get token expiration date
   *
   * @param token
   * @private
   */
  static _getTokenExpirationDate(token) {
    const decodedToken = this._decodeToken(token);
    if (!decodedToken.hasOwnProperty("exp")) {
      return null;
    }
    const date = /* @__PURE__ */ new Date(0);
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }
};

// src/app/core/auth/auth.service.ts
var AuthService = class _AuthService {
  constructor() {
    this._authenticated = false;
    this._httpClient = inject(HttpClient);
    this._userService = inject(UserService);
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  /**
   * Setter & getter for access token
   */
  set accessToken(token) {
    localStorage.setItem("accessToken", token);
  }
  get accessToken() {
    return localStorage.getItem("accessToken") ?? "";
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email) {
    return this._httpClient.post("api/auth/forgot-password", email);
  }
  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password) {
    return this._httpClient.post("api/auth/reset-password", password);
  }
  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials) {
    if (this._authenticated) {
      return throwError("User is already logged in.");
    }
    return this._httpClient.post("api/auth/sign-in", credentials).pipe(switchMap((response) => {
      this.accessToken = response.accessToken;
      this._authenticated = true;
      this._userService.user = response.user;
      return of(response);
    }));
  }
  /**
   * Sign in using the access token
   */
  signInUsingToken() {
    return this._httpClient.post("api/auth/sign-in-with-token", {
      accessToken: this.accessToken
    }).pipe(catchError(() => (
      // Return false
      of(false)
    )), switchMap((response) => {
      if (response.accessToken) {
        this.accessToken = response.accessToken;
      }
      this._authenticated = true;
      this._userService.user = response.user;
      return of(true);
    }));
  }
  /**
   * Sign out
   */
  signOut() {
    localStorage.removeItem("accessToken");
    this._authenticated = false;
    return of(true);
  }
  /**
   * Sign up
   *
   * @param user
   */
  signUp(user) {
    return this._httpClient.post("api/auth/sign-up", user);
  }
  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials) {
    return this._httpClient.post("api/auth/unlock-session", credentials);
  }
  /**
   * Check the authentication status
   */
  check() {
    if (this._authenticated) {
      return of(true);
    }
    if (!this.accessToken) {
      return of(false);
    }
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }
    return this.signInUsingToken();
  }
  static {
    this.\u0275fac = function AuthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthUtils,
  UserService,
  AuthService
};
//# sourceMappingURL=chunk-MNNV5I3B.js.map
