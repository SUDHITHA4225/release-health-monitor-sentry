# Release Health Monitor with Sentry Integration

## Overview

This project is a minimal full-stack web application built using:

* **Frontend:** React
* **Backend:** Express.js
* **Monitoring:** Sentry

The application demonstrates CRUD operations, error tracking, release monitoring, source map support, and release health monitoring using Sentry.

---

# Setup and Running Instructions

## 1. Install Dependencies

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## 2. Configure Environment Variables

Set your Sentry DSN and release version.

### Linux / Mac

```bash
export SENTRY_DSN=your_sentry_dsn
export SENTRY_RELEASE=your-app-name@1.0.0
```

### Windows PowerShell

```powershell
$env:SENTRY_DSN = "your_sentry_dsn"
$env:SENTRY_RELEASE = "your-app-name@1.0.0"
```

## 3. Run the Application

Start the backend server:

```bash
cd backend
npm start
```

Start the frontend application:

```bash
cd frontend
npm start
```

The React frontend and Express backend will now run in development mode.

---

# CRUD API Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/items`     | Get all items     |
| GET    | `/api/items/:id` | Get item by ID    |
| POST   | `/api/items`     | Create a new item |
| PUT    | `/api/items/:id` | Update an item    |
| DELETE | `/api/items/:id` | Delete an item    |

These endpoints provide complete CRUD functionality for the **items** resource.

---

# Triggering Simulated Errors

The frontend contains buttons to generate different types of errors for Sentry monitoring.

### 1. Throw Exception

Click **Throw Exception**.

* Generates an unhandled exception.
* Tracked in Sentry under the configured release.

### 2. Reject Promise

Click **Reject Promise**.

* Generates an unhandled asynchronous Promise rejection.
* Creates a separate issue in Sentry.

### 3. Handled Error

Click **Handled Error**.

* Uses `Sentry.captureException()`.
* Reports a handled exception with the configured release version.

---

# Release and Source Map Upload

The project includes release scripts in both frontend and backend.

These scripts use **Sentry CLI** to:

* Create a new release.
* Upload source maps.
* Associate source maps with the release.
* Finalize the release in Sentry.

The scripts use the environment variable:

```bash
SENTRY_RELEASE
```

Example release versions:

```text
your-app-name@1.0.0
your-app-name@1.1.0
your-app-name@1.1.1
```

---

# Verification Artifacts

The required screenshots are stored inside the **verification/** folder.

Required files:

```text
verification/
│
├── release-v1.0.0-errors.png
├── release-v1.1.0-error.png
├── sourcemap-proof.png
├── release-health-enabled.png
├── release-health-comparison.png
├── alert-rule-config.png
└── alert-triggered.png
```

These screenshots provide evidence of successful Sentry integration, release tracking, source maps, release health monitoring, and alert configuration.

---

# Conclusion

This project successfully demonstrates a full-stack CRUD application integrated with **Sentry** for error monitoring and release health tracking. It includes simulated errors, release version management, source map uploads for readable stack traces, crash-free session monitoring, and alert rule configuration, making it a complete beginner-friendly DevOps monitoring project.
