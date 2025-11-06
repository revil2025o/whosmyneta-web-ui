import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Party = {
  id: string;
  name_en: string;
  name_ne: string;
  abbreviation: string;
  founded_year: number | null;
  logo_url: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
};

export type Constituency = {
  id: string;
  code: string;
  name_en: string;
  name_ne: string;
  district_code: string;
  district_name_en: string;
  district_name_ne: string;
  province: number;
  constituency_type: string;
  created_at: string;
};

export type Leader = {
  id: string;
  slug: string;
  name_en: string;
  name_ne: string;
  party_id: string | null;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  leader_id: string;
  date_of_birth: string | null;
  education: string | null;
  occupation: string | null;
  total_assets: number | null;
  total_liabilities: number | null;
  criminal_cases: number;
  biography_en: string | null;
  biography_ne: string | null;
  created_at: string;
  updated_at: string;
};

export type Candidacy = {
  id: string;
  leader_id: string;
  constituency_id: string;
  party_id: string | null;
  election_year: number;
  votes_received: number;
  is_winner: boolean;
  created_at: string;
};
