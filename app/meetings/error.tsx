'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Meetings route error:', error);
  }, [error]);

  return (
    <div className="mx-auto mt-12 max-w-xl rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">
        Something went wrong
      </h1>
      <p className="mt-3 text-gray-700">
        {error.message ||
          'An unexpected error occurred while loading or updating meetings. Please try again.'}
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="cursor-pointer rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}