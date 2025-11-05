# Who's My Neta - Nepal Election Explorer

A comprehensive full-stack web application combining features from [ekantipur election map](https://election.ekantipur.com/) and [RateMyNeta](https://www.ratemyneta.com/), providing interactive election data visualization and detailed leader profiles for Nepal.

## Features

### 🗺️ Interactive Map
- Interactive Nepal districts map using Leaflet
- Visual representation of election data by district
- Click districts to view detailed constituency information
- Historical election results visualization

### 👥 Leader Profiles
- Detailed profiles similar to RateMyNeta
- Bilingual support (English/Nepali)
- Election history and performance metrics
- Assets, liabilities, and criminal case information
- Educational background and experience

### 🔍 Search & Filters
- Search leaders by name, party, district
- Filter by election year, constituency, party
- Advanced filtering options

### 📊 Data Integration
- Integration with [Election-API-Client](https://github.com/Nava-Yuwa-Central/Election-API-Client)
- MySQL database with Prisma ORM
- Support for legacy data import (RateMyNeta-style)

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: MySQL
- **Maps**: Leaflet, React-Leaflet
- **API Client**: Election-API-Client

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- MySQL database (or use PlanetScale for hosted)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/whosmyneta-web.git
cd whosmyneta-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
DATABASE_URL="mysql://user:password@localhost:3306/election_app"
NEXT_PUBLIC_ELECTION_API_BASE_URL="https://your-api-url.com"
ELECTION_API_KEY="your-api-key"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
# Or for migrations:
npx prisma migrate dev --name init
```

5. (Optional) Seed the database:
```bash
npm run seed
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
whosmyneta-web/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   └── geo/                   # GeoJSON files for map
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # API routes
│   │   ├── map/                # Map pages
│   │   ├── leaders/            # Leader profile pages
│   │   ├── parties/            # Party pages
│   │   └── constituencies/     # Constituency pages
│   ├── components/             # React components
│   ├── lib/                    # Utility functions
│   └── server/                 # Server-side utilities
├── scripts/
│   ├── seed.ts                 # Database seeding
│   └── import-legacy.ts        # Legacy data import
└── .github/
    └── workflows/              # CI/CD workflows
```

## API Routes

- `GET /api/parties` - List all parties
- `GET /api/candidates` - Search candidates (query params: q, party, district, year)
- `GET /api/leaders/[slug]` - Get leader profile
- `GET /api/constituencies` - List constituencies
- `GET /api/map/district/[code]` - Get district data for map

## Database Schema

- **Party**: Political parties with bilingual names
- **Leader**: Political leaders with profiles
- **Constituency**: Electoral constituencies
- **Profile**: Extended leader profiles (assets, liabilities, criminal cases)
- **Candidacy**: Election candidacy history

## Development

### Database Commands

```bash
# Generate Prisma Client
npm run db:generate

# Push schema changes
npm run db:push

# Run migrations
npm run db:migrate

# Open Prisma Studio
npm run db:studio
```

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Database Hosting

- **PlanetScale**: Free MySQL hosting (recommended for development)
- **AWS RDS**: Production-grade MySQL
- **Railway**: Easy MySQL hosting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Inspired by [election.ekantipur.com](https://election.ekantipur.com/)
- Inspired by [RateMyNeta](https://www.ratemyneta.com/)
- Uses [Election-API-Client](https://github.com/Nava-Yuwa-Central/Election-API-Client)

