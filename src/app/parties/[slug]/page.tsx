'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { translate } from '@/lib/i18n';

type PartyData = {
  party: any;
  leaders: any[];
};

export default function PartyPage() {
  const params = useParams();
  const { language } = useLanguage();
  const [data, setData] = useState<PartyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParty() {
      try {
        const response = await fetch(`/api/parties/${params.slug}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching party:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchParty();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading party...</p>
        </div>
      </div>
    );
  }

  if (!data || !data.party) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Party Not Found</h1>
          <p className="text-gray-600">The requested party could not be found.</p>
        </div>
      </div>
    );
  }

  const { party, leaders } = data;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-6 mb-6">
            {party.logo_url && (
              <img
                src={party.logo_url}
                alt={party.name_en}
                className="w-24 h-24 object-contain"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'en' ? party.name_en : party.name_ne}
              </h1>
              <p className="text-lg text-gray-600">{party.abbreviation}</p>
              {party.founded_year && (
                <p className="text-sm text-gray-500">Founded {party.founded_year}</p>
              )}
            </div>
          </div>

          {party.website && (
            <a
              href={party.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit Website
            </a>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Party {translate('leaders', language)}
          </h2>

          {leaders.length === 0 ? (
            <p className="text-gray-600">No leaders found for this party.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {leaders.map((leader) => (
                <Link
                  key={leader.id}
                  href={`/leaders/${leader.slug}`}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
                    {leader.photo_url ? (
                      <img
                        src={leader.photo_url}
                        alt={leader.name_en}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold text-gray-400">
                        {leader.name_en[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {language === 'en' ? leader.name_en : leader.name_ne}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
