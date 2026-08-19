# Release Health Monitor with Sentry Integration

## Overview
This repository contains a minimal full-stack app (Express backend + React frontend) with Sentry integration for release tracking, source maps, and simulated errors.

## Setup and Running Instructions

1. Install dependencies for backend and frontend:

```bash
cd backend
npm install

cd ../frontend
npm install
```

2. Set environment variables (example):

```bash
export SENTRY_DSN=your_sentry_dsn
export SENTRY_RELEASE=your-app-name@1.0.0
```

On Windows PowerShell:
```powershell
$env:SENTRY_DSN = "your_sentry_dsn"
$env:SENTRY_RELEASE = "your-app-name@1.0.0"
```

3. Run backend and frontend (development):

```bash
cd backend
npm start

cd ../frontend
npm start
```

## Triggering Simulated Errors

- Unhandled exception (frontend): Click **Throw Exception** in the UI. This triggers an error captured by Sentry as an unhandled exception.
- Unhandled async rejection (frontend): Click **Reject Promise** in the UI to trigger an unhandled Promise rejection.
- Handled error (frontend): Click **Handled Error** in the UI. This calls `Sentry.captureException` and is tagged with the configured release.

## Release & Source Map Upload Scripts

Both `backend/package.json` and `frontend/package.json` include `release:*` scripts that demonstrate creating a Sentry release and uploading source maps via `sentry-cli`. These scripts reference the `SENTRY_RELEASE` environment variable.

## Verification Artifacts

See the `verification/` directory for placeholder screenshots required by the assignment.
