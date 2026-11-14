'use client';

import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('');

  // This tells Next.js to wait until the page loads before getting the date
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-gray-800 text-gray-400 p-4 text-center text-sm mt-auto">
      <p>
        &copy; {currentYear} Sacrament Meeting Planner. All rights reserved.
      </p>
    </footer>
  );
}