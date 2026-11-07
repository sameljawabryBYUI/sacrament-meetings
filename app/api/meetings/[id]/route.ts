import { NextResponse } from 'next/server';
import { getMeetingById } from '../../../../lib/meetings-db';

// Next.js 15 requires params to be typed as a Promise
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Await the params before extracting the id
  const { id } = await params;
  const numericId = parseInt(id);
  
  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const meeting = getMeetingById(numericId);
  
  if (!meeting) {
    return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
  }

  return NextResponse.json(meeting);
}