'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

function NavContent() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'All Meetings', href: '/meetings' },
    { name: 'Current Meeting', href: '/meetings/current' },
    { name: 'New Meeting', href: '/meetings/new' },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className="flex flex-wrap justify-center gap-4 bg-blue-900 p-3 print:hidden"
    >
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            aria-current={isActive ? 'page' : undefined}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900 ${
              isActive
                ? 'bg-white font-semibold text-blue-900'
                : 'text-white hover:bg-blue-800'
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default function NavLinks() {
  return (
    <Suspense
      fallback={
        <nav
          aria-label="Main navigation"
          className="min-h-[48px] bg-blue-900 p-3 print:hidden"
        />
      }
    >
      <NavContent />
    </Suspense>
  );
}