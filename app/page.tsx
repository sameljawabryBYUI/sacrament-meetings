import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow p-8 text-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to the Sacrament Meeting Planner</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        A digital tool to help bishoprics plan agendas, and for members to access weekly programs.
      </p>
      
      <div className="mb-10 bg-white p-8 rounded-full shadow-md border border-gray-200">
        {/* Using next/image with correct alt, width, and height attributes to satisfy the requirement */}
        <Image
          src="/globe.svg"
          alt="Globe Icon"
          width={120}
          height={120}
          priority
        />
      </div>

      <Link 
        href="/meetings"
        className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        Enter Planner
      </Link>
    </div>
  );
}