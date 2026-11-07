'use client';
import { SacramentMeeting } from '../lib/types';

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl mx-auto my-8 border border-gray-100">
      <div className="text-center border-b-2 border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">{meeting.meetingType} Meeting</h1>
        <p className="text-gray-500 text-lg">{new Date(meeting.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-gray-700">
        <div className="bg-gray-50 p-4 rounded-lg"><span className="font-semibold">Presiding:</span> {meeting.presiding}</div>
        <div className="bg-gray-50 p-4 rounded-lg"><span className="font-semibold">Conducting:</span> {meeting.conducting}</div>
      </div>

      <div className="space-y-6">
        {meeting.announcements && meeting.announcements.length > 0 && (
          <section className="bg-blue-50 p-6 rounded-lg print:bg-transparent print:p-0">
            <h2 className="text-xl font-semibold text-blue-900 mb-3 border-b border-blue-200 pb-2">Announcements</h2>
            <ul className="list-disc pl-5 space-y-1 text-blue-800">
              {meeting.announcements.map((ann, i) => <li key={i}>{ann}</li>)}
            </ul>
          </section>
        )}

        <section>
          <div className="flex justify-between border-b border-gray-100 py-3">
            <span className="font-semibold text-gray-700">Opening Hymn</span>
            <span className="text-gray-600">#{meeting.openingHymn.number} - {meeting.openingHymn.title}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 py-3">
            <span className="font-semibold text-gray-700">Opening Prayer</span>
            <span className="text-gray-600">{meeting.openingPrayer}</span>
          </div>
        </section>

        {meeting.wardBusiness.length > 0 && (
          <section className="bg-yellow-50 p-6 rounded-lg print:bg-transparent print:p-0">
            <h2 className="text-xl font-semibold text-yellow-900 mb-3 border-b border-yellow-200 pb-2">Ward Business</h2>
            <ul className="list-disc pl-5 space-y-1 text-yellow-800">
              {meeting.wardBusiness.map((biz, i) => <li key={i}>{biz.description}</li>)}
            </ul>
          </section>
        )}

        <section>
          <div className="flex justify-between border-b border-gray-100 py-3">
            <span className="font-semibold text-gray-700">Sacrament Hymn</span>
            <span className="text-gray-600">#{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</span>
          </div>
        </section>

        {meeting.speakers.length > 0 && (
          <section className="pt-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Program</h2>
            <div className="space-y-4">
              {meeting.speakers.map((speaker, i) => (
                <div key={i} className="flex flex-col md:flex-row justify-between bg-gray-50 p-4 rounded-lg print:bg-transparent print:p-0">
                  <span className="font-semibold text-gray-700">{speaker.name}</span>
                  <span className="text-gray-600 italic">
                    {speaker.type === 'musical-number' ? 'Musical Number' : speaker.topic}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex justify-between border-b border-gray-100 py-3">
            <span className="font-semibold text-gray-700">Closing Hymn</span>
            <span className="text-gray-600">#{meeting.closingHymn.number} - {meeting.closingHymn.title}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="font-semibold text-gray-700">Closing Prayer</span>
            <span className="text-gray-600">{meeting.closingPrayer}</span>
          </div>
        </section>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center print:hidden">
        <button onClick={() => window.print()} className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
          Print Program
        </button>
      </div>
    </div>
  );
}