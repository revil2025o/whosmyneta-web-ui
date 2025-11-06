'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageProvider';
import { LanguageToggle } from './LanguageToggle';
import { translate } from '@/lib/i18n';
import { MapIcon, UsersIcon, Building2Icon, SearchIcon } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const navItems = [
    { href: '/', label: translate('home', language), icon: null },
    { href: '/map', label: translate('map', language), icon: MapIcon },
    { href: '/leaders', label: translate('leaders', language), icon: UsersIcon },
    { href: '/parties', label: translate('parties', language), icon: Building2Icon },
    { href: '/search', label: translate('search', language), icon: SearchIcon },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Who&apos;s My Neta
            </Link>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}
