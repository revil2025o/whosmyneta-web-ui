import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'set' : 'NOT SET');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'set' : 'NOT SET');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const nepaliParties = [
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
  {
    name_en: 'Rastriya Swatantra Party',
    name_ne: 'राष्ट्रिय स्वतन्त्र पार्टी',
    abbreviation: 'RSP',
    founded_year: 2022,
  },
  {
    name_en: 'Nepal Khanal Party',
    name_ne: 'नेपाल खनाल पार्टी',
    abbreviation: 'NKP',
    founded_year: 2014,
  },
  {
    name_en: 'Janata Samajwadi Party',
    name_ne: 'जनता समाजवादी पार्टी',
    abbreviation: 'JSP',
    founded_year: 2019,
  },
];

const nepaliDistricts = [
  { code: 'KTM', name_en: 'Kathmandu', name_ne: 'काठमाडौं' },
  { code: 'BKT', name_en: 'Bhaktapur', name_ne: 'भक्तपुर' },
  { code: 'LLT', name_en: 'Lalitpur', name_ne: 'ललितपुर' },
  { code: 'CHA', name_en: 'Chanap', name_ne: 'चञ्चल' },
  { code: 'DHN', name_en: 'Dhanusa', name_ne: 'धनुसा' },
  { code: 'SIN', name_en: 'Sindhuli', name_ne: 'सिन्धुली' },
  { code: 'UDA', name_en: 'Udaypur', name_ne: 'उदयपुर' },
  { code: 'PSA', name_en: 'Parsa', name_ne: 'पर्सा' },
  { code: 'BAR', name_en: 'Bara', name_ne: 'बारा' },
  { code: 'RAU', name_en: 'Rautahat', name_ne: 'रौतहट' },
];

const leaders = [
  { name_en: 'Sher Bahadur Deuba', name_ne: 'शेर बहादुर देउबा', party_abbr: 'NC' },
  { name_en: 'K.P. Sharma Oli', name_ne: 'के. पी. शर्मा ओली', party_abbr: 'CPN-UML' },
  { name_en: 'Pushpa Kamal Dahal Prachanda', name_ne: 'पुष्प कमल दहल प्रचण्ड', party_abbr: 'CPN-MC' },
  { name_en: 'Rajendra Shrestha', name_ne: 'राजेन्द्र श्रेष्ठ', party_abbr: 'RSP' },
  { name_en: 'Jhalanath Khanal', name_ne: 'झलनाथ खनाल', party_abbr: 'NKP' },
  { name_en: 'Upendra Yadav', name_ne: 'उपेन्द्र यादव', party_abbr: 'JSP' },
  { name_en: 'Ramchandra Paudel', name_ne: 'रमचन्द्र पौडेल', party_abbr: 'NC' },
  { name_en: 'Narahari Acharya', name_ne: 'नरहरी आचार्य', party_abbr: 'CPN-UML' },
  { name_en: 'Prakash Man Singh', name_ne: 'प्रकाश मान सिंह', party_abbr: 'CPN-MC' },
  { name_en: 'Yuba Raj Khatiwada', name_ne: 'युब राज खतिवडा', party_abbr: 'NC' },
  { name_en: 'Bishnu Paudel', name_ne: 'विष्णु पौडेल', party_abbr: 'CPN-UML' },
  { name_en: 'Agni Sapkota', name_ne: 'अग्नि सप्कोटा', party_abbr: 'CPN-MC' },
  { name_en: 'Arjun Singh Rana', name_ne: 'अर्जुन सिंह राणा', party_abbr: 'RSP' },
  { name_en: 'Lila Nath Sharma', name_ne: 'लीला नाथ शर्मा', party_abbr: 'NKP' },
  { name_en: 'Bidya Devi Bhandari', name_ne: 'विद्या देवी भण्डारी', party_abbr: 'JSP' },
];

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

async function seed() {
  console.log('Starting database seed...');

  try {
    const { data: existingParties } = await supabase.from('parties').select('id').limit(1);
    if (existingParties && existingParties.length > 0) {
      console.log('Database already has data. Skipping seed.');
      return;
    }

    console.log('Inserting parties...');
    const { data: partiesData, error: partiesError } = await supabase
      .from('parties')
      .insert(nepaliParties)
      .select();

    if (partiesError) throw new Error(`Parties error: ${partiesError.message}`);
    console.log(`✓ Inserted ${partiesData?.length || 0} parties`);

    console.log('Creating constituencies for all districts...');
    const constituencies: any[] = [];
    nepaliDistricts.forEach((district, districtIndex) => {
      for (let i = 1; i <= 2; i++) {
        constituencies.push({
          code: `${district.code}-${i}`,
          name_en: `${district.name_en}-${i}`,
          name_ne: `${district.name_ne}-${i}`,
          district_code: district.code,
          district_name_en: district.name_en,
          district_name_ne: district.name_ne,
          province: Math.floor(districtIndex / 3) + 1,
          constituency_type: 'federal',
        });
      }
    });

    const { data: constData, error: constError } = await supabase
      .from('constituencies')
      .insert(constituencies)
      .select();

    if (constError) throw new Error(`Constituencies error: ${constError.message}`);
    console.log(`✓ Inserted ${constData?.length || 0} constituencies`);

    console.log('Inserting leaders...');
    const partyMap = new Map(
      (partiesData || []).map((p: any) => [p.abbreviation, p.id])
    );

    const leadersToInsert = leaders.map((leader) => ({
      slug: slugify(leader.name_en),
      name_en: leader.name_en,
      name_ne: leader.name_ne,
      party_id: partyMap.get(leader.party_abbr),
    }));

    const { data: leadersData, error: leadersError } = await supabase
      .from('leaders')
      .insert(leadersToInsert)
      .select();

    if (leadersError) throw new Error(`Leaders error: ${leadersError.message}`);
    console.log(`✓ Inserted ${leadersData?.length || 0} leaders`);

    console.log('Inserting profiles for leaders...');
    const profiles = (leadersData || []).map((leader: any) => ({
      leader_id: leader.id,
      education: 'Advanced degree in Political Science',
      occupation: 'Politician',
      total_assets: Math.floor(Math.random() * 10000000) + 1000000,
      total_liabilities: Math.floor(Math.random() * 2000000),
      criminal_cases: Math.floor(Math.random() * 3),
      biography_en: `${leader.name_en} is an experienced political leader in Nepal with a focus on governance and public service.`,
      biography_ne: `${leader.name_ne} नेपालको एक अनुभवी राजनीतिक नेता हुन् जो शासन र जनसेवामा केन्द्रित छन्।`,
    }));

    const { error: profilesError } = await supabase.from('profiles').insert(profiles);
    if (profilesError) throw new Error(`Profiles error: ${profilesError.message}`);
    console.log(`✓ Inserted ${profiles.length} profiles`);

    console.log('Creating candidacies...');
    const candidacies: any[] = [];
    (leadersData || []).forEach((leader: any) => {
      const numConstituencies = Math.floor(Math.random() * 3) + 1;
      const selectedConstituencies = (constData || [])
        .sort(() => Math.random() - 0.5)
        .slice(0, numConstituencies);

      selectedConstituencies.forEach((constituency: any) => {
        candidacies.push({
          leader_id: leader.id,
          constituency_id: constituency.id,
          party_id: leader.party_id,
          election_year: 2022,
          votes_received: Math.floor(Math.random() * 50000) + 10000,
          is_winner: Math.random() > 0.7,
        });
      });
    });

    const { error: candidaciesError } = await supabase
      .from('candidacies')
      .insert(candidacies);

    if (candidaciesError) throw new Error(`Candidacies error: ${candidaciesError.message}`);
    console.log(`✓ Inserted ${candidacies.length} candidacies`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`\nSummary:`);
    console.log(`- Parties: ${partiesData?.length || 0}`);
    console.log(`- Constituencies: ${constData?.length || 0}`);
    console.log(`- Leaders: ${leadersData?.length || 0}`);
    console.log(`- Profiles: ${profiles.length}`);
    console.log(`- Candidacies: ${candidacies.length}`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
