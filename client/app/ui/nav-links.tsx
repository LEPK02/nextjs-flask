'use client';

import { UserGroupIcon, HomeIcon, DocumentDuplicateIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { NEXT_PUBLIC_PATIENTS, NEXT_PUBLIC_RECORDS } from '../lib/definitions';

export const links = [
  { name: 'Home', href: '/', icon: HomeIcon, show: true },
  { name: 'Patients', href: NEXT_PUBLIC_PATIENTS, icon: UserGroupIcon, description: "View patient information", show: true },
  { name: 'Records', href: NEXT_PUBLIC_RECORDS, icon: DocumentDuplicateIcon, description: "View all patient records", show: true },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links
        .filter((val) => val.show)
        .map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                { 'bg-sky-100 text-blue-600': pathname === link.href },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })
      }
    </>
  );
}
