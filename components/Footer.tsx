'use client';

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export default function Footer() {
  const currentYear = useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear().toString(),
    () => '2026'
  );

  return (
    <footer className="mt-auto bg-gray-900 p-4 text-center text-sm text-gray-200">
      <p>
        &copy; {currentYear} Sacrament Meeting Planner. All rights reserved.
      </p>
    </footer>
  );
}