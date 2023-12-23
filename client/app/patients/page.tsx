import React from "react";
import Search from "../ui/search";
// import { AddPatient } from "../ui/buttons";
import { Suspense } from 'react';
import { PatientsTable } from "../ui/table";
import { PatientsTableSkeleton } from "../ui/skeletons";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    name?: string;
    page?: string;
  };
}) {
  const name = searchParams?.name || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className='text-4xl font-medium'>Patients</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search patients..." />
        {/* <AddPatient /> */}
      </div>
       <Suspense key={name + currentPage} fallback={<PatientsTableSkeleton />}>
        <PatientsTable name={name} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  )
}
