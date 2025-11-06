import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('constituencies')
      .select('*')
      .order('district_name_en')
      .order('name_en');

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching constituencies:', error);
    return NextResponse.json({ error: 'Failed to fetch constituencies' }, { status: 500 });
  }
}
