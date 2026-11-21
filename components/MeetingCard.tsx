import Link from 'next/link';
import { deleteMeeting } from '../lib/actions';
import { SacramentMeeting } from '../lib/types';

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  const formattedDate = new Date(
    meeting.date + 'T00:00:00'
  ).toLocaleDateString('en-US');
  const deleteMeetingWithId = deleteMeeting.bind(null, meeting.id);

  return (
    <div className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div>
        <div className="mb-3 flex items-center justify-between border-b pb-3">
          <h2 className="text-xl font-bold text-gray-900">{formattedDate}</h2>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium capitalize text-blue-900">
            {meeting.meetingType}
          </span>
        </div>
        <p className="mb-1 text-gray-700">Presiding: {meeting.presiding}</p>
        <p className="mb-4 text-sm text-gray-700">
          Conducting: {meeting.conducting}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-2">
        <Link
          href={`/meetings/${meeting.id}`}
          aria-label={`View details for meeting on ${formattedDate}`}
          className="inline-block rounded bg-blue-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        >
          View Details
        </Link>

        <Link
          href={`/meetings/${meeting.id}/edit`}
          aria-label={`Edit meeting on ${formattedDate}`}
          className="inline-block rounded border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        >
          Edit
        </Link>

        <form action={deleteMeetingWithId} className="inline-block">
          <button
            type="submit"
            aria-label={`Delete meeting on ${formattedDate}`}
            className="cursor-pointer rounded bg-red-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}