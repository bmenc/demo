"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode; href: string };
export default function MenuItem({ href, children }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "block p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-md hover:text-foreground",
        isActive &&
          "bg-primary text-white dark:bg-primary dark:hover:bg-primary"
      )}
    >
      {children}
    </Link>
  );
}
