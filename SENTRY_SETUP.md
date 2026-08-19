# Sentry Integration Setup Guide

## Prerequisites

1. **Create a Sentry account** at https://sentry.io (free tier available)
2. **Create a new project** in Sentry for React/JavaScript
3. **Get your Sentry DSN** from project settings
4. **Install sentry-cli**: 
   ```bash
   npm install -g @sentry/cli
   ```
5. **Create auth token in Sentry**:
   - Go to Settings → Auth Tokens → Generate New Token
   - Ensure token has `project:releases` and `project:write` permissions

## Environment Setup

Set these environment variables (Windows PowerShell):

```powershell
# Get your DSN from Sentry project settings (Settings → Client Keys)
$env:SENTRY_DSN = "https://YOUR_KEY@sentry.io/YOUR_PROJECT_ID"

# Sentry organization and project names
$env:SENTRY_ORG = "your-org-name"
$env:SENTRY_PROJECT = "your-project-name"

# Your Sentry auth token
$env:SENTRY_AUTH_TOKEN = "your-auth-token-here"
```

## Step-by-Step Instructions

### Step 1: Verify Backend CRUD API
Run the test to ensure all endpoints work:
```bash
cd backend
npm test:crud
```

### Step 2: Create Release v1.0.0
```powershell
cd backend
$env:SENTRY_RELEASE = "rhm-app@1.0.0"
npm run release:create
npm run release:upload
npm run release:finalize
```

### Step 3: Trigger Errors in v1.0.0
1. Start backend: `npm start` (in backend folder)
2. Start frontend: `npm start` (in frontend folder)
3. Trigger **unhandled exception**: Click "Throw Exception" button
4. Trigger **unhandled rejection**: Click "Reject Promise" button
5. Wait 30 seconds for Sentry to process
6. **Capture screenshot**: `verification/release-v1.0.0-errors.png`
   - Show: Sentry Issues dashboard with both error types
   - Verify: Both tagged with release `v1.0.0`

### Step 4: Create Release v1.1.0
```powershell
cd frontend
npm run build

cd ../backend
$env:SENTRY_RELEASE = "rhm-app@1.1.0"
npm run release:create
npm run release:upload
npm run release:finalize
```

### Step 5: Trigger Handled Error in v1.1.0
1. Keep backend & frontend running
2. Refresh browser to load new release
3. Click "Handled Error" button
4. Wait 30 seconds
5. **Capture screenshot**: `verification/release-v1.1.0-error.png`
   - Show: Sentry Issues dashboard with handled error
   - Verify: Tagged with release `v1.1.0`

### Step 6: Verify Sourcemaps
1. In Sentry Issues, click on the frontend error (unhandled exception)
2. Open stack trace section
3. **Capture screenshot**: `verification/sourcemap-proof.png`
   - Show: Stack trace with proper file names & line numbers (e.g., `src/index.js:14`)
   - Should NOT show minified file names (e.g., `main.abcdef123.js`)

### Step 7: Create Release v1.1.1 (Bug Fix)
```powershell
cd frontend
npm run build

cd ../backend
$env:SENTRY_RELEASE = "rhm-app@1.1.1"
npm run release:create
npm run release:upload
npm run release:finalize
```

### Step 8: Capture Release Health Screenshots
1. Go to Sentry → Releases page
2. **Screenshot 1**: `verification/release-health-enabled.png`
   - Show: Releases list (v1.0.0, v1.1.0, v1.1.1)
   - Show: Crash Free Session Rate columns with data
3. **Screenshot 2**: `verification/release-health-comparison.png`
   - Show: v1.1.0 and v1.1.1 comparison
   - Show: v1.1.1 has higher crash-free rate than v1.1.0

### Step 9: Configure Alert Rule
1. Go to Sentry → Alerts → Create Alert Rule
2. Set condition: "When an issue is first seen" OR "When an issue regresses"
3. Alternative: "If an event occurs in 1 hour, alert"
4. Set notification: Email or Slack
5. **Capture screenshot**: `verification/alert-rule-config.png`
   - Show: Complete alert rule configuration

### Step 10: Trigger Alert
1. Click "Throw Exception" multiple times to spike error count
2. Wait for alert to trigger
3. **Capture screenshot**: `verification/alert-triggered.png`
   - Show: Email notification OR Slack message OR Sentry alert history
   - Prove: Alert was triggered by the error spike

## Verification Checklist

- [ ] `release-v1.0.0-errors.png` - 2 error types visible, tagged v1.0.0
- [ ] `release-v1.1.0-error.png` - Handled error visible, tagged v1.1.0
- [ ] `sourcemap-proof.png` - Readable source paths, not minified
- [ ] `release-health-enabled.png` - Releases with crash-free rates
- [ ] `release-health-comparison.png` - v1.1.1 > v1.1.0 crash-free rate
- [ ] `alert-rule-config.png` - Alert rule fully configured
- [ ] `alert-triggered.png` - Alert notification proof

## Quick Start (All at Once)

If you already have Sentry credentials set, use this PowerShell script:

```powershell
# Set your credentials
$env:SENTRY_DSN = "your-dsn"
$env:SENTRY_ORG = "your-org"
$env:SENTRY_PROJECT = "your-project"
$env:SENTRY_AUTH_TOKEN = "your-token"

# Run setup
cd backend
npm start  # Start in one terminal

# In another terminal:
cd frontend
npm start  # Start dev server

# Once both are running, trigger errors and capture screenshots as per Step 3-10 above
```
