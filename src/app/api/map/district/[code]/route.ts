import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const { data: constituencies, error: constError } = await supabase
      .from('constituencies')
      .select('*')
      .eq('district_code', params.code)
      .order('name_en');

    if (constError) throw constError;

    const constituencyIds = constituencies?.map(c => c.id) || [];

    let candidaciesData = [];
    if (constituencyIds.length > 0) {
      const { data: candidacies, error: candError } = await supabase
        .from('candidacies')
        .select(`
          *,
          leader:leaders(*),
          party:parties(*),
          constituency:constituencies(*)
        `)
        .in('constituency_id', constituencyIds)
        .order('election_year', { ascending: false });

      if (candError) throw candError;
      candidaciesData = candidacies || [];
    }

    return NextResponse.json({
      constituencies: constituencies || [],
      candidacies: candidaciesData,
    });
  } catch (error) {
    console.error('Error fetching district data:', error);
    return NextResponse.json({ error: 'Failed to fetch district data' }, { status: 500 });
  }
}
