import NavLinks from './nav-links';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-gray-50">
      <div className="flex grow flex-row justify-between shadow-md md:flex-col">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
      </div>
    </div>
  );
}
