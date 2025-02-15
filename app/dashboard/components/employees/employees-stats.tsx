import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  BadgeCheck,
  LaptopIcon,
  PartyPopperIcon,
  UserCheck2Icon,
  UserIcon,
  UserRoundXIcon,
} from "lucide-react";
import Link from "next/link";
import cm from "@/public/images/cm.jpg";
import Image from "next/image";
import WorkLocationTrends from "./work-location-trends";

export default function EmployeesStats() {
  const totalEmployees = 100;
  const employeesPresent = 80;
  const employeesPresentPercentage = (employeesPresent / totalEmployees) * 100;

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Total employees</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex gap-2">
              <UserIcon />
              <div className="text-5xl font-bold">{totalEmployees}</div>
            </div>
            <div>
              <Button size="xs" asChild>
                <Link href="/dashboard/employee">View All</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Employees present</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex gap-2">
              {employeesPresentPercentage > 75 ? (
                <UserCheck2Icon />
              ) : (
                <UserRoundXIcon />
              )}
              <div className="text-5xl font-bold">{employeesPresent}%</div>
            </div>
          </CardContent>
          <CardFooter>
            {employeesPresentPercentage > 75 ? (
              <span className="text-xs text-green-500 flex gap-1 items-center">
                <BadgeCheck />
                {employeesPresentPercentage}% of employees are present
              </span>
            ) : (
              <span className="text-xs text-red-500 flex gap-1 items-center">
                <AlertTriangle />
                Only {employeesPresentPercentage}% of employees are present
              </span>
            )}
          </CardFooter>
        </Card>
        <Card className="border-slate-800 dark:border-slate-500 flex flex-col">
          <CardHeader>
            <CardTitle className="text-base">Employee of the month</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2 items-center">
            <Avatar>
              <Image src={cm} alt="Employee of the month avatar"></Image>
              <AvatarFallback>CM</AvatarFallback>
            </Avatar>
            <span className="text-2xl">Colin Murray!</span>
          </CardContent>
          <CardFooter className="flex gap-2 items-center text-sm text-muted-foreground mt-auto">
            <PartyPopperIcon className="text-slate-500" />
            <div className="text-slate-500">Congratulations, Colin!</div>
          </CardFooter>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <LaptopIcon />
            <span>Employee work location trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <WorkLocationTrends />
        </CardContent>
      </Card>
    </>
  );
}
