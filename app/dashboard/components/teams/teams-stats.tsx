import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart, StarIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import cm from "@/public/images/cm.jpg";
import tf from "@/public/images/tf.jpg";
import rl from "@/public/images/cm.jpg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TeamDistributionChart from "./team-distribution-chart";
import SupportTicketsResolved from "./support-tickets-resolved";

export default function TeamsStats() {
  const totalTeams = 8;
  const teamLeaders = [
    {
      firstName: "Colin",
      lastName: "Murray",
      avatar: cm,
    },
    {
      firstName: "Tom",
      lastName: "Phillips",
    },
    {
      firstName: "Liam",
      lastName: "Fuentes",
    },
    {
      firstName: "Tina",
      lastName: "Fey",
      avatar: tf,
    },
    {
      firstName: "Katie",
      lastName: "Johnson",
    },
    {
      firstName: "Tina",
      lastName: "Jones",
    },
    {
      firstName: "Amy",
      lastName: "Adams",
    },
    {
      firstName: "Ryan",
      lastName: "Lopez",
      avatar: rl,
    },
    {
      firstName: "Jenny",
      lastName: "Jones",
    },
  ];

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Total teams</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex gap-2">
              <UsersIcon />
              <div className="text-5xl font-bold">{totalTeams}</div>
            </div>
            <div>
              <Button size="xs" asChild>
                <Link href="/dashboard/teams">View All</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center">
              <span className="text-base">Team leaders</span>
              <StarIcon className="text-yellow-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {teamLeaders.map((teamLeader) => (
              <TooltipProvider
                key={`${teamLeader.firstName}${teamLeader.lastName}`}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar>
                      {teamLeader.avatar && (
                        <Image
                          src={teamLeader.avatar}
                          alt={`${teamLeader.firstName} ${teamLeader.lastName} avatar`}
                        />
                      )}
                      <AvatarFallback>
                        {teamLeader.firstName[0]}
                        {teamLeader.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <CardTitle className="text-base">Team distribution</CardTitle>
              <PieChart />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2 items-center">
            <TeamDistributionChart />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center gap-2">
            <span className="text-base">Support Tickets Resolved</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          <SupportTicketsResolved />
        </CardContent>
      </Card>
    </>
  );
}
