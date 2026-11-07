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
  ];

  return (
    <nav className="flex justify-center gap-6 bg-blue-800 p-3 print:hidden">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`px-3 py-2 rounded-md transition-colors ${
            pathname === link.href 
              ? 'bg-blue-700 text-white font-semibold' 
              : 'text-blue-100 hover:text-white hover:bg-blue-700'
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}

export default function NavLinks() {
  return (
    // The Suspense fallback protects the static build from the dynamic usePathname hook
    <Suspense fallback={<nav className="bg-blue-800 p-3 min-h-[48px] print:hidden"></nav>}>
      <NavContent />
    </Suspense>
  );
}