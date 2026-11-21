import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <div className="mx-auto mt-12 max-w-xl rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Meeting Not Found</h1>
      <p className="mt-3 text-gray-700">
        The sacrament meeting you are looking for does not exist or may have
        been deleted.
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          href="/meetings"
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}