'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { translate } from '@/lib/i18n';
import { Leader, Party } from '@/lib/supabase';

type LeaderWithParty = Leader & { party: Party | null };

export default function LeadersPage() {
  const { language } = useLanguage();
  const [leaders, setLeaders] = useState<LeaderWithParty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaders() {
      try {
        const response = await fetch('/api/candidates');
        const data = await response.json();
        setLeaders(data);
      } catch (error) {
        console.error('Error fetching leaders:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leaders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {translate('leaders', language)}
        </h1>

        {leaders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No leaders found. Add some data to get started.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((leader) => (
              <Link
                key={leader.id}
                href={`/leaders/${leader.slug}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
                    {leader.photo_url ? (
                      <img
                        src={leader.photo_url}
                        alt={leader.name_en}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-400">
                        {leader.name_en[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {language === 'en' ? leader.name_en : leader.name_ne}
                    </h3>
                    {leader.party && (
                      <p className="text-sm text-gray-600">
                        {language === 'en' ? leader.party.name_en : leader.party.name_ne}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
