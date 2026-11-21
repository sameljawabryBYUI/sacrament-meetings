import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import MeetingForm from '../../../../components/MeetingForm';
import { getMeetingById } from '../../../../lib/meetings-db';

async function EditMeetingContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    notFound();
  }

  return <MeetingForm meeting={meeting} />;
}

export default function EditMeetingPage(props: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Edit Sacrament Meeting
      </h1>
      <Suspense
        fallback={
          <div className="py-10 text-center text-gray-700">
            Loading meeting form...
          </div>
        }
      >
        <EditMeetingContent params={props.params} />
      </Suspense>
    </div>
  );
}