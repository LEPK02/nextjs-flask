'use client';

import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Record } from '../lib/definitions';

export default function LineGraph({data}: {data: Record[]}) {
  const dateFormatter = (val:string) => {return new Date(val).toLocaleDateString('en-GB')}

  return (
    <ResponsiveContainer aspect={1} width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 0, left: 10, right: 20, bottom: 15 }}
      >
        <Line type="monotone" dataKey="indicator" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey="date"
          label={{ value: "Date", position: "center", dy: 15, fontSize: "130%"}}
          tickFormatter={dateFormatter}
        />
        <YAxis>
            <Label
              style={{
                  textAnchor: "middle",
                  fontSize: "130%",
              }}
              angle={270}
              value={"Indicator"}
              dx={-10}
            />
        </YAxis>
        <Tooltip labelFormatter={dateFormatter} />
      </LineChart>
    </ResponsiveContainer>
  );
}