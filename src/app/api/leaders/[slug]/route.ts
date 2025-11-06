import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { data: leader, error: leaderError } = await supabase
      .from('leaders')
      .select(`
        *,
        party:parties(*),
        profile:profiles(*)
      `)
      .eq('slug', params.slug)
      .maybeSingle();

    if (leaderError) throw leaderError;
    if (!leader) {
      return NextResponse.json({ error: 'Leader not found' }, { status: 404 });
    }

    const { data: candidacies, error: candidaciesError } = await supabase
      .from('candidacies')
      .select(`
        *,
        constituency:constituencies(*),
        party:parties(*)
      `)
      .eq('leader_id', leader.id)
      .order('election_year', { ascending: false });

    if (candidaciesError) throw candidaciesError;

    return NextResponse.json({ ...leader, candidacies: candidacies || [] });
  } catch (error) {
    console.error('Error fetching leader:', error);
    return NextResponse.json({ error: 'Failed to fetch leader' }, { status: 500 });
  }
}
