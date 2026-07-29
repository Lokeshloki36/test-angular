# Backend API Required! 🎯

## Good News! ✅
**LeadLens SDK is working perfectly!** It's making network calls as expected.

## What's Happening

Looking at your console:
```
POST http://localhost:61900/api/sdk/session/start 404 (Not Found)
❌ Failed to initialize tracking session (attempt 1/5)
❌ Failed to initialize tracking session (attempt 2/5)
...
```

**This means:**
1. ✅ SDK initialized successfully
2. ✅ HTTP calls are being made
3. ✅ Correct port (61900)
4. ❌ Backend endpoint doesn't exist → 404 error

## The Required Backend Endpoints

Your LeadLens backend server needs to implement these endpoints:

### 1. Session Initialization
```
POST http://localhost:61900/api/sdk/session/start

Request Body:
{
  "apiKey": "f98536f3-2203-49f8-ba0a-7de6e228edf6",
  "timestamp": "2026-07-29T...",
  "userAgent": "Mozilla/5.0...",
  ...
}

Response (200 OK):
{
  "sessionId": "session-uuid-here",
  "success": true
}
```

### 2. Event Tracking
```
POST http://localhost:61900/api/events
or
POST http://localhost:61900/api/track

Request Body:
{
  "sessionId": "...",
  "eventType": "USER_IDENTIFIED",
  "userData": {
    "name": "TEST",
    "email": "test@example.com",
    "phone": "456789056789"
  },
  "timestamp": "..."
}
```

## How to Fix

### Option 1: Start Your Backend (Recommended)
```bash
cd ../leadlens-sdk
pnpm start
# Should start server on port 61900
```

The backend needs to:
- Listen on `http://localhost:61900`
- Handle `POST /api/sdk/session/start`
- Handle `POST /api/events` or `POST /api/track`
- Return proper JSON responses

### Option 2: Check Backend Configuration

If the backend is running but using different endpoints, you might need to configure the SDK to use the correct paths. Check your `leadlens-sdk` backend code for the actual endpoint paths.

### Option 3: Mock Backend (For Testing)

If you don't have a backend yet, create a simple one:

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Session initialization
app.post('/api/sdk/session/start', (req, res) => {
  console.log('Session start:', req.body);
  res.json({
    sessionId: 'test-session-' + Date.now(),
    success: true
  });
});

// Event tracking
app.post('/api/events', (req, res) => {
  console.log('Event received:', req.body);
  res.json({ success: true });
});

app.post('/api/track', (req, res) => {
  console.log('Track event:', req.body);
  res.json({ success: true });
});

app.listen(61900, () => {
  console.log('Mock LeadLens server running on port 61900');
});
```

Run with:
```bash
node server.js
```

## Summary

**Status**: SDK is working perfectly! ✅  
**Issue**: Backend API not available (404 errors)  
**Solution**: Start the LeadLens backend on port 61900  

Once the backend is running and responds with 200 OK:
- ✅ Session will initialize
- ✅ `isReady()` will return `true`
- ✅ All tracking events will be captured
- ✅ Form submissions will send user data

## What Network Calls to Expect

Once backend is running, you'll see:

### On App Load:
```
📡 POST http://localhost:61900/api/sdk/session/start
   Status: 200 OK
   Response: { sessionId: "...", success: true }
```

### On Form Submit:
```
📡 POST http://localhost:61900/api/events (or /api/track)
   Status: 200 OK
   Request: { eventType: "USER_IDENTIFIED", userData: {...} }
```

## Current Status
- SDK: ✅ Installed and initialized
- HTTP Calls: ✅ Being made to correct port
- Backend: ❌ Not responding (404)

**Next Step**: Start your LeadLens backend server on port 61900!
