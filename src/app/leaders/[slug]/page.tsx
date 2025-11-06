'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { translate } from '@/lib/i18n';

type LeaderProfile = {
  id: string;
  slug: string;
  name_en: string;
  name_ne: string;
  photo_url: string | null;
  party: any;
  profile: any;
  candidacies: any[];
};

export default function LeaderProfilePage() {
  const params = useParams();
  const { language } = useLanguage();
  const [leader, setLeader] = useState<LeaderProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeader() {
      try {
        const response = await fetch(`/api/leaders/${params.slug}`);
        const data = await response.json();
        setLeader(data);
      } catch (error) {
        console.error('Error fetching leader:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeader();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!leader) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Leader Not Found</h1>
          <p className="text-gray-600">The requested leader profile could not be found.</p>
        </div>
      </div>
    );
  }

  const profile = leader.profile;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12">
            <div className="flex items-center space-x-6">
              <div className="w-32 h-32 bg-white rounded-full flex-shrink-0 flex items-center justify-center">
                {leader.photo_url ? (
                  <img
                    src={leader.photo_url}
                    alt={leader.name_en}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-gray-400">
                    {leader.name_en[0]}
                  </span>
                )}
              </div>
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2">
                  {language === 'en' ? leader.name_en : leader.name_ne}
                </h1>
                {leader.party && (
                  <p className="text-xl text-blue-100">
                    {language === 'en' ? leader.party.name_en : leader.party.name_ne}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="p-8">
            {profile && (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  {profile.education && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase">
                        {translate('education', language)}
                      </h3>
                      <p className="text-gray-900">{profile.education}</p>
                    </div>
                  )}
                  {profile.occupation && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase">
                        {translate('occupation', language)}
                      </h3>
                      <p className="text-gray-900">{profile.occupation}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">
                      {translate('assets', language)}
                    </h3>
                    <p className="text-gray-900">
                      NPR {(profile.total_assets || 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">
                      {translate('liabilities', language)}
                    </h3>
                    <p className="text-gray-900">
                      NPR {(profile.total_liabilities || 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">
                      {translate('criminalCases', language)}
                    </h3>
                    <p className="text-gray-900">{profile.criminal_cases || 0}</p>
                  </div>
                </div>
              </div>
            )}

            {leader.candidacies && leader.candidacies.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {translate('electionHistory', language)}
                </h2>
                <div className="space-y-4">
                  {leader.candidacies.map((candidacy: any) => (
                    <div
                      key={candidacy.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {candidacy.constituency?.name_en} ({candidacy.election_year})
                          </h3>
                          <p className="text-sm text-gray-600">
                            {candidacy.party?.name_en}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {candidacy.votes_received.toLocaleString()} votes
                          </p>
                          {candidacy.is_winner && (
                            <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                              {translate('winner', language)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
