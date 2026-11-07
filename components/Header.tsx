'use client';

export default function Header() {
  // typeof window check guarantees this ONLY runs in the browser.
  // Next.js build server will just see the empty string '' and pass safely.
  const currentDate = typeof window !== 'undefined' 
    ? new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <header className="bg-blue-900 text-white p-6 text-center shadow-md">
      <h1 className="text-3xl font-bold">Paris Ward</h1>
      {/* suppressHydrationWarning smoothly handles the server/client swap */}
      <p suppressHydrationWarning className="text-blue-200 mt-2 min-h-[24px]">
        {currentDate}
      </p>
    </header>
  );
}