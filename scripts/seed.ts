import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('Seeding database...');

  const { data: existingParties } = await supabase.from('parties').select('id').limit(1);
  if (existingParties && existingParties.length > 0) {
    console.log('Database already has data. Skipping seed.');
    return;
  }

  const { data: parties, error: partiesError } = await supabase
    .from('parties')
    .insert([
      {
        name_en: 'Nepali Congress',
        name_ne: 'नेपाली कांग्रेस',
        abbreviation: 'NC',
        founded_year: 1947,
      },
      {
        name_en: 'Communist Party of Nepal (Unified Marxist-Leninist)',
        name_ne: 'नेपाल कम्युनिस्ट पार्टी (एकीकृत मार्क्सवादी-लेनिनवादी)',
        abbreviation: 'CPN-UML',
        founded_year: 1991,
      },
      {
        name_en: 'Communist Party of Nepal (Maoist Centre)',
        name_ne: 'नेपाल कम्युनिस्ट पार्टी (माओवादी केन्द्र)',
        abbreviation: 'CPN-MC',
        founded_year: 1994,
      },
    ])
    .select();

  if (partiesError) {
    console.error('Error seeding parties:', partiesError);
    return;
  }

  console.log('Parties seeded successfully');

  const { data: constituencies, error: constError } = await supabase
    .from('constituencies')
    .insert([
      {
        code: 'KTM-1',
        name_en: 'Kathmandu-1',
        name_ne: 'काठमाडौं-१',
        district_code: 'KTM',
        district_name_en: 'Kathmandu',
        district_name_ne: 'काठमाडौं',
        province: 3,
        constituency_type: 'federal',
      },
      {
        code: 'KTM-2',
        name_en: 'Kathmandu-2',
        name_ne: 'काठमाडौं-२',
        district_code: 'KTM',
        district_name_en: 'Kathmandu',
        district_name_ne: 'काठमाडौं',
        province: 3,
        constituency_type: 'federal',
      },
    ])
    .select();

  if (constError) {
    console.error('Error seeding constituencies:', constError);
    return;
  }

  console.log('Constituencies seeded successfully');

  const { data: leaders, error: leadersError } = await supabase
    .from('leaders')
    .insert([
      {
        slug: 'sample-leader-1',
        name_en: 'Sample Leader One',
        name_ne: 'नमूना नेता एक',
        party_id: parties![0].id,
      },
      {
        slug: 'sample-leader-2',
        name_en: 'Sample Leader Two',
        name_ne: 'नमूना नेता दुई',
        party_id: parties![1].id,
      },
    ])
    .select();

  if (leadersError) {
    console.error('Error seeding leaders:', leadersError);
    return;
  }

  console.log('Leaders seeded successfully');

  const { error: profilesError } = await supabase.from('profiles').insert([
    {
      leader_id: leaders![0].id,
      education: 'Masters in Political Science',
      occupation: 'Politician',
      total_assets: 5000000,
      total_liabilities: 500000,
      criminal_cases: 0,
      biography_en: 'Sample biography for leader one.',
      biography_ne: 'नेता एकको लागि नमूना जीवनी।',
    },
    {
      leader_id: leaders![1].id,
      education: 'Bachelor in Law',
      occupation: 'Lawyer and Politician',
      total_assets: 3000000,
      total_liabilities: 200000,
      criminal_cases: 1,
      biography_en: 'Sample biography for leader two.',
      biography_ne: 'नेता दुईको लागि नमूना जीवनी।',
    },
  ]);

  if (profilesError) {
    console.error('Error seeding profiles:', profilesError);
    return;
  }

  console.log('Profiles seeded successfully');

  const { error: candidaciesError } = await supabase.from('candidacies').insert([
    {
      leader_id: leaders![0].id,
      constituency_id: constituencies![0].id,
      party_id: parties![0].id,
      election_year: 2022,
      votes_received: 45000,
      is_winner: true,
    },
    {
      leader_id: leaders![1].id,
      constituency_id: constituencies![1].id,
      party_id: parties![1].id,
      election_year: 2022,
      votes_received: 38000,
      is_winner: false,
    },
  ]);

  if (candidaciesError) {
    console.error('Error seeding candidacies:', candidaciesError);
    return;
  }

  console.log('Candidacies seeded successfully');
  console.log('Database seeded successfully!');
}

seed().catch(console.error);
