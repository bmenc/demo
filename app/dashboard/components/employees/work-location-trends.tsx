"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ResponsiveContainer } from "recharts";

export const data = [
  {
    name: "Jan",
    office: 82,
    wfh: 44,
    id: 1,
  },
  {
    name: "Feb",
    office: 80,
    wfh: 40,
    id: 2,
  },
  {
    name: "Mar",
    office: 83,
    wfh: 42,
    id: 3,
  },
  {
    name: "Apr",
    office: 50,
    wfh: 50,
    id: 4,
  },
  {
    name: "May",
    office: 40,
    wfh: 60,
    id: 5,
  },
  {
    name: "Jun",
    office: 60,
    wfh: 40,
    id: 6,
  },
  {
    name: "Jul",
    office: 55,
    wfh: 55,
    id: 7,
  },
  {
    name: "Aug",
    office: 49,
    wfh: 61,
    id: 8,
  },
  {
    name: "Sep",
    office: 44,
    wfh: 70,
    id: 9,
  },
  {
    name: "Oct",
    office: 40,
    wfh: 40,
    id: 10,
  },
  {
    name: "Nov",
    office: 50,
    wfh: 50,
    id: 11,
  },
  {
    name: "Dec",
    office: 50,
    wfh: 50,
    id: 12,
  },
];

export default function WorkLocationTrends() {
  return (
    <ResponsiveContainer height={350} width="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888" fontSize={12} />
        <YAxis stroke="#888" fontSize={12} />
        <Tooltip
          labelClassName="text-sm font-bold dark:!bg-black rounded-md dark:!border-border"
          wrapperClassName="dark:!bg-black dark:!border-border rounded-md"
        />
        <Legend
          iconType="circle"
          formatter={(value) => {
            if (value === "wfh") {
              return <div className="text-sm">Work from home</div>;
            } else if (value === "office") {
              return <div className="text-sm">Work from office</div>;
            }
          }}
        />
        <Bar dataKey="office" stackId={1} fill="#1b1b1b" />
        <Bar dataKey="wfh" stackId={1} fill="#6b7280" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
