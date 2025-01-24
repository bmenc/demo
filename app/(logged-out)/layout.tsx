import { LightDarkToggle } from "@/components/ui/light-dark-toggle";
type LoggedOutLayoutProps = Readonly<{
  children?: React.ReactNode;
}>;

export default function LoggedOutLayout({ children }: LoggedOutLayoutProps) {
  return (
    <>
      <div className="flex flex-col gap-4 min-h-screen items-center justify-center p-24">
        {children}
      </div>
      <LightDarkToggle className="fixed top-[calc(50%-12px)] right-2 -mt-3" />
    </>
  );
}
