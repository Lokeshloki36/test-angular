# LeadLens Network Calls - What You'll See 🔍

## Which Package Makes the HTTP Calls?

### Package Structure
```
Your Angular App
    ↓
@leadlens-sdk/angular (v1.0.1) ← You installed this
    ↓ depends on
@leadlens-sdk/core (v1.0.0) ← This makes the HTTP calls
    ↓
HTTP POST → http://localhost:61900
```

## ✅ @leadlens-sdk/core handles ALL network calls

**This package:**
- ✅ Makes HTTP POST requests
- ✅ Sends tracking events to your API
- ✅ Manages event queue
- ✅ Handles retries and batching

## What You'll See in Browser DevTools

### 1. Open Network Tab (F12 → Network)

### 2. Fill the Contact Form
When you fill and submit the contact form, you should see:

```
📡 POST http://localhost:61900/api/events
   Status: 200 OK (if your backend is running)
   Status: Failed (if backend is not running)
```

### 3. Request Details

**URL**: `http://localhost:61900/api/events` (or similar endpoint)

**Method**: `POST`

**Headers**:
```
Content-Type: application/json
Authorization: Bearer f98536f3-2203-49f8-ba0a-7de6e228edf6
```

**Request Body** (example):
```json
{
  "eventType": "FORM_SUBMIT",
  "userId": "user-session-id",
  "userData": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "timestamp": "2026-07-29T12:45:00.000Z",
  "metadata": {
    "formId": "contact-form",
    "url": "http://localhost:4200/contact"
  }
}
```

## When Do Network Calls Happen?

### Automatic Tracking (if enabled)
1. **Page View** → POST on page load
2. **Click Events** → POST when user clicks (if trackClicks: true)
3. **Scroll Depth** → POST when user scrolls (if trackScrollDepth: true)
4. **Form Interactions** → POST when form fields change (if trackForms: true)

### Manual Tracking (your code)
5. **User Identification** → POST when you call `leadLens.identify()`
   ```typescript
   this.leadLens.identify({
     name: this.name,
     email: this.email,
     phone: this.phone
   });
   ```

## Your Current Configuration

```typescript
apiUrl: 'http://localhost:61900' ← Updated to your port!
options: {
  debug: true,              ← Console logs enabled
  trackForms: true,         ← Tracks form interactions
  trackClicks: true,        ← Tracks click events
  trackScrollDepth: true    ← Tracks scroll depth
}
```

## Debug Mode - What You'll See in Console

With `debug: true`, the console will show:

```
[LeadLens] Initialized
[LeadLens] Tracking event: PAGE_VIEW
[LeadLens] Sending to: http://localhost:61900
[LeadLens] User identified: john@example.com
[LeadLens] Event sent successfully
```

## Testing Checklist

### ✅ Without Backend Running (Port 61900)
- Network call appears in DevTools
- Request shows as **FAILED** or **ERR_CONNECTION_REFUSED**
- Console shows error (if debug: true)

### ✅ With Backend Running (Port 61900)
- Network call appears in DevTools
- Request shows **200 OK** (or appropriate status)
- Console shows success message
- Backend receives the event data

## Quick Test

1. **Start your Angular app**: Already running on 4200
2. **Open DevTools**: Press F12
3. **Go to Network tab**: Click "Network"
4. **Go to Contact page**: Navigate to /contact
5. **Fill the form**: Enter name, email, phone
6. **Click Submit**: Watch the Network tab
7. **Look for**: POST request to `localhost:61900`

## Summary

**Q: Which package makes network calls?**
**A: `@leadlens-sdk/core` (automatically installed with angular package)**

**Q: When will I see network calls?**
**A: Every time you submit the contact form (or any tracked event)**

**Q: What endpoint does it call?**
**A: `http://localhost:61900/api/events` (or similar, based on your backend)**

**Q: Do I need to do anything special?**
**A: No! Just fill and submit the form. The core package handles everything.**

---

**Current Setup**: ✅ Ready to track!
- Angular SDK: v1.0.1
- Core SDK: v1.0.0  
- API URL: http://localhost:61900
- Debug: Enabled
