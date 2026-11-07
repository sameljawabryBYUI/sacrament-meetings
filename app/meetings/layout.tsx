import NavLinks from "../../components/NavLinks";

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-grow bg-gray-50">
      <NavLinks />
      <div className="p-6 flex-grow max-w-7xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
}