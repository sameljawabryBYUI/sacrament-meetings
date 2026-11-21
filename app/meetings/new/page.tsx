import MeetingForm from '../../../components/MeetingForm';

export default function NewMeetingPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Create New Sacrament Meeting
      </h1>
      <MeetingForm />
    </div>
  );
}