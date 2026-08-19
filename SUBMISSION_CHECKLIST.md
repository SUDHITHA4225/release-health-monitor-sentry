# Submission Checklist & Final Steps

## ✅ Code & Configuration (Complete)

- ✅ **CRUD API Backend** - Express server with all 5 endpoints
  - GET /api/items (200)
  - GET /api/items/:id (200 or 404)
  - POST /api/items (201)
  - PUT /api/items/:id (200)
  - DELETE /api/items/:id (204)

- ✅ **Sentry SDK Integration** - Both frontend and backend
  - Backend: `@sentry/node` initialized with DSN and release
  - Frontend: `@sentry/react` initialized with DSN and release

- ✅ **Release & Sourcemap Scripts**
  - Backend package.json: `release:create`, `release:upload`, `release:finalize`
  - Frontend package.json: Same scripts + build artifacts

- ✅ **Production Build**
  - Frontend: `npm run build` creates optimized bundle with sourcemaps
  - Build folder: `frontend/build/static/js/`

- ✅ **README Documentation**
  - Setup and running instructions
  - Triggering simulated errors guide
  - Environment variables documentation

## ⏳ Manual Steps Required (Get Sentry Account)

### 1. Create Sentry Account & Project
```
1. Go to https://sentry.io
2. Sign up for free account
3. Create new project → Select "React" → Create
4. Get your DSN from: Settings → Client Keys (SDK)
```

### 2. Create Auth Token
```
Settings → Auth Tokens → Generate New Token
Permissions needed:
  ✓ project:releases
  ✓ project:write
Copy the token value
```

### 3. Install Sentry CLI
```powershell
npm install -g @sentry/cli
```

### 4. Set Environment Variables (Windows PowerShell)
```powershell
$env:SENTRY_DSN = "https://YOUR_KEY@sentry.io/YOUR_PROJECT_ID"
$env:SENTRY_ORG = "your-org-slug"
$env:SENTRY_PROJECT = "your-project-slug"
$env:SENTRY_AUTH_TOKEN = "your-auth-token"
```

### 5. Build Frontend & Create Releases
```powershell
cd c:\Users\laksh\Desktop\release-health-monitor-sentry

# Run the automation script
.\setup-sentry-releases.ps1

# This creates releases: v1.0.0, v1.1.0, v1.1.1
# And uploads sourcemaps automatically
```

### 6. Start Backend & Frontend (Two Terminals)

**Terminal 1 - Backend:**
```powershell
cd backend
npm start
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm start
```

### 7. Capture 7 Required Screenshots

Follow [SENTRY_SETUP.md](SENTRY_SETUP.md) for detailed instructions on:

1. **release-v1.0.0-errors.png** - Click "Throw Exception" + "Reject Promise"
2. **release-v1.1.0-error.png** - Click "Handled Error" 
3. **sourcemap-proof.png** - Open error detail, verify readable stack trace
4. **release-health-enabled.png** - View Releases page with crash-free rates
5. **release-health-comparison.png** - Show v1.1.0 vs v1.1.1 improvement
6. **alert-rule-config.png** - Create alert rule for error spikes
7. **alert-triggered.png** - Trigger alert by clicking errors multiple times

**Save all screenshots to:** `verification/` folder

## 📋 Final Submission Verification

Before submitting, verify all files exist:

```powershell
# Check backend
ls backend/
# Should see: index.js, package.json, test_crud.js, node_modules/

# Check frontend  
ls frontend/
# Should see: src/, public/, build/, package.json, node_modules/

# Check verification folder
ls verification/
# Should see 7 PNG files (not placeholders - real Sentry screenshots)

# Check documentation
ls README.md, SENTRY_SETUP.md
```

## 🚀 Ready to Submit When:

- ✅ All source code is present (backend, frontend)
- ✅ README.md has setup and error trigger instructions
- ✅ Sentry SDKs are initialized in source code
- ✅ All 7 verification screenshots are real (captured from Sentry UI)
- ✅ Screenshots are saved with correct filenames in `verification/`
- ✅ Ran `npm test:crud` successfully (CRUD endpoints work)

## 📦 Submission Package Structure

```
release-health-monitor-sentry/
├── README.md                    # Setup & error trigger instructions
├── SENTRY_SETUP.md             # Detailed Sentry configuration guide
├── setup-sentry-releases.ps1   # Automation script
├── backend/
│   ├── index.js                # Express + Sentry init
│   ├── package.json            # Dependencies + scripts
│   └── test_crud.js            # CRUD test
├── frontend/
│   ├── src/index.js            # React + Sentry init
│   ├── package.json            # Dependencies + scripts
│   ├── build/                  # Production build (with sourcemaps)
│   └── public/
└── verification/
    ├── release-v1.0.0-errors.png
    ├── release-v1.1.0-error.png
    ├── sourcemap-proof.png
    ├── release-health-enabled.png
    ├── release-health-comparison.png
    ├── alert-rule-config.png
    └── alert-triggered.png
```

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| `sentry-cli not found` | Run: `npm install -g @sentry/cli` |
| `SENTRY_DSN not set` | Set env var: `$env:SENTRY_DSN = "..."` |
| `Release already exists` | Use unique version: `rhm-app@1.0.1` |
| `Sourcemaps not uploaded` | Ensure `frontend/build/` exists (run `npm run build`) |
| `Errors not appearing in Sentry` | Wait 30+ seconds, check DSN is correct |

## Next Action

Run this command to start the complete setup:

```powershell
cd c:\Users\laksh\Desktop\release-health-monitor-sentry
.\setup-sentry-releases.ps1
```

Then follow [SENTRY_SETUP.md](SENTRY_SETUP.md) for manual Sentry UI steps.
