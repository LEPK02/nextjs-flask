import { EyeIcon, PlusIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { links } from './nav-links';
import { NEXT_PUBLIC_GRAPH, NEXT_PUBLIC_RECORDS } from '../lib/definitions';

const PATIENT = "patient";

export function AddPatient() {
  let ref = links.find((link) => { return link.name.toLowerCase() == PATIENT});

  return (
    <Link
      href={`${ref}`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add Patient</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function ViewRecords({ id }: { id: string }) {
  return (
    <div className="group relative flex justify-center">
      <Link
        href={{ pathname: NEXT_PUBLIC_RECORDS, query: { patientId: id } }}
        className="rounded-md border p-2 hover:bg-gray-100"
        type="button"
      >
        <EyeIcon className="w-5" />
      </Link>
      <span className="absolute z-10 top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">View Records</span>
    </div>
  );
}

export function ViewGraph({ id }: { id: string }) {
  return (
    <div className="group relative flex justify-center">
      <Link
        href={{ pathname: NEXT_PUBLIC_GRAPH, query: { patientId: id } }}
        className="rounded-md border p-2 hover:bg-gray-100"
        type="button"
        target='_blank'
      >
        <PresentationChartLineIcon className="w-5" />
      </Link>
      <span className="absolute z-10 top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">View Graph</span>
    </div>
  );
}
