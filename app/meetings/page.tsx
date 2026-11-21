import Link from 'next/link';
import { Suspense } from 'react';
import { connection } from 'next/server';
import MeetingCard from '../../components/MeetingCard';
import { getMeetings, getMeetingsTotalPages } from '../../lib/meetings-db';

async function MeetingsList({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  await connection();
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query ?? '';
  const currentPage = Math.max(1, Number(resolvedParams?.page) || 1);

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  const buildPageHref = (page: number) => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    params.set('page', String(page));
    return `/meetings?${params.toString()}`;
  };

  return (
    <>
      {meetings.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-gray-700">No sacrament meetings found.</p>
          <Link
            href="/meetings/new"
            className="mt-4 inline-block rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
          >
            Create the First Meeting
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav
          aria-label="Meetings pagination"
          className="mt-8 flex items-center justify-center gap-4"
        >
          {currentPage > 1 ? (
            <Link
              href={buildPageHref(currentPage - 1)}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
            >
              Previous
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500"
            >
              Previous
            </span>
          )}

          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages ? (
            <Link
              href={buildPageHref(currentPage + 1)}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
            >
              Next
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500"
            >
              Next
            </span>
          )}
        </nav>
      )}
    </>
  );
}

export default function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  return (
    <div>
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-bold text-gray-900">All Meetings</h1>
        <Link
          href="/meetings/new"
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        >
          + New Meeting
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="py-10 text-center text-gray-700">
            Loading meetings...
          </div>
        }
      >
        <MeetingsList searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}