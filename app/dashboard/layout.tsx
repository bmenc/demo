import { ReactNode } from "react";
import MainMenu from "@/app/dashboard/components/main-menu";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen w-screen">
      <MainMenu />
      <div className="overflow-auto py-2 px-4">
        <h1 className="pb-4">Welcome back</h1>
        {children}
      </div>
    </div>
  );
}
