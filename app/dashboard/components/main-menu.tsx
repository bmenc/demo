import MenuTitle from "@/app/dashboard/components/menu-title";
import MenuItem from "@/app/dashboard/components/menu-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { LightDarkToggle } from "@/components/ui/light-dark-toggle";

export default function MainMenu() {
  return (
    <div className="bg-muted overflow-auto p-4 flex flex-col gap-4 h-full">
      <div className="border-b dark:border-b-black border-b-zinc-300 pb-4">
        <MenuTitle />
      </div>
      <div className="py-4 grow">
        <MenuItem href="/dashboard">My dashboard</MenuItem>
        <MenuItem href="/dashboard/teams">Teams</MenuItem>
        <MenuItem href="/dashboard/employees">Eemployees</MenuItem>
        <MenuItem href="/dashboard/account">Account</MenuItem>
        <MenuItem href="/dashboard/settings">Settings</MenuItem>
      </div>
      <div className="flex gap-2 items-center">
        <Avatar>
          <AvatarFallback className="bg-gray-200 dark:bg-slate-900">
            CN
          </AvatarFallback>
        </Avatar>
        <Link href={"/"} className="hover:underline">
          Logout
        </Link>
        <LightDarkToggle className="ml-auto" />
      </div>
    </div>
  );
}
