# Start Your Existing LeadLens Backend 🚀

## The Package is Already Working!

The `@leadlens-sdk/core` package is already making HTTP calls - you can see them in your console:

```
POST http://localhost:61900/api/sdk/session/start - 404
```

This means:
- ✅ Package is working
- ✅ Calls are being made
- ❌ Backend server is not running

## You Don't Need to Implement Anything!

The backend already exists in your `leadlens-sdk` project. You just need to **start it**.

## How to Start the Backend

### Terminal 1: Start Backend (Port 61900)
```bash
cd ../leadlens-sdk
pnpm start
```

This should start the LeadLens API server on port 61900.

### Terminal 2: Your Angular App (Already Running)
```bash
# Already running on port 4200 or 61900 (frontend)
# Keep it running
```

## What Happens When Backend Starts

Once you run `pnpm start` in the leadlens-sdk folder:

1. ✅ Server starts on port 61900
2. ✅ Endpoints `/api/sdk/session/start` become available
3. ✅ SDK will successfully initialize
4. ✅ `isReady()` will return `true`
5. ✅ Form submissions will send data successfully

## Expected Output

When backend is running, your console will show:
```
✅ [LeadLens] Session initialized successfully
✅ [App] isReady(): true
✅ POST http://localhost:61900/api/sdk/session/start - 200 OK
```

## Check If Backend is Running

```bash
# Test if port 61900 is listening
curl http://localhost:61900/api/sdk/session/start
```

Or open in browser:
```
http://localhost:61900
```

## Summary

**You don't need to change any code!**

Just start the backend:
```bash
cd ../leadlens-sdk
pnpm start
```

The package will automatically connect and everything will work.
