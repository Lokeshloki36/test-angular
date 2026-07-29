# Fix for LeadLens Injection Error

## The Problem
The error `inject() must be called from an injection context` means the LeadLens Angular package is trying to use Angular's `inject()` function outside of a valid injection context.

## Root Cause
This is happening in the LeadLens SDK source code itself, not in this test project.

## Solution

### Step 1: Fix the LeadLens SDK Source

Go to the `leadlens-sdk` project and check these files:

1. **packages/angular/src/leadlens.module.ts**
2. **packages/angular/src/leadlens.service.ts**
3. **packages/angular/src/leadlens.providers.ts**

Look for any usage of `inject()` function that's being called at the **top level** or outside of:
- Constructor
- Factory function
- Injection context

### Common Issues to Fix:

#### ❌ WRONG - inject() at module level:
```typescript
const router = inject(Router); // This will fail!

export class LeadLensModule {
  constructor() { }
}
```

#### ✅ CORRECT - inject() in constructor or factory:
```typescript
export class LeadLensModule {
  constructor(
    @Inject(LEADLENS_CONFIG) private config: LeadLensConfig,
    @Optional() private router: Router
  ) { }
}
```

### Step 2: Rebuild the Angular Package

After fixing the source code:

```bash
cd ../leadlens-sdk
pnpm --filter @leadlens-sdk/angular build
```

### Step 3: Test in This Project

After rebuilding, restart the dev server here:

```bash
# In test-angular directory
ng serve
```

## Temporary Workaround (Current Solution)

I've already applied a workaround in this project by:
- Manually providing `LEADLENS_CONFIG` token
- Manually providing `LeadLensService`
- Adding `APP_INITIALIZER` for initialization

This bypasses the problematic `LeadLensModule.forRoot()` method.

**Current app.module.ts configuration:**
```typescript
providers: [
  {
    provide: LEADLENS_CONFIG,
    useValue: { /* config */ }
  },
  LeadLensService,
  {
    provide: APP_INITIALIZER,
    useFactory: initLeadLens,
    deps: [LeadLensService],
    multi: true
  }
]
```

## What to Check in LeadLens SDK

Look for patterns like:
- `const something = inject(SomeService)` at class level
- `inject()` calls in static methods
- `inject()` in module-level code (outside functions/classes)

The fix is usually to:
1. Use constructor injection instead
2. Use `@Inject()` decorator for tokens
3. Move `inject()` calls into factory functions

## Need Help?

If you share the LeadLens module source code, I can point out exactly where the issue is!
