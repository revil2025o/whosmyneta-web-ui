# GitHub Repository Setup Instructions

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Repository name: `whosmyneta-web`
4. Description: "Nepal Election Explorer - Interactive map and leader profiles"
5. Set to **Public**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## Step 2: Initialize Git and Push

Run these commands in PowerShell from the project directory:

```powershell
cd C:\Users\Rohpr\whosmyneta-web

# Initialize git
git init
git branch -M main

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Full-stack Nepal Election Explorer"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/whosmyneta-web.git

# Push to GitHub
git push -u origin main
```

## Step 3: Set Up GitHub Actions Secrets (Optional)

If you want CI/CD to work, add secrets in GitHub:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Add these secrets:
   - `DATABASE_URL` - Your MySQL connection string (for CI builds)

## Step 4: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your `whosmyneta-web` repository
4. Framework: Next.js (auto-detected)
5. Add Environment Variables:
   - `DATABASE_URL` - Your MySQL connection string
   - `NEXT_PUBLIC_ELECTION_API_BASE_URL` - API base URL
   - `ELECTION_API_KEY` - API key if needed
6. Click "Deploy"

## Alternative: Use GitHub CLI

If you have GitHub CLI installed:

```powershell
# Install GitHub CLI (if not installed)
winget install GitHub.cli

# Authenticate
gh auth login

# Create repository and push
cd C:\Users\Rohpr\whosmyneta-web
gh repo create whosmyneta-web --public --source . --remote origin --push
```

## Next Steps

1. Set up your MySQL database (local or hosted)
2. Update `.env.local` with your database URL
3. Run `npm install` to install dependencies
4. Run `npx prisma generate && npx prisma db push` to set up database
5. Run `npm run dev` to start development server

