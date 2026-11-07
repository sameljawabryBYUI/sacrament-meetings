import Link from 'next/link';
import { SacramentMeeting } from '../lib/types';

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center border-b pb-3 mb-3">
        <h2 className="text-xl font-bold text-gray-800">{new Date(meeting.date).toLocaleDateString()}</h2>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
          {meeting.meetingType}
        </span>
      </div>
      <p className="text-gray-600 mb-4">Presiding: {meeting.presiding}</p>
      <Link 
        href={`/meetings/${meeting.id}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        View Details
      </Link>
    </div>
  );
}