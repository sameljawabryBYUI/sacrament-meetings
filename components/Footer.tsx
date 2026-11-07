'use client';

export default function Footer() {
  const currentYear = typeof window !== 'undefined' ? new Date().getFullYear() : '';

  return (
    <footer className="bg-gray-800 text-gray-400 p-4 text-center text-sm mt-auto">
      <p suppressHydrationWarning>
        &copy; {currentYear} Sacrament Meeting Planner. All rights reserved.
      </p>
    </footer>
  );
}