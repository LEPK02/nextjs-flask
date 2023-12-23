import { ViewGraph, ViewRecords } from './buttons';
// import InvoiceStatus from '@/app/ui/invoices/status';
// import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { getPatientData, getRecordData } from '@/app/lib/data';
import { Patient, Record } from '../lib/definitions';
import { ErrorModal } from './modal';

export async function PatientsTable({
  name,
  currentPage,
}: {
  name: string;
  currentPage: number;
}) {
  const patients: Patient[]|string = await getPatientData(currentPage, name);

  return Array.isArray(patients) ?
    (
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {
                patients.length > 0 ?
                  (patients?.map((patient) => (
                    <div
                      key={patient.id}
                      className="mb-2 w-full rounded-md bg-white p-4"
                    >
                      <div className="flex items-center justify-between border-b">
                        <div className="mb-2 flex items-center">
                          <p className="text-xl font-medium">{patient.name}</p>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between pt-4">
                        <div>
                          <p>{patient.disease}</p>
                        </div>
                        <div className="flex justify-end gap-2">
                          <ViewRecords id={patient.id} />
                          <ViewGraph id={patient.id} />
                        </div>
                      </div>
                    </div>
                  )))
                :
                  (<div className='bg-gray-50 text-center font-medium'>No results found</div>)
              }
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-3 py-5 font-medium">
                    ID
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Disease
                  </th>
                  {/* <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-white">
                {patients.length > 0 ?
                  (patients?.map((patient) => (
                    <tr
                      key={patient.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <p>{patient.id}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {patient.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {patient.disease}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <ViewRecords id={patient.id} />
                          <ViewGraph id={patient.id} />
                        </div>
                      </td>
                    </tr>
                  ))) :
                  (<tr><td colSpan={3} className='bg-gray-50 text-center font-medium'>No results found</td></tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ) :
    (<><ErrorModal baseUrl='/'/></>);
}

export async function RecordsTable({
  patientId,
  name,
  currentPage
}: {
  patientId: number;
  name: string;
  currentPage: number;
}) {
  const records: Record[]|string = await getRecordData(patientId, name, currentPage);

  return Array.isArray(records) ?
    (
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {
                records.length > 0 ?
                  (records?.map((record: Record) => (
                    <div
                      key={record.id}
                      className="mb-2 w-full rounded-md bg-white p-4"
                    >
                      <div className="flex items-center justify-between border-b">
                        <div className="mb-2 flex items-center">
                          <p className="text-xl font-medium">{record.id}</p>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between pt-4">
                        <div>
                          <p>{record.name} (ID: {record.patient_id})</p>
                          <p>{record.date ? (new Date(record.date)).toLocaleDateString('en-GB') : "-"}</p>
                          <p>{record.indicator}</p>
                        </div>
                      </div>
                    </div>
                  )))
                :
                  (<div className='bg-gray-50 text-center font-medium'>No results found</div>)
              }
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Record ID
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Patient ID & Name
                  </th>
                  {/* <th scope="col" className="px-3 py-5 font-medium">
                    Patient ID
                  </th> */}
                  <th scope="col" className="px-3 py-5 font-medium">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Indicator
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {records.length > 0 ?
                  (records?.map((record: Record) => (
                    <tr
                      key={record.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <p>{record.id}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {record.patient_id}. {record.name}
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-3">
                        {record.patient_id}
                      </td> */}
                      <td className="whitespace-nowrap px-3 py-3">
                        <p>{record.date ? (new Date(record.date)).toLocaleDateString('en-GB') : "-"}</p>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {record.indicator}
                      </td>
                    </tr>
                  ))) :
                  (<tr><td colSpan={4} className='bg-gray-50 text-center font-medium'>No results found</td></tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ) :
    (<><ErrorModal baseUrl='/'/></>);
}
