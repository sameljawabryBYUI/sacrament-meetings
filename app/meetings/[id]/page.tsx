'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MeetingDetail from '../../../components/MeetingDetail';
import { SacramentMeeting } from '../../../lib/types';

export default function MeetingDetailPage() {
  const params = useParams();
  const [meeting, setMeeting] = useState<SacramentMeeting | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetches the specific meeting from the API
    fetch(`/api/meetings/${params.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => setMeeting(data))
      .catch(() => setError(true));
  }, [params.id]);

  if (error) return <div className="text-center text-red-600 mt-10 text-xl font-bold">Meeting not found (404)</div>;
  if (!meeting) return null;

  return (
    <div>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}