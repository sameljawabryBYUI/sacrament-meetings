'use client';

import { useEffect, useState } from 'react';
import MeetingCard from '../../components/MeetingCard';
import { SacramentMeeting } from '../../lib/types';

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<SacramentMeeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetches from the API route we just built
    fetch('/api/meetings')
      .then(res => res.json())
      .then(data => {
        setMeetings(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return null; // Uses loading.tsx fallback

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">All Meetings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}