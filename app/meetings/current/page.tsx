import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { getMeetings } from '../../../lib/meetings-db';

export default async function CurrentMeetingRedirect() {
  // Tells Next.js 16 to run this dynamically at request time
  await connection();

  const today = new Date();
  const dayOfWeek = today.getDay(); 
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek); 
  
  const isoDate = sunday.toISOString().split('T')[0];
  const meetings = getMeetings(isoDate);
  
  if (meetings && meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  } else {
    redirect('/meetings');
  }
}