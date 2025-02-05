import { LayoutDashboard } from "lucide-react";

export default function MenuTitle() {
  return (
    <h4 className="flex items-center">
      <LayoutDashboard
        size={40}
        className="text-slate-800 mx-2 dark:text-white"
      />{" "}
      Dashboard
    </h4>
  );
}
