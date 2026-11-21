import Link from 'next/link';
import { Suspense } from 'react';
import { connection } from 'next/server';
import MeetingDetail from '../../../components/MeetingDetail';
import { getMeetingById } from '../../../lib/meetings-db';

async function MeetingDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
        <h1 className="text-xl font-bold text-red-700">
          Invalid ID format (400)
        </h1>
        <p className="mt-2 text-gray-700">
          The meeting ID provided is not valid.
        </p>
        <Link
          href="/meetings"
          className="mt-4 inline-block rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
        >
          Back to Meetings
        </Link>
      </div>
    );
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
        <h1 className="text-xl font-bold text-red-700">
          Meeting not found (404)
        </h1>
        <p className="mt-2 text-gray-700">
          The meeting you requested could not be found.
        </p>
        <Link
          href="/meetings"
          className="mt-4 inline-block rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
        >
          Back to Meetings
        </Link>
      </div>
    );
  }

  return (
    <div>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}

export default function MeetingDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mt-10 text-center text-xl text-gray-700">
          Loading meeting details...
        </div>
      }
    >
      <MeetingDetailContent params={props.params} />
    </Suspense>
  );
}