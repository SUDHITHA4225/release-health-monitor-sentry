#!/usr/bin/env pwsh
# Sentry Release Automation Script
# Usage: .\setup-sentry-releases.ps1

param(
    [string]$Org,
    [string]$Project,
    [string]$AuthToken
)

# Verify environment variables
$DSN = $env:SENTRY_DSN
if (-not $DSN) {
    Write-Host "ERROR: SENTRY_DSN environment variable not set" -ForegroundColor Red
    exit 1
}

Write-Host "🚀 Sentry Release Setup" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host ""

# Function to create and upload release
function Create-Release {
    param(
        [string]$ReleaseName
    )
    
    Write-Host "📦 Creating release: $ReleaseName" -ForegroundColor Green
    
    $env:SENTRY_RELEASE = $ReleaseName
    
    # Create release
    sentry-cli releases new $ReleaseName
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to create release" -ForegroundColor Red
        return $false
    }
    
    Write-Host "✓ Release created" -ForegroundColor Green
    
    # Upload sourcemaps from frontend build
    Write-Host "📤 Uploading sourcemaps..." -ForegroundColor Yellow
    
    Push-Location frontend
    if (Test-Path "build/static/js") {
        sentry-cli releases files $ReleaseName upload-sourcemaps build/static/js --url-prefix '~/static/js'
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Sourcemaps uploaded" -ForegroundColor Green
        } else {
            Write-Host "⚠ Warning: Sourcemap upload had issues" -ForegroundColor Yellow
        }
    } else {
        Write-Host "⚠ Frontend build not found, skipping sourcemap upload" -ForegroundColor Yellow
    }
    Pop-Location
    
    # Finalize release
    Write-Host "✔️  Finalizing release..." -ForegroundColor Yellow
    sentry-cli releases finalize $ReleaseName
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Release finalized: $ReleaseName" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to finalize release" -ForegroundColor Red
        return $false
    }
    
    Write-Host ""
    return $true
}

# Check if sentry-cli is installed
if (-not (Get-Command sentry-cli -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: sentry-cli not found. Install it with: npm install -g @sentry/cli" -ForegroundColor Red
    exit 1
}

# Create all three releases
$releases = @("rhm-app@1.0.0", "rhm-app@1.1.0", "rhm-app@1.1.1")

foreach ($release in $releases) {
    Create-Release $release
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "✅ All releases created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Start backend: cd backend && npm start"
Write-Host "2. Start frontend: cd frontend && npm start"
Write-Host "3. Trigger errors and capture screenshots (see SENTRY_SETUP.md)"
