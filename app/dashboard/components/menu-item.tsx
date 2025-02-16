"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { DrawerContext } from "@/components/ui/drawer";

type Props = { children: React.ReactNode; href: string };
export default function MenuItem({ href, children }: Props) {
  const { onClose } = useContext(DrawerContext);
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "block p-2 rounded-md hover:text-foreground",
        isActive
          ? "bg-primary text-white dark:bg-primary dark:hover:bg-primary hover:bg-zinc-700 hover:text-white"
          : "hover:bg-gray-200 dark:hover:bg-zinc-700"
      )}
      onClick={onClose}
    >
      {children}
    </Link>
  );
}
