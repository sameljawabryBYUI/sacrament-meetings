import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center bg-gray-50 p-8 text-center">
      <h1 className="mb-6 text-4xl font-bold text-gray-900">
        Welcome to the Sacrament Meeting Planner
      </h1>
      <p className="mb-8 max-w-2xl text-xl text-gray-700">
        A digital tool to help bishoprics plan agendas, and for members to
        access weekly programs.
      </p>

      <div className="mb-10 rounded-full border border-gray-200 bg-white p-8 shadow-md">
        <Image
          src="/globe.svg"
          alt="Sacrament Meeting Planner globe emblem"
          width={120}
          height={120}
          priority
        />
      </div>

      <Link
        href="/meetings"
        className="rounded-lg bg-blue-800 px-8 py-4 text-lg font-semibold text-white shadow-md transition-colors hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
      >
        Enter Planner
      </Link>
    </div>
  );
}