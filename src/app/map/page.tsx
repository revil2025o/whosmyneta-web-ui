'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { translate } from '@/lib/i18n';

export default function MapPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {translate('map', language)}
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center py-12">
            <div className="mb-6">
              <svg
                className="w-24 h-24 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Interactive Map Coming Soon
            </h2>
            <p className="text-gray-600 mb-6">
              To enable the interactive map, add Nepal GeoJSON data to:
            </p>
            <code className="bg-gray-100 px-4 py-2 rounded text-sm text-gray-800">
              public/geo/nepal_districts.geo.json
            </code>
            <div className="mt-8 text-left max-w-2xl mx-auto">
              <h3 className="font-semibold text-gray-900 mb-2">Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Click districts to view election results</li>
                <li>See winner information and vote counts</li>
                <li>Filter by election year</li>
                <li>View constituency details</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
