import { PanelsTopLeft } from "lucide-react";

export default function MenuTitle() {
  return (
    <h4 className="flex items-center">
      <PanelsTopLeft
        size={40}
        className="text-slate-800 mx-2 dark:text-white"
      />{" "}
      Dashboard
    </h4>
  );
}
