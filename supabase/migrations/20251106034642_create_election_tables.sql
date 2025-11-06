/*
  # Create Election Explorer Database Schema

  ## Overview
  This migration creates the core tables for the Nepal Election Explorer application,
  including political parties, leaders, constituencies, profiles, and candidacy records.

  ## New Tables

  ### 1. parties
  Political parties in Nepal with bilingual names
  - `id` (uuid, primary key)
  - `name_en` (text) - English name
  - `name_ne` (text) - Nepali name
  - `abbreviation` (text) - Party abbreviation
  - `founded_year` (integer) - Year founded
  - `logo_url` (text) - Party logo
  - `website` (text) - Official website
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. constituencies
  Electoral constituencies in Nepal
  - `id` (uuid, primary key)
  - `code` (text, unique) - Constituency code
  - `name_en` (text) - English name
  - `name_ne` (text) - Nepali name
  - `district_code` (text) - District code
  - `district_name_en` (text) - District name in English
  - `district_name_ne` (text) - District name in Nepali
  - `province` (integer) - Province number
  - `constituency_type` (text) - Type (federal, provincial, local)
  - `created_at` (timestamptz)

  ### 3. leaders
  Political leaders/candidates
  - `id` (uuid, primary key)
  - `slug` (text, unique) - URL-friendly identifier
  - `name_en` (text) - English name
  - `name_ne` (text) - Nepali name
  - `party_id` (uuid) - Foreign key to parties
  - `photo_url` (text) - Profile photo
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. profiles
  Extended leader profiles with detailed information
  - `id` (uuid, primary key)
  - `leader_id` (uuid, unique) - Foreign key to leaders
  - `date_of_birth` (date)
  - `education` (text)
  - `occupation` (text)
  - `total_assets` (numeric) - Total assets in NPR
  - `total_liabilities` (numeric) - Total liabilities in NPR
  - `criminal_cases` (integer) - Number of criminal cases
  - `biography_en` (text) - Biography in English
  - `biography_ne` (text) - Biography in Nepali
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. candidacies
  Election candidacy records linking leaders to constituencies
  - `id` (uuid, primary key)
  - `leader_id` (uuid) - Foreign key to leaders
  - `constituency_id` (uuid) - Foreign key to constituencies
  - `party_id` (uuid) - Foreign key to parties
  - `election_year` (integer) - Year of election
  - `votes_received` (integer) - Votes received
  - `is_winner` (boolean) - Whether candidate won
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Add policies for public read access (data is public information)
  - Future: Add policies for authenticated admin updates

  ## Indexes
  - Add indexes on foreign keys for better query performance
  - Add indexes on slug and code fields for lookups
*/

-- Create parties table
CREATE TABLE IF NOT EXISTS parties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_ne text NOT NULL,
  abbreviation text NOT NULL,
  founded_year integer,
  logo_url text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create constituencies table
CREATE TABLE IF NOT EXISTS constituencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name_en text NOT NULL,
  name_ne text NOT NULL,
  district_code text NOT NULL,
  district_name_en text NOT NULL,
  district_name_ne text NOT NULL,
  province integer NOT NULL,
  constituency_type text DEFAULT 'federal',
  created_at timestamptz DEFAULT now()
);

-- Create leaders table
CREATE TABLE IF NOT EXISTS leaders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name_en text NOT NULL,
  name_ne text NOT NULL,
  party_id uuid REFERENCES parties(id) ON DELETE SET NULL,
  photo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  leader_id uuid UNIQUE NOT NULL REFERENCES leaders(id) ON DELETE CASCADE,
  date_of_birth date,
  education text,
  occupation text,
  total_assets numeric(15, 2) DEFAULT 0,
  total_liabilities numeric(15, 2) DEFAULT 0,
  criminal_cases integer DEFAULT 0,
  biography_en text,
  biography_ne text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create candidacies table
CREATE TABLE IF NOT EXISTS candidacies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  leader_id uuid NOT NULL REFERENCES leaders(id) ON DELETE CASCADE,
  constituency_id uuid NOT NULL REFERENCES constituencies(id) ON DELETE CASCADE,
  party_id uuid REFERENCES parties(id) ON DELETE SET NULL,
  election_year integer NOT NULL,
  votes_received integer DEFAULT 0,
  is_winner boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leaders_party_id ON leaders(party_id);
CREATE INDEX IF NOT EXISTS idx_leaders_slug ON leaders(slug);
CREATE INDEX IF NOT EXISTS idx_constituencies_code ON constituencies(code);
CREATE INDEX IF NOT EXISTS idx_constituencies_district ON constituencies(district_code);
CREATE INDEX IF NOT EXISTS idx_candidacies_leader_id ON candidacies(leader_id);
CREATE INDEX IF NOT EXISTS idx_candidacies_constituency_id ON candidacies(constituency_id);
CREATE INDEX IF NOT EXISTS idx_candidacies_party_id ON candidacies(party_id);
CREATE INDEX IF NOT EXISTS idx_candidacies_election_year ON candidacies(election_year);

-- Enable Row Level Security
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE constituencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidacies ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (election data is public)
CREATE POLICY "Public can view parties"
  ON parties FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view constituencies"
  ON constituencies FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view leaders"
  ON leaders FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view profiles"
  ON profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view candidacies"
  ON candidacies FOR SELECT
  TO public
  USING (true);