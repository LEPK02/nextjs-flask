import { getGraphData } from "@/app/lib/data";
import { Record } from "@/app/lib/definitions";
import LineGraph from "@/app/ui/graph";
import { DefaultSpinner } from "@/app/ui/skeletons";
import React from "react";
import { Suspense } from 'react';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    patientId?: string;
  };
}) {
  const patientId = searchParams?.patientId || "-1";
  const data: Record[]|string = await getGraphData(patientId);

  return (
    <div className="w-full h-full">
      <div className="flex w-full items-center justify-between">
        <h1 className='text-4xl font-medium mb-3'>Patient Graph</h1>
      </div>
      <Suspense key={patientId} fallback={<DefaultSpinner />}>
        {
          typeof data == 'string' ?
            (<div className='text-center font-medium'>No results found</div>) :
            (
              <>
                <h1 className='font-medium m-0 text-center'>{`Indicator over Time (${data[0]["name"]})`}</h1>
                <div className="w-full h-5/6 flex items-center justify-center">
                  <LineGraph data={data}/>
                </div>
              </>
            )
        }
      </Suspense>
    </div>
  )
}
