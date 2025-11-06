'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { translate } from '@/lib/i18n';
import { Party } from '@/lib/supabase';

export default function PartiesPage() {
  const { language } = useLanguage();
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParties() {
      try {
        const response = await fetch('/api/parties');
        const data = await response.json();
        setParties(data);
      } catch (error) {
        console.error('Error fetching parties:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchParties();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading parties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {translate('parties', language)}
        </h1>

        {parties.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No parties found. Add some data to get started.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parties.map((party) => (
              <Link
                key={party.id}
                href={`/parties/${party.abbreviation.toLowerCase()}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-center space-x-4">
                  {party.logo_url && (
                    <img
                      src={party.logo_url}
                      alt={party.name_en}
                      className="w-16 h-16 object-contain"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {language === 'en' ? party.name_en : party.name_ne}
                    </h3>
                    <p className="text-sm text-gray-600">{party.abbreviation}</p>
                    {party.founded_year && (
                      <p className="text-xs text-gray-500">
                        Founded {party.founded_year}
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
