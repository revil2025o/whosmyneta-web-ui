'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { translate } from '@/lib/i18n';
import { SearchIcon } from 'lucide-react';

export default function SearchPage() {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const response = await fetch(`/api/candidates?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {translate('search', language)}
        </h1>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={translate('searchPlaceholder', language)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>
        </form>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        )}

        {!loading && searched && (
          <div>
            <p className="text-gray-600 mb-4">
              Found {results.length} result{results.length !== 1 ? 's' : ''}
            </p>

            {results.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-600">
                  No results found. Try a different search term.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((leader) => (
                  <Link
                    key={leader.id}
                    href={`/leaders/${leader.slug}`}
                    className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
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
                        <h3 className="text-lg font-semibold text-gray-900">
                          {language === 'en' ? leader.name_en : leader.name_ne}
                        </h3>
                        {leader.party && (
                          <p className="text-sm text-gray-600">
                            {language === 'en' ? leader.party.name_en : leader.party.name_ne}
                          </p>
                        )}
                        {leader.candidacies && leader.candidacies.length > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            {leader.candidacies.length} election{leader.candidacies.length !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
