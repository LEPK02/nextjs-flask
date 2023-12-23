'use client';

import Link from 'next/link';
import { links } from './ui/nav-links';

export default function Page() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <h1 className='text-4xl mb-5 font-medium lg:mb-7'>Welcome</h1>
      <div className='w-full h-[75%] lg:h-[50%] flex flex-col justify-center items-center gap-5 lg:gap-7 lg:flex-row'>
        {links.map((link) => {
          if (link.name != "Patients" && link.name != "Records") { return; }
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className='rounded-xl w-full h-full lg:max-w-[40%] bg-gray-50 p-2 shadow-sm flex flex-col justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 duration-300'
            >
              <LinkIcon className="w-12" />
              <p className='text-2xl mt-1'>{link.name}</p>
              <p className='italic text-sm'>{link.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
