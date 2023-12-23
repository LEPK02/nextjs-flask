import React from "react";
import Search from "../ui/search";
import { Suspense } from 'react';
import { RecordsTableSkeleton } from "../ui/skeletons";
import { RecordsTable } from "../ui/table";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    patientId?: number;
    name?: string;
    page?: string;
  };
}) {
  const patientId = searchParams?.patientId || -1;
  const name = searchParams?.name || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className='text-4xl font-medium'>Records</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Enter patient name or ID..." />
        {/* <AddPatient /> */}
      </div>
      <Suspense key={currentPage} fallback={<RecordsTableSkeleton />}>
        <RecordsTable patientId={patientId} name={name} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  )
}
