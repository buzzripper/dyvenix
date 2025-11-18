# Quick Start - Test the Fixed Authentication Flow

## 🚀 Quick Steps

### 1. Stop the BFF if running
```bash
# Press Ctrl+C in the BFF terminal
```

### 2. Close ALL browser windows
This ensures all cookies and sessions are cleared.

### 3. Start BFF
```bash
cd D:\Code\buzzripper\dyvenix\src\bff\bff
dotnet run
```

Wait for: `Now listening on: https://localhost:63952`

### 4. Start Angular (new terminal)
```bash
cd D:\Code\buzzripper\dyvenix\src\ui\Angular
npm start
```

Wait for: `Local: http://localhost:4200/`

### 5. Open Browser with DevTools
1. Open Chrome (fresh window or incognito)
2. Press F12 to open DevTools
3. Go to **Console** tab
4. Navigate to `http://localhost:4200`

## 📊 What to Expect

### Console Logs You Should See:

```
🔒 Auth guard: Checking authentication for: /
🔍 Auth check: Calling BFF /auth/user endpoint...
❌ Auth check: Failed to get user data
🚫 Auth guard: Not authenticated, redirecting to BFF login
```

→ Then you're redirected to Azure login

→ After signing in with Microsoft:

```
🔄 Callback component initialized
🔍 Calling auth check...
✅ Auth check: Received user data
✅ Auth check: Authentication successful
🎯 Navigating to: /dashboards/project
```

→ You land on the dashboard, authenticated!

## ✅ Success Indicators

1. **No infinite redirect loop**
2. **See console logs** showing the authentication flow
3. **Cookie is set**: Check DevTools → Application → Cookies → `localhost` → `.AspNetCore.BFF.Auth`
4. **Dashboard loads** after login
5. **Page refresh keeps you logged in**

## 🐛 If Something Goes Wrong

### Still seeing redirect loop?
Check console logs and see what's failing. Most likely:
- Cookie not being set (check Application → Cookies)
- Cookie not being sent (check Network → /auth/user → Request Headers)
- CORS issue (check Console for CORS errors)

### Share these with me:
1. Full console logs
2. Network tab showing the `/auth/user` request details
3. Cookies set on `localhost` (Application → Cookies)

## 🎯 Key Changes That Fixed the Loop

1. **Cookie SameSite=None**: Allows cookie to work cross-origin
2. **Callback page not protected**: Auth guard skips `/signin-oidc`
3. **Retry logic**: Callback waits for cookie to propagate
4. **No redirect on API 401**: Returns 401 instead of redirecting
5. **Extensive logging**: Shows exactly what's happening

Good luck! 🍀
