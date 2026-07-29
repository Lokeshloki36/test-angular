# Debug Steps - Finding Network Calls 🔍

## The Issue
You're not seeing network calls to port 61900 when submitting the form.

## The Fix Applied
Added explicit initialization: `leadLensService.init(config)`

## What Changed

### 1. APP_INITIALIZER now calls init()
```typescript
export function initLeadLens(leadLensService: LeadLensService, config: any) {
  return () => {
    leadLensService.init(config);  // ← This was missing!
  };
}
```

### 2. Contact Component checks if ready
```typescript
if (!this.leadLens.isReady()) {
  console.error('LeadLens is not ready!');
  return;
}
```

## Now Test Again

### Step 1: Restart Dev Server
```bash
# Stop current server (Ctrl+C)
ng serve

# Or
pnpm start
```

### Step 2: Open Browser & Console
1. Open: http://localhost:61900/contact (or whatever port)
2. Press F12 to open DevTools
3. Go to **Console** tab first

### Step 3: Check Console Logs
You should see these logs when the app loads:

```
[App] Initializing LeadLens SDK with config: {...}
[App] LeadLens SDK initialized successfully
[App] isReady(): true
[ContactComponent] LeadLens service injected: {...}
[ContactComponent] LeadLens isReady: true
```

✅ If you see these → SDK is initialized correctly  
❌ If you don't see these → There's an initialization error

### Step 4: Go to Network Tab
1. Click on **Network** tab in DevTools
2. Clear it (trash icon) to start fresh

### Step 5: Fill & Submit Form
1. Fill in: Name, Email, Phone
2. Click "Send Gated Inquiry"
3. Watch the Console for:
```
[ContactComponent] Form submitted with data: {...}
[ContactComponent] Calling leadLens.identify()...
[ContactComponent] identify() called successfully
```

### Step 6: Check Network Tab
You should now see:
```
📡 POST http://localhost:61900/api/track (or similar endpoint)
   Request Method: POST
   Status: (depends on if backend is running)
```

## What to Look For in Network Tab

### If Backend is Running on 61900:
- ✅ POST request appears
- ✅ Status: 200 OK
- ✅ Request payload has user data

### If Backend is NOT Running:
- ⚠️ POST request appears
- ❌ Status: Failed / ERR_CONNECTION_REFUSED
- ⚠️ Console shows error

**Both scenarios mean the SDK is working!** The difference is whether the backend receives it.

## Troubleshooting

### No console logs at all?
- Clear browser cache and reload
- Check browser console for errors
- Make sure you restarted the dev server

### Console logs but no network call?
- Check if `isReady()` returns true
- Look for errors when calling `identify()`
- Check the @leadlens-sdk/core implementation

### Network call to wrong port?
- Check `apiUrl` in app.module.ts
- Should be: `http://localhost:61900`

## Quick Verification

Run this in the browser console after the page loads:
```javascript
// Check if LeadLens is initialized
console.log('Window:', window);
// Look for LeadLens-related objects
```

## Next Steps

1. **Restart server**: `ng serve`
2. **Open console**: F12 → Console tab
3. **Check logs**: Look for "[App] Initializing LeadLens"
4. **Submit form**: Fill and submit contact form
5. **Check network**: F12 → Network tab
6. **Look for POST**: Should see request to localhost:61900

If you still don't see network calls after these changes, check:
- Is `@leadlens-sdk/core` making the actual HTTP call?
- Does the core package need additional configuration?
- Are there any errors in the console?
