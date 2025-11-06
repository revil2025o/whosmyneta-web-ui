import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { data: party, error: partyError } = await supabase
      .from('parties')
      .select('*')
      .eq('abbreviation', params.slug.toUpperCase())
      .maybeSingle();

    if (partyError) throw partyError;
    if (!party) {
      return NextResponse.json({ error: 'Party not found' }, { status: 404 });
    }

    const { data: leaders, error: leadersError } = await supabase
      .from('leaders')
      .select('*')
      .eq('party_id', party.id)
      .order('name_en');

    if (leadersError) throw leadersError;

    return NextResponse.json({ party, leaders: leaders || [] });
  } catch (error) {
    console.error('Error fetching party:', error);
    return NextResponse.json({ error: 'Failed to fetch party' }, { status: 500 });
  }
}
