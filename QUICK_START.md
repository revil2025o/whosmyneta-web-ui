# Quick Start Guide

## ✅ Project Created Successfully!

Your full-stack Nepal Election Explorer application has been created at:
`C:\Users\Rohpr\whosmyneta-web`

## What's Included

✅ Next.js 14 with TypeScript  
✅ Prisma ORM with MySQL schema  
✅ Interactive map component (Leaflet)  
✅ Leader profile pages  
✅ Search with filters  
✅ API routes for all endpoints  
✅ Bilingual support (EN/NE)  
✅ CI/CD workflow (GitHub Actions)  
✅ Complete documentation  

## Next Steps

### 1. Install Prerequisites

If not already installed:

```powershell
# Install Git
winget install --id Git.Git -e

# Install Node.js (if not installed)
winget install --id OpenJS.NodeJS.LTS -e

# Refresh PATH
$env:Path += ";$([Environment]::GetFolderPath('ProgramFiles'))\Git\cmd"
$env:Path += ";$([Environment]::GetFolderPath('ProgramFiles'))\nodejs\"
```

### 2. Install Dependencies

```powershell
cd C:\Users\Rohpr\whosmyneta-web
npm install
```

### 3. Set Up Environment

```powershell
# Copy example env file
Copy-Item .env.example .env.local

# Edit .env.local with your database and API credentials
notepad .env.local
```

Required environment variables:
- `DATABASE_URL` - MySQL connection string
- `NEXT_PUBLIC_ELECTION_API_BASE_URL` - API base URL (optional)
- `ELECTION_API_KEY` - API key (optional)
- `NEXT_PUBLIC_BASE_URL` - Your app URL (default: http://localhost:3000)

### 4. Set Up Database

```powershell
# Generate Prisma Client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push

# Or use migrations
npx prisma migrate dev --name init
```

### 5. Seed Database (Optional)

```powershell
npm run seed
```

### 6. Run Development Server

```powershell
npm run dev
```

Visit: http://localhost:3000

## Publishing to GitHub

### Option A: Manual Setup

1. **Create GitHub Repository:**
   - Go to https://github.com/new
   - Name: `whosmyneta-web`
   - Description: "Nepal Election Explorer"
   - Public repository
   - **Don't** initialize with README

2. **Push to GitHub:**
   ```powershell
   cd C:\Users\Rohpr\whosmyneta-web
   git init
   git add .
   git commit -m "Initial commit: Full-stack Nepal Election Explorer"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/whosmyneta-web.git
   git push -u origin main
   ```

### Option B: GitHub CLI (Easier)

```powershell
# Install GitHub CLI
winget install GitHub.cli

# Authenticate
gh auth login

# Create and push repository
cd C:\Users\Rohpr\whosmyneta-web
gh repo create whosmyneta-web --public --source . --remote origin --push
```

## Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import `whosmyneta-web` repository
5. Add environment variables (same as `.env.local`)
6. Click "Deploy"

## Project Structure

```
whosmyneta-web/
├── src/
│   ├── app/              # Next.js pages and API routes
│   │   ├── api/          # API endpoints
│   │   ├── map/          # Interactive map pages
│   │   ├── leaders/      # Leader profile pages
│   │   ├── parties/      # Party pages
│   │   └── search/       # Search page
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   └── server/           # Server utilities
├── prisma/
│   └── schema.prisma     # Database schema
├── public/
│   └── geo/              # GeoJSON files (add Nepal districts here)
├── scripts/
│   └── seed.ts           # Database seeding script
└── .github/
    └── workflows/        # CI/CD workflows
```

## Features

### 🗺️ Interactive Map
- Navigate to `/map` to see the interactive Nepal districts map
- Click districts to view detailed election data
- Add GeoJSON file to `public/geo/nepal_districts.geo.json`

### 👥 Leader Profiles
- Browse at `/leaders`
- View detailed profiles at `/leaders/[slug]`
- Includes election history, assets, liabilities

### 🔍 Search
- Search page at `/search`
- Filter by name, party, district, year

### 📊 Parties
- Browse parties at `/parties`
- View party details and leaders

## Database Schema

- **Party** - Political parties
- **Leader** - Political leaders
- **Constituency** - Electoral constituencies
- **Profile** - Extended leader profiles
- **Candidacy** - Election history

## Need Help?

- Check `README.md` for detailed documentation
- Check `SETUP_GITHUB.md` for GitHub setup
- Check Prisma docs: https://www.prisma.io/docs

## Next Steps

1. ✅ Project created
2. ⏳ Install dependencies (`npm install`)
3. ⏳ Set up database
4. ⏳ Add GeoJSON map data
5. ⏳ Integrate Election-API-Client
6. ⏳ Deploy to GitHub and Vercel

Good luck! 🚀

