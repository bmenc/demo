import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { setTimeout } from "timers/promises";
import { columns } from "./columns";
import { employees } from "./employeesData";

export default async function EmployeesPage() {
  await setTimeout(5000);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Emplyees</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable data={employees} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
}
