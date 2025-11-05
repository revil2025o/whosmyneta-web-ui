# PowerShell script to initialize Git and push to GitHub
# Run this script after creating your GitHub repository

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$false)]
    [string]$RepositoryName = "whosmyneta-web"
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Setting up Git repository..." -ForegroundColor Green

# Check if Git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install it first:" -ForegroundColor Red
    Write-Host "   winget install --id Git.Git -e" -ForegroundColor Yellow
    exit 1
}

# Navigate to project directory
$projectPath = $PSScriptRoot
Set-Location $projectPath

Write-Host "📁 Project directory: $projectPath" -ForegroundColor Cyan

# Initialize Git if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
    Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
}

# Add all files
Write-Host "📝 Adding files to Git..." -ForegroundColor Yellow
git add .

# Create initial commit
Write-Host "💾 Creating initial commit..." -ForegroundColor Yellow
$commitMessage = "Initial commit: Full-stack Nepal Election Explorer with interactive map and leader profiles"
git commit -m $commitMessage

# Set remote
$remoteUrl = "https://github.com/$GitHubUsername/$RepositoryName.git"
Write-Host "🔗 Setting remote origin to: $remoteUrl" -ForegroundColor Yellow

# Check if remote already exists
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "⚠️  Remote 'origin' already exists: $existingRemote" -ForegroundColor Yellow
    $update = Read-Host "Update to new URL? (y/n)"
    if ($update -eq "y") {
        git remote set-url origin $remoteUrl
        Write-Host "✅ Remote updated" -ForegroundColor Green
    }
} else {
    git remote add origin $remoteUrl
    Write-Host "✅ Remote added" -ForegroundColor Green
}

# Push to GitHub
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "   Repository: https://github.com/$GitHubUsername/$RepositoryName" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  Make sure you have:" -ForegroundColor Yellow
Write-Host "   1. Created the repository on GitHub" -ForegroundColor Yellow
Write-Host "   2. Authenticated with GitHub (git credential or GitHub CLI)" -ForegroundColor Yellow
Write-Host ""
$push = Read-Host "Push to GitHub now? (y/n)"

if ($push -eq "y") {
    try {
        git push -u origin main
        Write-Host ""
        Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host "🌐 Repository URL: https://github.com/$GitHubUsername/$RepositoryName" -ForegroundColor Cyan
    } catch {
        Write-Host ""
        Write-Host "❌ Push failed. Common issues:" -ForegroundColor Red
        Write-Host "   - Repository doesn't exist on GitHub" -ForegroundColor Yellow
        Write-Host "   - Authentication required" -ForegroundColor Yellow
        Write-Host "   - Run: gh auth login (if using GitHub CLI)" -ForegroundColor Yellow
    }
} else {
    Write-Host ""
    Write-Host "📋 Manual push commands:" -ForegroundColor Cyan
    Write-Host "   git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "✨ Next steps:" -ForegroundColor Green
Write-Host "   1. Go to https://github.com/$GitHubUsername/$RepositoryName" -ForegroundColor Cyan
Write-Host "   2. Set up Vercel deployment (see SETUP_GITHUB.md)" -ForegroundColor Cyan
Write-Host "   3. Configure environment variables" -ForegroundColor Cyan
Write-Host "   4. Run: npm install && npm run dev" -ForegroundColor Cyan

