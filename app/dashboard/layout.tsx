"use client";
import { ReactNode, useState } from "react";
import MainMenu from "@/app/dashboard/components/main-menu";
import MenuTitle from "./components/menu-title";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const isDesktop = useMediaQuery("(min-width:768px)");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="md:grid md:grid-cols-[250px_1fr] h-screen w-screen">
      <MainMenu className="hidden md:flex" />
      {!isDesktop && (
        <div className="p-4 flex md:hidden sticky top-0 left-0 bg-background border-b border-border justify-between items-center">
          <MenuTitle />
          <Drawer
            direction="right"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            onOpenChange={(open) => setMobileMenuOpen(open)}
          >
            <DrawerTrigger>
              <MenuIcon />
            </DrawerTrigger>
            <DrawerContent>
              <VisuallyHidden>
                <DialogTitle></DialogTitle>
              </VisuallyHidden>
              <MainMenu />
            </DrawerContent>
          </Drawer>
        </div>
      )}

      <div className="overflow-auto py-2 px-4">
        <h1 className="pb-4">Welcome back</h1>
        {children}
      </div>
    </div>
  );
}
