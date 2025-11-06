'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { translate } from '@/lib/i18n';
import { MapIcon, UsersIcon, SearchIcon } from 'lucide-react';

export default function Home() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {translate('exploreNepal', language)}
          </h1>
          <p className="text-xl text-gray-600">
            {translate('subtitle', language)}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Link
            href="/map"
            className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <MapIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {translate('viewMap', language)}
              </h3>
              <p className="text-gray-600">
                Interactive district-wise election results
              </p>
            </div>
          </Link>

          <Link
            href="/leaders"
            className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <UsersIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {translate('browseLeaders', language)}
              </h3>
              <p className="text-gray-600">
                Detailed profiles and election history
              </p>
            </div>
          </Link>

          <Link
            href="/search"
            className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                <SearchIcon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {translate('searchCandidates', language)}
              </h3>
              <p className="text-gray-600">
                Find candidates by name, party, or district
              </p>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About This Platform
          </h2>
          <p className="text-gray-600 mb-4">
            Who&apos;s My Neta is a comprehensive election information platform for Nepal,
            combining interactive maps with detailed leader profiles. Explore election
            results, understand candidate backgrounds, and make informed decisions.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Interactive district maps</li>
                <li>Bilingual support (English/Nepali)</li>
                <li>Detailed leader profiles</li>
                <li>Election history tracking</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Data Includes</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Assets and liabilities</li>
                <li>Educational background</li>
                <li>Criminal case information</li>
                <li>Party affiliations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
