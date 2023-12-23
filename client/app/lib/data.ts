import { NEXT_PUBLIC_API, NEXT_PUBLIC_GRAPH, NEXT_PUBLIC_PATIENTS, NEXT_PUBLIC_RECORDS, Patient, Record } from "./definitions";

export async function getPatientData(currentPage: number, name: string) {
  let res: Patient[] | string = "Error";
  const params = new URLSearchParams({
    'name': name,
    'currentPage': currentPage.toString()
  });
  try {
    await fetch(
      `${NEXT_PUBLIC_API}${NEXT_PUBLIC_PATIENTS}?${params}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        res = data;
      });
  } catch (error) {
    console.log(error);
    res = "Error";
  }

  return res === undefined ? "Error" : res;
}

async function fetchRecords(endpoint: string) {
  let res: Record[] | string = "Error";
  try {
    await fetch(
      endpoint,
      {
        method: "GET",
        mode: "cors",
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        res = data;
        console.log(res)
      });
  } catch (error) {
    console.log(error);
    res = "Error";
  }
  return res;
}

export async function getRecordData(patientId: number, name: string, currentPage: number) {
  const params = new URLSearchParams({
    'patientId': patientId.toString(),
    'name': name.toString(),
    'currentPage': currentPage.toString()
  });
  
  let res = await fetchRecords(`${NEXT_PUBLIC_API}${NEXT_PUBLIC_RECORDS}?${params}`);

  return res === undefined ? "Error" : res;
}

export async function getGraphData(patientId: string) {
  const params = new URLSearchParams({ 'patientId': patientId });
  let res: Record[]|string = await fetchRecords(`${NEXT_PUBLIC_API}${NEXT_PUBLIC_GRAPH}?${params}`);
  // if (typeof res != "string") {
  //   res.forEach((val, idx) => {
  //     res[idx].
  //   });
  // }
  return res === undefined ? "Error" : res;
}