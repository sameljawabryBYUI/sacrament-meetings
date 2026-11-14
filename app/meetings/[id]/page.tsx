'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MeetingDetail from '../../../components/MeetingDetail';
import { SacramentMeeting } from '../../../lib/types';

export default function MeetingDetailPage() {
  const params = useParams();
  const [meeting, setMeeting] = useState<SacramentMeeting | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset states when ID changes
    setLoading(true);
    setError(null);

    // Fetches the specific meeting from the API
    fetch(`/api/meetings/${params.id}`)
      .then(async (res) => {
        if (!res.ok) {
          // Check res.status to differentiate 400 vs 404 as requested
          throw new Error(res.status === 400 ? 'Invalid ID format (400)' : 'Meeting not found (404)');
        }
        // Type the JSON response properly
        return res.json() as Promise<SacramentMeeting>;
      })
      .then((data: SacramentMeeting) => {
        setMeeting(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false); // Ensure loading turns off even if it fails
      });
  }, [params.id]);

  if (loading) return <div className="text-center mt-10 text-xl text-gray-600">Loading meeting details...</div>;
  if (error) return <div className="text-center text-red-600 mt-10 text-xl font-bold">{error}</div>;
  if (!meeting) return null;

  return (
    <div>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}