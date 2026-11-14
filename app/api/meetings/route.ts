import { NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  
  try {
    const meetings = await getMeetings(query);
    return NextResponse.json(meetings);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch meetings from database' }, { status: 500 });
  }
}