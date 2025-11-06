import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const partyId = searchParams.get('party');
    const district = searchParams.get('district');
    const year = searchParams.get('year');

    let queryBuilder = supabase
      .from('leaders')
      .select(`
        *,
        party:parties(*),
        candidacies(
          *,
          constituency:constituencies(*)
        )
      `);

    if (query) {
      queryBuilder = queryBuilder.or(`name_en.ilike.%${query}%,name_ne.ilike.%${query}%`);
    }

    if (partyId) {
      queryBuilder = queryBuilder.eq('party_id', partyId);
    }

    queryBuilder = queryBuilder.order('name_en').limit(50);

    const { data, error } = await queryBuilder;

    if (error) throw error;

    let filteredData = data || [];

    if (district) {
      filteredData = filteredData.filter((leader: any) =>
        leader.candidacies?.some((c: any) =>
          c.constituency?.district_code === district
        )
      );
    }

    if (year) {
      filteredData = filteredData.filter((leader: any) =>
        leader.candidacies?.some((c: any) =>
          c.election_year === parseInt(year)
        )
      );
    }

    return NextResponse.json(filteredData);
  } catch (error) {
    console.error('Error searching candidates:', error);
    return NextResponse.json({ error: 'Failed to search candidates' }, { status: 500 });
  }
}
